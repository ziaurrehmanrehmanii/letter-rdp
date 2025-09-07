module.exports = (test) => {
  console.log("\u2696\ufe0f Running equality tests...\n");

  // simple equality and inequality with numbers
  test(`1 == 1;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "NumericLiteral", value: 1 },
          right: { type: "NumericLiteral", value: 1 },
        },
      },
    ],
  });

  test(`1 != 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "!=",
          left: { type: "NumericLiteral", value: 1 },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  // identifier equality
  test(`a == b;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "Identifier", name: "a" },
          right: { type: "Identifier", name: "b" },
        },
      },
    ],
  });

  test(`x != y;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "!=",
          left: { type: "Identifier", name: "x" },
          right: { type: "Identifier", name: "y" },
        },
      },
    ],
  });

  // precedence with arithmetic
  test(`1 + 2 == 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 3 },
        },
      },
    ],
  });

  test(`1 == 2 + 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "NumericLiteral", value: 1 },
          right: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 2 },
            right: { type: "NumericLiteral", value: 3 },
          },
        },
      },
    ],
  });

  // chaining equality and relational to ensure precedence order
  // Note: equality binds less tightly than relational, so
  // `1 == 2 < 3` parses as `1 == (2 < 3)`
  test(`1 == 2 < 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "NumericLiteral", value: 1 },
          right: {
            type: "BinaryExpression",
            operator: "<",
            left: { type: "NumericLiteral", value: 2 },
            right: { type: "NumericLiteral", value: 3 },
          },
        },
      },
    ],
  });

  test(`1 < 2 == 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: {
            type: "BinaryExpression",
            operator: "<",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 3 },
        },
      },
    ],
  });

  // equality inside if condition
  test(`if(a == b) { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "Identifier", name: "a" },
          right: { type: "Identifier", name: "b" },
        },
        consequent: { type: "BlockStatement", body: [] },
        alternate: null,
      },
    ],
  });

  test(`if(a != b) { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: "!=",
          left: { type: "Identifier", name: "a" },
          right: { type: "Identifier", name: "b" },
        },
        consequent: { type: "BlockStatement", body: [] },
        alternate: null,
      },
    ],
  });

  // Additional expanded equality tests covering more combinations

  // arithmetic with equality
  test(`1 + 1 == 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 1 },
          },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  test(`(1 + 1) == 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 1 },
          },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  test(`1 == (1 + 1);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "NumericLiteral", value: 1 },
          right: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 1 },
          },
        },
      },
    ],
  });

  // relational combined with equality
  test(`x > y == true;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: {
            type: "BinaryExpression",
            operator: ">",
            left: { type: "Identifier", name: "x" },
            right: { type: "Identifier", name: "y" },
          },
          right: { type: "BooleanLiteral", value: true },
        },
      },
    ],
  });

  test(`x > y == z < w;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: {
            type: "BinaryExpression",
            operator: ">",
            left: { type: "Identifier", name: "x" },
            right: { type: "Identifier", name: "y" },
          },
          right: {
            type: "BinaryExpression",
            operator: "<",
            left: { type: "Identifier", name: "z" },
            right: { type: "Identifier", name: "w" },
          },
        },
      },
    ],
  });

  // chained equality (left-associative in this parser)
  test(`a == b == c;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: {
            type: "BinaryExpression",
            operator: "==",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          right: { type: "Identifier", name: "c" },
        },
      },
    ],
  });

  // assignment with equality on RHS
  test(`a = b == c;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: { type: "Identifier", name: "a" },
          right: {
            type: "BinaryExpression",
            operator: "==",
            left: { type: "Identifier", name: "b" },
            right: { type: "Identifier", name: "c" },
          },
        },
      },
    ],
  });

  // strings and mixed types
  test(`a == '1';`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "Identifier", name: "a" },
          right: { type: "StringLiteral", value: "1" },
        },
      },
    ],
  });

  test(`'a' == "a";`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "StringLiteral", value: "a" },
          right: { type: "StringLiteral", value: "a" },
        },
      },
    ],
  });

  // null and boolean comparisons
  test(`null == null;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "NullLiteral", value: null },
          right: { type: "NullLiteral", value: null },
        },
      },
    ],
  });

  test(`a == null;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "Identifier", name: "a" },
          right: { type: "NullLiteral", value: null },
        },
      },
    ],
  });

  test(`null != a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "!=",
          left: { type: "NullLiteral", value: null },
          right: { type: "Identifier", name: "a" },
        },
      },
    ],
  });

  test(`true == false;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "BooleanLiteral", value: true },
          right: { type: "BooleanLiteral", value: false },
        },
      },
    ],
  });

  test(`false != true;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "!=",
          left: { type: "BooleanLiteral", value: false },
          right: { type: "BooleanLiteral", value: true },
        },
      },
    ],
  });

  // mixed numeric/string
  test(`1 == '1';`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: { type: "NumericLiteral", value: 1 },
          right: { type: "StringLiteral", value: "1" },
        },
      },
    ],
  });

  // complex arithmetic + equality
  test(`1 + 2 * 3 == 7 - 1;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: {
              type: "BinaryExpression",
              operator: "*",
              left: { type: "NumericLiteral", value: 2 },
              right: { type: "NumericLiteral", value: 3 },
            },
          },
          right: {
            type: "BinaryExpression",
            operator: "-",
            left: { type: "NumericLiteral", value: 7 },
            right: { type: "NumericLiteral", value: 1 },
          },
        },
      },
    ],
  });

  // chained relational then equality
  test(`1 < 2 < 3 == 4;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: {
            type: "BinaryExpression",
            operator: "<",
            left: {
              type: "BinaryExpression",
              operator: "<",
              left: { type: "NumericLiteral", value: 1 },
              right: { type: "NumericLiteral", value: 2 },
            },
            right: { type: "NumericLiteral", value: 3 },
          },
          right: { type: "NumericLiteral", value: 4 },
        },
      },
    ],
  });

  // grouping with parentheses
  test(`(x > y) == true;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: {
            type: "BinaryExpression",
            operator: ">",
            left: { type: "Identifier", name: "x" },
            right: { type: "Identifier", name: "y" },
          },
          right: { type: "BooleanLiteral", value: true },
        },
      },
    ],
  });

  // mixed inequality/equality chaining
  test(`a != b == c;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "==",
          left: {
            type: "BinaryExpression",
            operator: "!=",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          right: { type: "Identifier", name: "c" },
        },
      },
    ],
  });
};
