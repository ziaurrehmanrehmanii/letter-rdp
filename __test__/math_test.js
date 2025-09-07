module.exports = (test) => {
  console.log("\ud83d\udd22 Running math tests... \n");

  // Single operators
  test(`1 + 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: { type: "NumericLiteral", value: 1 },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  test(`1 - 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "-",
          left: { type: "NumericLiteral", value: 1 },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  test(`2 * 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "*",
          left: { type: "NumericLiteral", value: 2 },
          right: { type: "NumericLiteral", value: 3 },
        },
      },
    ],
  });

  test(`8 / 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "/",
          left: { type: "NumericLiteral", value: 8 },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  // Same-precedence chains (left-associative)
  test(`1 + 2 + 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
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

  test(`5 - 2 - 1;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "-",
          left: {
            type: "BinaryExpression",
            operator: "-",
            left: { type: "NumericLiteral", value: 5 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 1 },
        },
      },
    ],
  });

  test(`2 * 3 * 4;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "*",
          left: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "NumericLiteral", value: 2 },
            right: { type: "NumericLiteral", value: 3 },
          },
          right: { type: "NumericLiteral", value: 4 },
        },
      },
    ],
  });

  test(`16 / 2 / 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "/",
          left: {
            type: "BinaryExpression",
            operator: "/",
            left: { type: "NumericLiteral", value: 16 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  // Mixed-precedence pairs (multiplicative binds tighter than additive)
  test(`1 + 2 * 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
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
      },
    ],
  });

  test(`1 * 2 + 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 3 },
        },
      },
    ],
  });

  test(`1 - 2 * 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "-",
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

  test(`1 * 2 - 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "-",
          left: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 3 },
        },
      },
    ],
  });

  test(`4 / 2 + 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: {
            type: "BinaryExpression",
            operator: "/",
            left: { type: "NumericLiteral", value: 4 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 3 },
        },
      },
    ],
  });

  test(`4 + 2 / 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: { type: "NumericLiteral", value: 4 },
          right: {
            type: "BinaryExpression",
            operator: "/",
            left: { type: "NumericLiteral", value: 2 },
            right: { type: "NumericLiteral", value: 3 },
          },
        },
      },
    ],
  });

  // Multiplicative chain precedence and associativity
  test(`4 / 2 * 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "*",
          left: {
            type: "BinaryExpression",
            operator: "/",
            left: { type: "NumericLiteral", value: 4 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 3 },
        },
      },
    ],
  });

  test(`4 * 2 / 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "/",
          left: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "NumericLiteral", value: 4 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: { type: "NumericLiteral", value: 3 },
        },
      },
    ],
  });

  // Longer mixed expression: 1 + 2 * 3 - 4 / 2 => ((1 + (2*3)) - (4/2))
  test(`1 + 2 * 3 - 4 / 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "-",
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
            operator: "/",
            left: { type: "NumericLiteral", value: 4 },
            right: { type: "NumericLiteral", value: 2 },
          },
        },
      },
    ],
  });

  // Another longer mixed: 3 * 2 + 4 - 6 / 3 => (((3*2) + 4) - (6/3))
  test(`3 * 2 + 4 - 6 / 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "-",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: {
              type: "BinaryExpression",
              operator: "*",
              left: { type: "NumericLiteral", value: 3 },
              right: { type: "NumericLiteral", value: 2 },
            },
            right: { type: "NumericLiteral", value: 4 },
          },
          right: {
            type: "BinaryExpression",
            operator: "/",
            left: { type: "NumericLiteral", value: 6 },
            right: { type: "NumericLiteral", value: 3 },
          },
        },
      },
    ],
  });

  // Additional precedence coverage requested
  // Division and multiplication left-associative checks
  test(`100 / 10 * 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "*",
          left: {
            type: "BinaryExpression",
            operator: "/",
            left: { type: "NumericLiteral", value: 100 },
            right: { type: "NumericLiteral", value: 10 },
          },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  test(`100 * 10 / 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "/",
          left: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "NumericLiteral", value: 100 },
            right: { type: "NumericLiteral", value: 10 },
          },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  // Parentheses vs left-assoc
  test(`100 / (10 * 2);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "/",
          left: { type: "NumericLiteral", value: 100 },
          right: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "NumericLiteral", value: 10 },
            right: { type: "NumericLiteral", value: 2 },
          },
        },
      },
    ],
  });

  test(`(100 / 10) * (6 / 3);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "*",
          left: {
            type: "BinaryExpression",
            operator: "/",
            left: { type: "NumericLiteral", value: 100 },
            right: { type: "NumericLiteral", value: 10 },
          },
          right: {
            type: "BinaryExpression",
            operator: "/",
            left: { type: "NumericLiteral", value: 6 },
            right: { type: "NumericLiteral", value: 3 },
          },
        },
      },
    ],
  });

  // Longer mixed chain exposing precedence across many ops
  test(`1 + 2 - 3 * 4 / 2 + 5;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: {
            type: "BinaryExpression",
            operator: "-",
            left: {
              type: "BinaryExpression",
              operator: "+",
              left: { type: "NumericLiteral", value: 1 },
              right: { type: "NumericLiteral", value: 2 },
            },
            right: {
              type: "BinaryExpression",
              operator: "/",
              left: {
                type: "BinaryExpression",
                operator: "*",
                left: { type: "NumericLiteral", value: 3 },
                right: { type: "NumericLiteral", value: 4 },
              },
              right: { type: "NumericLiteral", value: 2 },
            },
          },
          right: { type: "NumericLiteral", value: 5 },
        },
      },
    ],
  });

  // Combined complex parentheses case
  test(`((1 + 2) * 3) / (6 / 2);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "/",
          left: {
            type: "BinaryExpression",
            operator: "*",
            left: {
              type: "BinaryExpression",
              operator: "+",
              left: { type: "NumericLiteral", value: 1 },
              right: { type: "NumericLiteral", value: 2 },
            },
            right: { type: "NumericLiteral", value: 3 },
          },
          right: {
            type: "BinaryExpression",
            operator: "/",
            left: { type: "NumericLiteral", value: 6 },
            right: { type: "NumericLiteral", value: 2 },
          },
        },
      },
    ],
  });
};
