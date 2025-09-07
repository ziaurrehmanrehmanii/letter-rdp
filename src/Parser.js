/**
 * @module Parser
 * Letter Parser: recursive descent implementation
 */
const { Tokenizer, Spec } = require("./Tokenizer");
class Parser {
  /**
   * Initializes the parser
   */
  constructor() {
    this._string = "";
    this._tokenizer = new Tokenizer();
  }
  /**
   * Parses a string into AST
   */
  parse(string) {
    this._string = string;
    this._tokenizer.init(string);

    // Prime the tokenizer to obtain the first
    // token which is our lookahead. the lookahead is
    // used for predictive parsing.
    this._lookahead = this._tokenizer.getNextToken();

    // Parse recursively starting from the main
    // entry point, The Program
    return this.Program();
  }

  /**
   * Main entry Point
   *
   * Program
   *  :Literal
   *  ;
   */
  Program() {
    // Program now contains a StatementList so multiple expressions
    // (ExpressionStatement) can be represented as an array of statements.
    return {
      type: "Program",
      body: this.StatementList(),
    };
  }
  /**
   * StatementList
   *  : Statement
   *  | StatementList Statement -> Statement Statement Statement Statement
   *  ;
   */
  StatementList(stopLookahead = null) {
    const statementList = [];
    while (this._lookahead != null && this._lookahead.type !== stopLookahead) {
      statementList.push(this.Statement());
    }

    return statementList;
  }
  /**
   * Statement
   *  : ExpressionStatement;
   *  | BlockStatement
   *  | EmptyStatement
   *  | VariableStatement
   *  | IfStatement
   *  ;
   */
  Statement() {
    switch (this._lookahead.type) {
      case ";":
        return this.EmptyStatement();
      case "if":
        return this.IfStatement();
      case "{":
        return this.BlockStatement();
      case "let":
        return this.VariableStatement();
      default:
        return this.ExpressionStatement();
    }
  }
  /**
   * IfStatement
   * : 'if' '(' Expression ')' Statement
   * | 'if' '(' Expression ')' Statement else Statement
   *  ;
   */
  IfStatement() {
    this._eat("if");
    this._eat("(");
    const test = this.Expression();
    this._eat(")");
    const consequent = this.Statement();
    let alternate =
      this._lookahead !== null && this._lookahead.type === "else"
        ? this._eat("else") && this.Statement()
        : null;

    return {
      type: "IfStatement",
      test,
      consequent,
      alternate,
    };
  }

  /**
   * VariableStatement
   *  : 'let' VariableDeclarationList ';'
   *  ;
   */
  VariableStatement() {
    this._eat("let");
    const declarations = this.VariableDeclarationList();
    this._eat(";");
    return {
      type: "VariableDeclaration",
      kind: "let",
      declarations,
    };
  }
  /**
   * VariableDeclarationList
   *  : VariableDeclaration
   *  | VariableDeclarationList ',' VariableDeclaration
   */
  VariableDeclarationList() {
    const declarations = [];
    // first declaration
    declarations.push(this.VariableDeclaration());
    // consume comma-separated additional declarations
    while (this._lookahead && this._lookahead.type === ",") {
      this._eat(",");
      declarations.push(this.VariableDeclaration());
    }
    return declarations;
  }
  /**
   * VariableDeclaration
   *  : Identifier OpVariableInitializer
   *  ;
   */
  VariableDeclaration() {
    const id = this.Identifier();

    // Optional initializer
    const init =
      this._lookahead.type !== ";" && this._lookahead.type !== ","
        ? this.VariableInitializer()
        : null;

    return {
      type: "VariableDeclarator",
      id,
      init,
    };
  }
  /**
   * VariableInitializer
   *  : SIMPLE_ASSIGN AssignmentExpression
   *  ;
   */
  VariableInitializer() {
    this._eat("SIMPLE_ASSIGN");
    return this.AssignmentExpression();
  }

  /**
   * EmptyStatement
   *  : ';'
   *  ;
   */
  EmptyStatement() {
    this._eat(";");
    return { type: "EmptyStatement" };
  }
  /**
   * BlockStatement
   *  : '{' OptStatementList '}'
   *  ;
   */
  BlockStatement() {
    this._eat("{");
    const body = this._lookahead.type !== "}" ? this.StatementList("}") : [];
    this._eat("}");
    return {
      type: "BlockStatement",
      body,
    };
  }

  /**
   * ExpressionStatement
   *  : Expression ';'
   *  ;
   */
  ExpressionStatement() {
    const expression = this.Expression();
    this._eat(";");
    return {
      type: "ExpressionStatement",
      expression,
    };
  }
  /**
   * Expression
   *  : Literal
   *  ;
   */
  Expression() {
    return this.AssignmentExpression();
  }
  /**
   * AssignmentExpression
   *  : LogicalORExpression
   *  | LeftHandSideExpression ASSIGNMENT_OPERATOR AssignmentExpression
   *  ;
   */
  AssignmentExpression() {
    const left = this.LogicalORExpression();

    // Only parse an assignment if the next token is an assignment operator
    if (this._isAssignmentOperator(this._lookahead && this._lookahead.type)) {
      const operatorToken = this.AssignmentOperator();
      return {
        type: "AssignmentExpression",
        operator: operatorToken.value,
        left: this._checkValidAssignmentTarget(left),
        right: this.AssignmentExpression(),
      };
    }

    return left;
  }

  /**
   * AssignmentOperator
   *  :SIMPLE_ASSIGN
   *  |COMPLEX_ASSIGN
   */
  AssignmentOperator() {
    if (this._lookahead.type === "SIMPLE_ASSIGN") {
      return this._eat("SIMPLE_ASSIGN");
    }
    return this._eat("COMPLEX_ASSIGN");
  }
  /**
   * Logical AND expression
   *
   * x && y
   *
   * LogicalANDExpression
   *  : EqualityExpression LOGICAL_AND LogicalANDExpression
   *  | EqualityExpression
   *  ;
   */
  LogicalANDExpression() {
    return this._BinaryExpression("EqualityExpression", "LOGICAL_AND");
  }

  /**
   * Logical OR expression
   *
   * x || y
   *
   * LogicalORExpression
   *  : LogicalANDExpression LOGICAL_OR LogicalORExpression
   *  | EqualityExpression
   *  ;
   */
  LogicalORExpression() {
    return this._BinaryExpression("LogicalANDExpression", "LOGICAL_OR");
  }

  /**
   * Generic helper for LogicalExpression
   */
  _LogicalExpression(builderName, operatorToken) {
    let left = this[builderName]();

    while (this._lookahead.type === operatorToken) {
      // Operator &&, ||
      const operator = this._eat(operatorToken).value;

      const right = this[builderName]();

      left = {
        type: "LogicalExpression",
        operator,
        left,
        right,
      };
    }
    return left;
  }

  /**
   * EQUALITY OPERATORS: ==, !=
   *
   * x == y
   * x != y
   *
   * EqualityExpression
   *  : EqualityExpression EQUALITY_OPERATOR EqualityExpression
   *  | RelationalExpression
   *  ;
   */
  EqualityExpression() {
    return this._BinaryExpression("RelationalExpression", "EQUALITY_OPERATOR");
  }

  /**
   * RELATIONAL OPERATORS: >, <, >=, <=,
   *
   * x > y
   * x < y
   * x >= y
   * x <= y
   *
   *
   * RelationalExpression
   *  : AdditiveExpression
   *  | RelationalExpression RELATIONAL_OPERATOR RelationalExpression
   */
  RelationalExpression() {
    return this._BinaryExpression("AdditiveExpression", "RELATIONAL_OPERATOR");
  }

  /**
   * LeftHandSideExpression
   *  : Identifier
   *  | LeftHandSideExpression . Identifier
   *  | LeftHandSideExpression [ Expression ]
   *  | LeftHandSideExpression ( ArgumentList )
   *  ;
   */
  LeftHandSideExpression() {
    let left = this.Identifier();

    while (true) {
      if (this._lookahead.type === ".") {
        this._eat(".");
        const property = this.Identifier();
        left = {
          type: "MemberExpression",
          object: left,
          property,
          computed: false,
        };
      } else if (this._lookahead.type === "[") {
        this._eat("[");
        const property = this.Expression();
        this._eat("]");
        left = {
          type: "MemberExpression",
          object: left,
          property,
          computed: true,
        };
      } else if (this._lookahead.type === "(") {
        this._eat("(");
        const args = this.ArgumentList();
        this._eat(")");
        left = {
          type: "CallExpression",
          callee: left,
          arguments: args,
        };
      } else {
        break;
      }
    }

    return left;
  }

  /**
   * ArgumentList
   *  : Expression
   *  | ArgumentList , Expression
   *  | (empty)
   *  ;
   */
  ArgumentList() {
    const args = [];

    if (this._lookahead.type !== ")") {
      args.push(this.Expression());
      while (this._lookahead.type === ",") {
        this._eat(",");
        args.push(this.Expression());
      }
    }

    return args;
  }
  /**
   * Identifier
   *  :IDENTIFIER
   *  ;
   */
  Identifier() {
    const name = this._eat("IDENTIFIER").value;
    return {
      type: "Identifier",
      name,
    };
  }
  /**
   * Extra check whether it`s valid assignment target
   */
  _checkValidAssignmentTarget(node) {
    if (node.type === "Identifier") {
      return node;
    }
    throw new SyntaxError(`Invalid left-hand side in assignment expression`);
  }
  /**
   * Whether the token is an assignment operator
   */
  _isAssignmentOperator(tokenType) {
    return tokenType === "SIMPLE_ASSIGN" || tokenType === "COMPLEX_ASSIGN";
  }

  /**
   * AdditiveExpression
   *  :MultiplicativeExpression
   *  | AdditiveExpression ADDITIVE_OPERATOR MultiplicativeExpression -> ADDITIVE_OPERATOR  MultiplicativeExpression ADDITIVE_OPERATOR MultiplicativeExpression
   *  ;
   */
  AdditiveExpression() {
    return this._BinaryExpression(
      "MultiplicativeExpression",
      "ADDITIVE_OPERATOR"
    );
  }

  /**
   * MultiplicativeExpression
   *  : UnaryExpression
   *  | MultiplicativeExpression MULTIPLICATIVE_OPERATOR UnaryExpression -> MULTIPLICATIVE_OPERATOR UnaryExpression MULTIPLICATIVE_OPERATOR UnaryExpression
   */
  MultiplicativeExpression() {
    return this._BinaryExpression("UnaryExpression", "MULTIPLICATIVE_OPERATOR");
  }
  /**
   * Generic binary expression.
   */
  _BinaryExpression(builderName, operatorToken) {
    let left = this[builderName]();

    while (this._lookahead.type === operatorToken) {
      // Operator +, -
      const operator = this._eat(operatorToken).value;

      const right = this[builderName]();

      left = {
        type: "BinaryExpression",
        operator,
        left,
        right,
      };
    }
    return left;
  }

  /**
   * PrimaryExpression
   *  : Literal
   *  |ParenthesizedExpression
   *  |LeftHandSideExpression
   *  ;
   */
  PrimaryExpression() {
    if (this._isLiteral(this._lookahead.type)) {
      return this.Literal();
    }
    switch (this._lookahead.type) {
      case "(":
        return this.ParenthesizedExpression();
      default:
        return this.LeftHandSideExpression();
    }
  }

  /**
   * UnaryExpression
   *  : PrimaryExpression
   *  | + UnaryExpression
   *  | - UnaryExpression
   *  | ! UnaryExpression
   *  | ~ UnaryExpression
   *  | typeof UnaryExpression
   *  | void UnaryExpression
   *  | delete UnaryExpression
   *  ;
   */
  UnaryExpression() {
    if (this._isUnaryOperator()) {
      const operator = this._eat(this._lookahead.type).value;
      const argument = this.UnaryExpression();
      return {
        type: "UnaryExpression",
        operator,
        argument,
        prefix: true,
      };
    }
    return this.PrimaryExpression();
  }

  /**
   * Whether the token is a unary operator
   */
  _isUnaryOperator() {
    const type = this._lookahead.type;
    return (
      type === "!" ||
      type === "~" ||
      type === "typeof" ||
      type === "void" ||
      type === "delete" ||
      (type === "ADDITIVE_OPERATOR" &&
        (this._lookahead.value === "+" || this._lookahead.value === "-"))
    );
  }

  /**
   * Whether the token is a literal
   */
  _isLiteral(tokenType) {
    return (
      tokenType === "NUMBER" ||
      tokenType === "STRING" ||
      tokenType === "true" ||
      tokenType === "false" ||
      tokenType === "null"
    );
  }
  /**
   * ParenthesizedExpression
   *  : '(' Expression ')'
   *  ;
   */
  ParenthesizedExpression() {
    this._eat("(");
    const expression = this.Expression();
    this._eat(")");
    return expression;
  }

  /**
   * Literal
   *  : NumericLiteral
   *  | StringLiteral
   *  | BooleanLiteral
   * | NullLiteral
   *  ;
   */
  Literal() {
    switch (this._lookahead.type) {
      case "NUMBER":
        return this.NumericLiteral();
      case "STRING":
        return this.StringLiteral();
      case "true":
        return this.BooleanLiteral(true);
      case "false":
        return this.BooleanLiteral(false);
      case "null":
        return this.NullLiteral();
    }
    throw new SyntaxError(`Literal: unexpected literal production`);
  }
  /**
   * BooleanLiteral
   * : 'true'
   * | 'false'
   * ;
   */
  BooleanLiteral(value) {
    if (value === true) {
      this._eat("true");
    } else {
      this._eat("false");
    }
    return {
      type: "BooleanLiteral",
      value,
    };
  }
  /**
   * NullLiteral
   * : 'null'
   * ;
   */
  NullLiteral() {
    this._eat("null");
    return {
      type: "NullLiteral",
      value: null,
    };
  }

  /**
   * NumericLiteral
   * :Number
   * ;
   */
  NumericLiteral() {
    const token = this._eat("NUMBER");
    return {
      type: "NumericLiteral",
      value: Number(token.value),
    };
  }
  /**
   * Double Quot StringLiteral
   * :String
   * ;
   */
  StringLiteral() {
    const token = this._eat("STRING");
    return {
      type: "StringLiteral",
      value: token.value.slice(1, -1),
    };
  }

  /**
   * Expects a token of a given type.
   */
  _eat(tokenType) {
    const token = this._lookahead;
    if (token == null) {
      throw new SyntaxError(`
            Unexpected end of input, expected: "${tokenType}"
            `);
    }
    if (token.type !== tokenType) {
      throw new SyntaxError(`
            Unexpected end of input, expected: "${tokenType}"
            `);
    }
    // Advance to next token
    this._lookahead = this._tokenizer.getNextToken();
    return token;
  }
}

module.exports = {
  Parser,
};
