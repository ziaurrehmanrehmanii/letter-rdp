module.exports = (test) => {
  console.log("\ud83d\udcdd Running assignment operator tests... \n");

  // Simple assignment: a = 1;
  test(`a = 1;`, {
    type: "Program",
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
  });

  // Assignment with identifier RHS: b = a;
  test(`b = a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: { type: "Identifier", name: "b" },
          right: { type: "Identifier", name: "a" },
        },
      },
    ],
  });

  // Chained assignment (right-associative): a = b = 2;
  test(`a = b = 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: { type: "Identifier", name: "a" },
          right: {
            type: "AssignmentExpression",
            operator: "=",
            left: { type: "Identifier", name: "b" },
            right: { type: "NumericLiteral", value: 2 },
          },
        },
      },
    ],
  });

  // Assignment with expression on RHS: a = 1 + 2;
  test(`a = 1 + 2;`, {
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
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
        },
      },
    ],
  });

  // Compound assignment: a += 2;
  test(`a += 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "+=",
          left: { type: "Identifier", name: "a" },
          right: { type: "NumericLiteral", value: 2 },
        },
      },
    ],
  });

  // Compound assignment: a -= 3;
  test(`a -= 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "-=",
          left: { type: "Identifier", name: "a" },
          right: { type: "NumericLiteral", value: 3 },
        },
      },
    ],
  });

  // Compound assignment: a *= 4;
  test(`a *= 4;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "*=",
          left: { type: "Identifier", name: "a" },
          right: { type: "NumericLiteral", value: 4 },
        },
      },
    ],
  });

  // Compound assignment: a /= 5;
  test(`a /= 5;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "/=",
          left: { type: "Identifier", name: "a" },
          right: { type: "NumericLiteral", value: 5 },
        },
      },
    ],
  });

  // Assignment with whitespace and comments
  test(`  /* pre */ a /*mid*/ = /*mid2*/ 10;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: { type: "Identifier", name: "a" },
          right: { type: "NumericLiteral", value: 10 },
        },
      },
    ],
  });

  // Compound assignment with expression RHS: a += 1 + 2;
  test(`a += 1 + 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "+=",
          left: { type: "Identifier", name: "a" },
          right: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
        },
      },
    ],
  });

  // Chained mix: a = b += 2;
  test(`a = b += 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: { type: "Identifier", name: "a" },
          right: {
            type: "AssignmentExpression",
            operator: "+=",
            left: { type: "Identifier", name: "b" },
            right: { type: "NumericLiteral", value: 2 },
          },
        },
      },
    ],
  });

  // Parentheses on RHS: a = (1 + 2) * 3;
  test(`a = (1 + 2) * 3;`, {
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
            operator: "*",
            left: {
              type: "BinaryExpression",
              operator: "+",
              left: { type: "NumericLiteral", value: 1 },
              right: { type: "NumericLiteral", value: 2 },
            },
            right: { type: "NumericLiteral", value: 3 },
          },
        },
      },
    ],
  });

  // Identifier with underscore: _x = 5;
  test(`_x = 5;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: { type: "Identifier", name: "_x" },
          right: { type: "NumericLiteral", value: 5 },
        },
      },
    ],
  });

  // Long chain: a = b = c += 1;
  test(`a = b = c += 1;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: { type: "Identifier", name: "a" },
          right: {
            type: "AssignmentExpression",
            operator: "=",
            left: { type: "Identifier", name: "b" },
            right: {
              type: "AssignmentExpression",
              operator: "+=",
              left: { type: "Identifier", name: "c" },
              right: { type: "NumericLiteral", value: 1 },
            },
          },
        },
      },
    ],
  });

  // Assignment where RHS is a relational expression
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

  // Compound assignment with identifier RHS
  test(`a *= b + 2;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "*=",
          left: { type: "Identifier", name: "a" },
          right: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "Identifier", name: "b" },
            right: { type: "NumericLiteral", value: 2 },
          },
        },
      },
    ],
  });
};
