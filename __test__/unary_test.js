module.exports = (test) => {
  console.log("➕ Running unary expression tests...\n");

  // Unary plus
  test(`+a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "+",
          argument: { type: "Identifier", name: "a" },
          prefix: true,
        },
      },
    ],
  });

  test(`+1;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "+",
          argument: { type: "NumericLiteral", value: 1 },
          prefix: true,
        },
      },
    ],
  });

  test(`+"hello";`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "+",
          argument: { type: "StringLiteral", value: "hello" },
          prefix: true,
        },
      },
    ],
  });

  test(`+true;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "+",
          argument: { type: "BooleanLiteral", value: true },
          prefix: true,
        },
      },
    ],
  });

  test(`+null;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "+",
          argument: { type: "NullLiteral", value: null },
          prefix: true,
        },
      },
    ],
  });

  // Unary minus
  test(`-a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "-",
          argument: { type: "Identifier", name: "a" },
          prefix: true,
        },
      },
    ],
  });

  test(`-42;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "-",
          argument: { type: "NumericLiteral", value: 42 },
          prefix: true,
        },
      },
    ],
  });

  test(`-"world";`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "-",
          argument: { type: "StringLiteral", value: "world" },
          prefix: true,
        },
      },
    ],
  });

  test(`-false;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "-",
          argument: { type: "BooleanLiteral", value: false },
          prefix: true,
        },
      },
    ],
  });

  // Logical NOT
  test(`!a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "!",
          argument: { type: "Identifier", name: "a" },
          prefix: true,
        },
      },
    ],
  });

  test(`!true;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "!",
          argument: { type: "BooleanLiteral", value: true },
          prefix: true,
        },
      },
    ],
  });

  test(`!0;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "!",
          argument: { type: "NumericLiteral", value: 0 },
          prefix: true,
        },
      },
    ],
  });

  test(`!null;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "!",
          argument: { type: "NullLiteral", value: null },
          prefix: true,
        },
      },
    ],
  });

  test(`!"string";`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "!",
          argument: { type: "StringLiteral", value: "string" },
          prefix: true,
        },
      },
    ],
  });

  // Bitwise NOT
  test(`~a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "~",
          argument: { type: "Identifier", name: "a" },
          prefix: true,
        },
      },
    ],
  });

  test(`~5;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "~",
          argument: { type: "NumericLiteral", value: 5 },
          prefix: true,
        },
      },
    ],
  });

  test(`~"test";`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "~",
          argument: { type: "StringLiteral", value: "test" },
          prefix: true,
        },
      },
    ],
  });

  // typeof
  test(`typeof a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "typeof",
          argument: { type: "Identifier", name: "a" },
          prefix: true,
        },
      },
    ],
  });

  test(`typeof 42;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "typeof",
          argument: { type: "NumericLiteral", value: 42 },
          prefix: true,
        },
      },
    ],
  });

  test(`typeof "hello";`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "typeof",
          argument: { type: "StringLiteral", value: "hello" },
          prefix: true,
        },
      },
    ],
  });

  test(`typeof true;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "typeof",
          argument: { type: "BooleanLiteral", value: true },
          prefix: true,
        },
      },
    ],
  });

  test(`typeof null;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "typeof",
          argument: { type: "NullLiteral", value: null },
          prefix: true,
        },
      },
    ],
  });

  // void
  test(`void a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "void",
          argument: { type: "Identifier", name: "a" },
          prefix: true,
        },
      },
    ],
  });

  test(`void 0;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "void",
          argument: { type: "NumericLiteral", value: 0 },
          prefix: true,
        },
      },
    ],
  });

  test(`void "expr";`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "void",
          argument: { type: "StringLiteral", value: "expr" },
          prefix: true,
        },
      },
    ],
  });

  // delete
  test(`delete a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "delete",
          argument: { type: "Identifier", name: "a" },
          prefix: true,
        },
      },
    ],
  });

  test(`delete obj.prop;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "delete",
          argument: {
            type: "MemberExpression",
            object: { type: "Identifier", name: "obj" },
            property: { type: "Identifier", name: "prop" },
            computed: false,
          },
          prefix: true,
        },
      },
    ],
  });

  test(`delete arr[0];`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "delete",
          argument: {
            type: "MemberExpression",
            object: { type: "Identifier", name: "arr" },
            property: { type: "NumericLiteral", value: 0 },
            computed: true,
          },
          prefix: true,
        },
      },
    ],
  });

  // Chained unary expressions
  test(`!!a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "!",
          argument: {
            type: "UnaryExpression",
            operator: "!",
            argument: { type: "Identifier", name: "a" },
            prefix: true,
          },
          prefix: true,
        },
      },
    ],
  });

  test(`--a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "-",
          argument: {
            type: "UnaryExpression",
            operator: "-",
            argument: { type: "Identifier", name: "a" },
            prefix: true,
          },
          prefix: true,
        },
      },
    ],
  });

  test(`++a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "+",
          argument: {
            type: "UnaryExpression",
            operator: "+",
            argument: { type: "Identifier", name: "a" },
            prefix: true,
          },
          prefix: true,
        },
      },
    ],
  });

  test(`~~~a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "~",
          argument: {
            type: "UnaryExpression",
            operator: "~",
            argument: {
              type: "UnaryExpression",
              operator: "~",
              argument: { type: "Identifier", name: "a" },
              prefix: true,
            },
            prefix: true,
          },
          prefix: true,
        },
      },
    ],
  });

  // Unary with binary expressions
  test(`!(a && b);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "!",
          argument: {
            type: "BinaryExpression",
            operator: "&&",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          prefix: true,
        },
      },
    ],
  });

  test(`-(a + b);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "-",
          argument: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          prefix: true,
        },
      },
    ],
  });

  test(`+ (a * b);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "+",
          argument: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          prefix: true,
        },
      },
    ],
  });

  // Unary in assignments
  test(`a = -b;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: { type: "Identifier", name: "a" },
          right: {
            type: "UnaryExpression",
            operator: "-",
            argument: { type: "Identifier", name: "b" },
            prefix: true,
          },
        },
      },
    ],
  });

  test(`x = !y;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "AssignmentExpression",
          operator: "=",
          left: { type: "Identifier", name: "x" },
          right: {
            type: "UnaryExpression",
            operator: "!",
            argument: { type: "Identifier", name: "y" },
            prefix: true,
          },
        },
      },
    ],
  });

  // Unary in variable declarations
  test(`let x = +y;`, {
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
              type: "UnaryExpression",
              operator: "+",
              argument: { type: "Identifier", name: "y" },
              prefix: true,
            },
          },
        ],
      },
    ],
  });

  test(`let neg = -value;`, {
    type: "Program",
    body: [
      {
        type: "VariableDeclaration",
        kind: "let",
        declarations: [
          {
            type: "VariableDeclarator",
            id: { type: "Identifier", name: "neg" },
            init: {
              type: "UnaryExpression",
              operator: "-",
              argument: { type: "Identifier", name: "value" },
              prefix: true,
            },
          },
        ],
      },
    ],
  });

  // Unary with function calls (if supported)
  test(`!func();`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "!",
          argument: {
            type: "CallExpression",
            callee: { type: "Identifier", name: "func" },
            arguments: [],
          },
          prefix: true,
        },
      },
    ],
  });

  // Complex chained
  test(`typeof !!a;`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "typeof",
          argument: {
            type: "UnaryExpression",
            operator: "!",
            argument: {
              type: "UnaryExpression",
              operator: "!",
              argument: { type: "Identifier", name: "a" },
              prefix: true,
            },
            prefix: true,
          },
          prefix: true,
        },
      },
    ],
  });

  // With parentheses
  test(`(+a);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "+",
          argument: { type: "Identifier", name: "a" },
          prefix: true,
        },
      },
    ],
  });

  test(`-(a + b);`, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "UnaryExpression",
          operator: "-",
          argument: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "Identifier", name: "a" },
            right: { type: "Identifier", name: "b" },
          },
          prefix: true,
        },
      },
    ],
  });
};
