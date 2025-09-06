/**
 * @module Parser
 * Letter Parser: recursive descent implementation
 */
const { Tokenizer } = require("./Tokenizer");
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
    return {
      type: "Program",
      body: this.Literal(),
    };
  }
  /**
   * Literal
   *  : NumericLiteral
   *  | StringLiteral
   *  ;
   */
  Literal() {
    switch (this._lookahead.type) {
      case "NUMBER":
        return this.NumericLiteral();
      case "STRING":
        return this.StringLiteral();
    }
    throw new SyntaxError(`Literal: unexpected literal production`);
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
