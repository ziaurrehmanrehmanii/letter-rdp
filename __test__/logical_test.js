module.exports = (test) => {
  console.log("🔗 Running logical operator tests...\n");

  // Simple logical AND (&&) with booleans
  test(`true && false;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "&&",
          left: { type: "BooleanLiteral", value: true },
          right: { type: "BooleanLiteral", value: false },
        },
      },
    ],
  });

  test(`false && true;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "&&",
          left: { type: "BooleanLiteral", value: false },
          right: { type: "BooleanLiteral", value: true },
        },
      },
    ],
  });

  // Simple logical OR (||) with booleans
  test(`true || false;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: { type: "BooleanLiteral", value: true },
          right: { type: "BooleanLiteral", value: false },
        },
      },
    ],
  });

  test(`false || true;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: { type: "BooleanLiteral", value: false },
          right: { type: "BooleanLiteral", value: true },
        },
      },
    ],
  });

  // Logical AND/OR with identifiers
  test(`a && b;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "&&",
          left: { type: "Identifier", name: "a" },
          right: { type: "Identifier", name: "b" },
        },
      },
    ],
  });

  test(`x || y;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: { type: "Identifier", name: "x" },
          right: { type: "Identifier", name: "y" },
        },
      },
    ],
  });

  // Logical AND/OR with mixed types (identifiers and literals)
  test(`a && true;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "&&",
          left: { type: "Identifier", name: "a" },
          right: { type: "BooleanLiteral", value: true },
        },
      },
    ],
  });

  test(`false || b;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: { type: "BooleanLiteral", value: false },
          right: { type: "Identifier", name: "b" },
        },
      },
    ],
  });

  // Logical AND/OR with expressions (equality)
  test(`a == b && c != d;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "&&",
          left: {
            type: "BinaryExpression",
            operator: "==",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          right: {
            type: "BinaryExpression",
            operator: "!=",
            left: { type: "Identifier", name: "c" },
            right: { type: "Identifier", name: "d" },
          },
        },
      },
    ],
  });

  test(`x < y || z > w;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: {
            type: "BinaryExpression",
            operator: "<",
            left: { type: "Identifier", name: "x" },
            right: { type: "Identifier", name: "y" },
          },
          right: {
            type: "BinaryExpression",
            operator: ">",
            left: { type: "Identifier", name: "z" },
            right: { type: "Identifier", name: "w" },
          },
        },
      },
    ],
  });

  // Logical AND/OR with arithmetic expressions
  test(`1 + 2 && 3 * 4;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "&&",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "NumericLiteral", value: 1 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "NumericLiteral", value: 3 },
            right: { type: "NumericLiteral", value: 4 },
          },
        },
      },
    ],
  });

  test(`5 / 2 || 7 - 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: {
            type: "BinaryExpression",
            operator: "/",
            left: { type: "NumericLiteral", value: 5 },
            right: { type: "NumericLiteral", value: 2 },
          },
          right: {
            type: "BinaryExpression",
            operator: "-",
            left: { type: "NumericLiteral", value: 7 },
            right: { type: "NumericLiteral", value: 3 },
          },
        },
      },
    ],
  });

  // Chaining logical operators (left-associative)
  test(`a && b && c;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "&&",
          left: {
            type: "BinaryExpression",
            operator: "&&",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          right: { type: "Identifier", name: "c" },
        },
      },
    ],
  });

  test(`x || y || z;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: {
            type: "BinaryExpression",
            operator: "||",
            left: { type: "Identifier", name: "x" },
            right: { type: "Identifier", name: "y" },
          },
          right: { type: "Identifier", name: "z" },
        },
      },
    ],
  });

  // Mixed chaining: && and ||
  test(`a && b || c;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: {
            type: "BinaryExpression",
            operator: "&&",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          right: { type: "Identifier", name: "c" },
        },
      },
    ],
  });

  test(`a || b && c;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: { type: "Identifier", name: "a" },
          right: {
            type: "BinaryExpression",
            operator: "&&",
            left: { type: "Identifier", name: "b" },
            right: { type: "Identifier", name: "c" },
          },
        },
      },
    ],
  });

  // Parentheses to change precedence
  test(`(a && b) || c;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: {
            type: "BinaryExpression",
            operator: "&&",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          right: { type: "Identifier", name: "c" },
        },
      },
    ],
  });

  test(`a && (b || c);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "&&",
          left: { type: "Identifier", name: "a" },
          right: {
            type: "BinaryExpression",
            operator: "||",
            left: { type: "Identifier", name: "b" },
            right: { type: "Identifier", name: "c" },
          },
        },
      },
    ],
  });

  // Logical operators in if conditions
  test(`if(a && b) { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: "&&",
          left: { type: "Identifier", name: "a" },
          right: { type: "Identifier", name: "b" },
        },
        consequent: { type: "BlockStatement", body: [] },
        alternate: null,
      },
    ],
  });

  test(`if(x || y) { }`, {
    type: "Program",
    body: [
      {
        type: "IfStatement",
        test: {
          type: "BinaryExpression",
          operator: "||",
          left: { type: "Identifier", name: "x" },
          right: { type: "Identifier", name: "y" },
        },
        consequent: { type: "BlockStatement", body: [] },
        alternate: null,
      },
    ],
  });

  // Assignment with logical operators on RHS
  test(`a = b && c;`, {
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
            operator: "&&",
            left: { type: "Identifier", name: "b" },
            right: { type: "Identifier", name: "c" },
          },
        },
      },
    ],
  });

  test(`x = y || z;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: { type: "Identifier", name: "x" },
          right: {
            type: "BinaryExpression",
            operator: "||",
            left: { type: "Identifier", name: "y" },
            right: { type: "Identifier", name: "z" },
          },
        },
      },
    ],
  });

  // Complex expressions with multiple operators
  test(`a == b && c < d || e != f;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: {
            type: "BinaryExpression",
            operator: "&&",
            left: {
              type: "BinaryExpression",
              operator: "==",
              left: { type: "Identifier", name: "a" },
              right: { type: "Identifier", name: "b" },
            },
            right: {
              type: "BinaryExpression",
              operator: "<",
              left: { type: "Identifier", name: "c" },
              right: { type: "Identifier", name: "d" },
            },
          },
          right: {
            type: "BinaryExpression",
            operator: "!=",
            left: { type: "Identifier", name: "e" },
            right: { type: "Identifier", name: "f" },
          },
        },
      },
    ],
  });

  // Logical operators with null and strings
  test(`null && true;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "&&",
          left: { type: "NullLiteral", value: null },
          right: { type: "BooleanLiteral", value: true },
        },
      },
    ],
  });

  test(`"hello" || false;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: { type: "StringLiteral", value: "hello" },
          right: { type: "BooleanLiteral", value: false },
        },
      },
    ],
  });

  // Nested parentheses
  test(`((a && b) || (c && d));`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: {
            type: "BinaryExpression",
            operator: "&&",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          right: {
            type: "BinaryExpression",
            operator: "&&",
            left: { type: "Identifier", name: "c" },
            right: { type: "Identifier", name: "d" },
          },
        },
      },
    ],
  });

  // Logical operators with numeric literals (though not typical, for completeness)
  test(`1 && 0;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "&&",
          left: { type: "NumericLiteral", value: 1 },
          right: { type: "NumericLiteral", value: 0 },
        },
      },
    ],
  });

  test(`2 || 3;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: { type: "NumericLiteral", value: 2 },
          right: { type: "NumericLiteral", value: 3 },
        },
      },
    ],
  });

  // More chaining and mixed
  test(`a && b || c && d;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "||",
          left: {
            type: "BinaryExpression",
            operator: "&&",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          right: {
            type: "BinaryExpression",
            operator: "&&",
            left: { type: "Identifier", name: "c" },
            right: { type: "Identifier", name: "d" },
          },
        },
      },
    ],
  });

  // Logical operators in variable declarations
  test(`let x = a && b;`, {
    type: "Program",
    body: [
      {
        type: "VariableDeclaration",
        kind: "let",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "x" },
            init: {
              type: "BinaryExpression",
              operator: "&&",
              left: { type: "Identifier", name: "a" },
              right: { type: "Identifier", name: "b" },
            },
          },
        ],
      },
    ],
  });

  test(`let y = c || d;`, {
    type: "Program",
    body: [
      {
        type: "VariableDeclaration",
        kind: "let",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "y" },
            init: {
              type: "BinaryExpression",
              operator: "||",
              left: { type: "Identifier", name: "c" },
              right: { type: "Identifier", name: "d" },
            },
          },
        ],
      },
    ],
  });
};
