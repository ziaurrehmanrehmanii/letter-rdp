module.exports = (test) => {
  console.log("\u26aa\ufe0f Running relational tests...\n");

  // simple numeric comparisons
  test(`1 < 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "NumericLiteral", value: 1 },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  test(`3 > 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: ">",
          left: { type: "NumericLiteral", value: 3 },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  // identifier comparisons
  test(`a < b;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "Identifier", name: "a" },
          right: { type: "Identifier", name: "b" },
        },
      },
    ],
  });

  test(`x > y;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: ">",
          left: { type: "Identifier", name: "x" },
          right: { type: "Identifier", name: "y" },
        },
      },
    ],
  });

  // precedence: additive on the left
  test(`1 + 2 < 4;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 4 },
        },
      },
    ],
  });

  // precedence: additive on the right
  test(`1 < 2 + 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
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

  // multiplicative precedence
  test(`2 * 3 < 7;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "NumericLiteral", value: 2 },
            right: { type: "NumericLiteral", value: 3 },
          },
          right: { type: "NumericLiteral", value: 7 },
        },
      },
    ],
  });

  // parentheses
  test(`(1 + 2) < 4;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 4 },
        },
      },
    ],
  });

  test(`1 < (2 * 3);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "NumericLiteral", value: 1 },
          right: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "NumericLiteral", value: 2 },
            right: { type: "NumericLiteral", value: 3 },
          },
        },
      },
    ],
  });

  // chaining (left associative)
  test(`1 < 2 < 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
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
      },
    ],
  });

  // assignment with relational on RHS
  test(`a = 1 < 2;`, {
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
            operator: "<",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
        },
      },
    ],
  });

  // relational inside an if condition
  test(`if(x < y) { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "Identifier", name: "x" },
          right: { type: "Identifier", name: "y" },
        },
        consequent: { type: "BlockStatement", body: [] },
        alternate: null,
      },
    ],
  });

  // Less-than-or-equal and greater-than-or-equal tests
  test(`1 <= 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<=",
          left: { type: "NumericLiteral", value: 1 },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  test(`3 >= 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: ">=",
          left: { type: "NumericLiteral", value: 3 },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  test(`a <= b;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<=",
          left: { type: "Identifier", name: "a" },
          right: { type: "Identifier", name: "b" },
        },
      },
    ],
  });

  test(`x >= y;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: ">=",
          left: { type: "Identifier", name: "x" },
          right: { type: "Identifier", name: "y" },
        },
      },
    ],
  });

  // precedence with <= and >=
  test(`1 + 2 <= 4;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<=",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 4 },
        },
      },
    ],
  });

  test(`1 <= 2 + 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<=",
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

  test(`2 * 3 <= 7;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<=",
          left: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "NumericLiteral", value: 2 },
            right: { type: "NumericLiteral", value: 3 },
          },
          right: { type: "NumericLiteral", value: 7 },
        },
      },
    ],
  });

  test(`(1 + 2) <= 4;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<=",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 4 },
        },
      },
    ],
  });

  test(`1 <= (2 * 3);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<=",
          left: { type: "NumericLiteral", value: 1 },
          right: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "NumericLiteral", value: 2 },
            right: { type: "NumericLiteral", value: 3 },
          },
        },
      },
    ],
  });

  // chaining with <= (left associative)
  test(`1 <= 2 <= 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<=",
          left: {
            type: "BinaryExpression",
            operator: "<=",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 3 },
        },
      },
    ],
  });

  // assignment with <=
  test(`a = 1 <= 2;`, {
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
            operator: "<=",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
        },
      },
    ],
  });

  // relational inside an if condition (<= and >=)
  test(`if(x <= y) { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: "<=",
          left: { type: "Identifier", name: "x" },
          right: { type: "Identifier", name: "y" },
        },
        consequent: { type: "BlockStatement", body: [] },
        alternate: null,
      },
    ],
  });

  test(`if(x >= y) { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: ">=",
          left: { type: "Identifier", name: "x" },
          right: { type: "Identifier", name: "y" },
        },
        consequent: { type: "BlockStatement", body: [] },
        alternate: null,
      },
    ],
  });

  // additional coverage
  test(`"a" < "b";`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "StringLiteral", value: "a" },
          right: { type: "StringLiteral", value: "b" },
        },
      },
    ],
  });

  test(`"1" < 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "StringLiteral", value: "1" },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  test(`foo >= 100;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: ">=",
          left: { type: "Identifier", name: "foo" },
          right: { type: "NumericLiteral", value: 100 },
        },
      },
    ],
  });

  // mixed chaining with left-associative expectation
  test(`1 < 2 <= 3 > 0;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: ">",
          left: {
            type: "BinaryExpression",
            operator: "<=",
            left: {
              type: "BinaryExpression",
              operator: "<",
              left: { type: "NumericLiteral", value: 1 },
              right: { type: "NumericLiteral", value: 2 },
            },
            right: { type: "NumericLiteral", value: 3 },
          },
          right: { type: "NumericLiteral", value: 0 },
        },
      },
    ],
  });

  // parentheses changing grouping
  test(`(1 < 2) <= (3 > 0);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<=",
          left: {
            type: "BinaryExpression",
            operator: "<",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: {
            type: "BinaryExpression",
            operator: ">",
            left: { type: "NumericLiteral", value: 3 },
            right: { type: "NumericLiteral", value: 0 },
          },
        },
      },
    ],
  });

  // nested if conditions using mix of relational ops
  test(`if(a < b) if(c >= d) { x = 1; } else { x = 2; }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "Identifier", name: "a" },
          right: { type: "Identifier", name: "b" },
        },
        consequent: {
          type: "IfStatement",
          test: {
            type: "BinaryExpression",
            operator: ">=",
            left: { type: "Identifier", name: "c" },
            right: { type: "Identifier", name: "d" },
          },
          consequent: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "AssignmentExpression",
                  operator: "=",
                  left: { type: "Identifier", name: "x" },
                  right: { type: "NumericLiteral", value: 1 },
                },
              },
            ],
          },
          alternate: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "AssignmentExpression",
                  operator: "=",
                  left: { type: "Identifier", name: "x" },
                  right: { type: "NumericLiteral", value: 2 },
                },
              },
            ],
          },
        },
        alternate: null,
      },
    ],
  });

  // assignment interaction with relational + arithmetic
  test(`a = 1 + 2 * 3 <= 10;`, {
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
            operator: "<=",
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
            right: { type: "NumericLiteral", value: 10 },
          },
        },
      },
    ],
  });

  test(`1 + 2 < 3 * 4 - 1;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: {
            type: "BinaryExpression",
            operator: "-",
            left: {
              type: "BinaryExpression",
              operator: "*",
              left: { type: "NumericLiteral", value: 3 },
              right: { type: "NumericLiteral", value: 4 },
            },
            right: { type: "NumericLiteral", value: 1 },
          },
        },
      },
    ],
  });

  test(`1 < 2 + 3 <= 6;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<=",
          left: {
            type: "BinaryExpression",
            operator: "<",
            left: { type: "NumericLiteral", value: 1 },
            right: {
              type: "BinaryExpression",
              operator: "+",
              left: { type: "NumericLiteral", value: 2 },
              right: { type: "NumericLiteral", value: 3 },
            },
          },
          right: { type: "NumericLiteral", value: 6 },
        },
      },
    ],
  });

  // extra relational mixes
  test(`a < 100;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "Identifier", name: "a" },
          right: { type: "NumericLiteral", value: 100 },
        },
      },
    ],
  });

  test(`100 >= b;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: ">=",
          left: { type: "NumericLiteral", value: 100 },
          right: { type: "Identifier", name: "b" },
        },
      },
    ],
  });

  test(`(a + 1) < (b * 2);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "Identifier", name: "a" },
            right: { type: "NumericLiteral", value: 1 },
          },
          right: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "Identifier", name: "b" },
            right: { type: "NumericLiteral", value: 2 },
          },
        },
      },
    ],
  });
};
