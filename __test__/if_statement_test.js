module.exports = (test) => {
  console.log("\u267b\ufe0f Running if-statement tests...\n");

  // Simple empty consequent
  test(`if(x) { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "x" },
        consequent: { type: "BlockStatement", body: [] },
        alternate: null,
      },
    ],
  });

  // Consequent with a single statement
  test(`if(x) { a = 1; }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "x" },
        consequent: {
          type: "BlockStatement",
          body: [
            {
              type: "ExpressionStatement",
              expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: { type: "Identifier", name: "a" },
                right: { type: "NumericLiteral", value: 1 },
              },
            },
          ],
        },
        alternate: null,
      },
    ],
  });

  // If with else
  test(`if(x) { a = 1; } else { b = 2; }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "x" },
        consequent: {
          type: "BlockStatement",
          body: [
            {
              type: "ExpressionStatement",
              expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: { type: "Identifier", name: "a" },
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
                left: { type: "Identifier", name: "b" },
                right: { type: "NumericLiteral", value: 2 },
              },
            },
          ],
        },
      },
    ],
  });

  // Empty else
  test(`if(x) { } else { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "x" },
        consequent: { type: "BlockStatement", body: [] },
        alternate: { type: "BlockStatement", body: [] },
      },
    ],
  });

  // Nested if in consequent
  test(`if(x) { if(y) { } }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "x" },
        consequent: {
          type: "BlockStatement",
          body: [
            {
              type: "IfStatement",
              test: { type: "Identifier", name: "y" },
              consequent: { type: "BlockStatement", body: [] },
              alternate: null,
            },
          ],
        },
        alternate: null,
      },
    ],
  });

  // Multiple statements in consequent
  test(`if(x) { a = 1; b = 2; }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "x" },
        consequent: {
          type: "BlockStatement",
          body: [
            {
              type: "ExpressionStatement",
              expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: { type: "Identifier", name: "a" },
                right: { type: "NumericLiteral", value: 1 },
              },
            },
            {
              type: "ExpressionStatement",
              expression: {
                type: "AssignmentExpression",
                operator: "=",
                left: { type: "Identifier", name: "b" },
                right: { type: "NumericLiteral", value: 2 },
              },
            },
          ],
        },
        alternate: null,
      },
    ],
  });

  // If statement followed by another statement
  test(`if(x) { } 15;`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "x" },
        consequent: { type: "BlockStatement", body: [] },
        alternate: null,
      },
      {
        type: "ExpressionStatement",
        expression: { type: "NumericLiteral", value: 15 },
      },
    ],
  });

  // Else-if chain (alternate is another IfStatement)
  test(`if(a) { } else if(b) { } else { c = 1; }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "a" },
        consequent: { type: "BlockStatement", body: [] },
        alternate: {
          type: "IfStatement",
          test: { type: "Identifier", name: "b" },
          consequent: { type: "BlockStatement", body: [] },
          alternate: {
            type: "BlockStatement",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "AssignmentExpression",
                  operator: "=",
                  left: { type: "Identifier", name: "c" },
                  right: { type: "NumericLiteral", value: 1 },
                },
              },
            ],
          },
        },
      },
    ],
  });

  // Whitespace/comments around if and parentheses
  test(`/*pre*/ if /*m*/ ( x ) { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "x" },
        consequent: { type: "BlockStatement", body: [] },
        alternate: null,
      },
    ],
  });

  // Nested if without braces in consequent, with else matching inner if
  test(`if(x) if(y) { } else { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "x" },
        consequent: {
          type: "IfStatement",
          test: { type: "Identifier", name: "y" },
          consequent: { type: "BlockStatement", body: [] },
          alternate: { type: "BlockStatement", body: [] },
        },
        alternate: null,
      },
    ],
  });

  // Nested if without braces in consequent, else-if on inner
  test(`if(x) if(y) { } else if(z) { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "x" },
        consequent: {
          type: "IfStatement",
          test: { type: "Identifier", name: "y" },
          consequent: { type: "BlockStatement", body: [] },
          alternate: {
            type: "IfStatement",
            test: { type: "Identifier", name: "z" },
            consequent: { type: "BlockStatement", body: [] },
            alternate: null,
          },
        },
        alternate: null,
      },
    ],
  });

  // else-if chain where outer has else-if that contains another if without braces
  // The else after the inner `if(c)` binds to that inner if; the outer `if(b)` has no alternate.
  test(`if(a) { } else if(b) if(c) { } else { d = 1; }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "a" },
        consequent: { type: "BlockStatement", body: [] },
        alternate: {
          type: "IfStatement",
          test: { type: "Identifier", name: "b" },
          consequent: {
            type: "IfStatement",
            test: { type: "Identifier", name: "c" },
            consequent: { type: "BlockStatement", body: [] },
            alternate: {
              type: "BlockStatement",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "AssignmentExpression",
                    operator: "=",
                    left: { type: "Identifier", name: "d" },
                    right: { type: "NumericLiteral", value: 1 },
                  },
                },
              ],
            },
          },
          alternate: null,
        },
      },
    ],
  });

  // Deeply nested combinations
  test(`if(a) if(b) if(c) { } else { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "a" },
        consequent: {
          type: "IfStatement",
          test: { type: "Identifier", name: "b" },
          consequent: {
            type: "IfStatement",
            test: { type: "Identifier", name: "c" },
            consequent: { type: "BlockStatement", body: [] },
            alternate: { type: "BlockStatement", body: [] },
          },
          alternate: null,
        },
        alternate: null,
      },
    ],
  });

  // outer else with inner else-if chain
  test(`if(a) { } else if(b) { } else if(c) { } else { e = 2; }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: { type: "Identifier", name: "a" },
        consequent: { type: "BlockStatement", body: [] },
        alternate: {
          type: "IfStatement",
          test: { type: "Identifier", name: "b" },
          consequent: { type: "BlockStatement", body: [] },
          alternate: {
            type: "IfStatement",
            test: { type: "Identifier", name: "c" },
            consequent: { type: "BlockStatement", body: [] },
            alternate: {
              type: "BlockStatement",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "AssignmentExpression",
                    operator: "=",
                    left: { type: "Identifier", name: "e" },
                    right: { type: "NumericLiteral", value: 2 },
                  },
                },
              ],
            },
          },
        },
      },
    ],
  });
};
