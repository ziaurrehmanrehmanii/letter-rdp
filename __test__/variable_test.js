module.exports = (test) => {
    console.log("\ud83d\udce6 Running variable test (let keyword) tests...\n");

    // Basic let declaration without initializer
    test(`let a;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration",
                kind: "let",
                declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: null },
                ],
            },
        ],
    });

    // Let with numeric initializer
    test(`let a = 1;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration",
                kind: "let",
                declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "NumericLiteral", value: 1 } },
                ],
            },
        ],
    });

    // Let with string initializer
    test(`let msg = "hello";`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration",
                kind: "let",
                declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "msg" }, init: { type: "StringLiteral", value: "hello" } },
                ],
            },
        ],
    });

    // Let with identifier initializer
    test(`let x = y;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration",
                kind: "let",
                declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "x" }, init: { type: "Identifier", name: "y" } },
                ],
            },
        ],
    });

    // Let with expression initializer (binary)
    test(`let a = 1 + 2;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration",
                kind: "let",
                declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 1 }, right: { type: "NumericLiteral", value: 2 } } },
                ],
            },
        ],
    });

    // Let where initializer is an assignment expression
    test(`let a = b = 2;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration",
                kind: "let",
                declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "AssignmentExpression", operator: "=", left: { type: "Identifier", name: "b" }, right: { type: "NumericLiteral", value: 2 } } },
                ],
            },
        ],
    });

    // Let with parenthesized initializer
    test(`let a = (1 + 2) * 3;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration",
                kind: "let",
                declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "BinaryExpression", operator: "*", left: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 1 }, right: { type: "NumericLiteral", value: 2 } }, right: { type: "NumericLiteral", value: 3 } } },
                ],
            },
        ],
    });

    // Multiple let statements in sequence
    test(`let a; let b = 2;`, {
        type: "Program",
        body: [
            { type: "VariableDeclaration", kind: "let", declarations: [{ type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: null }] },
            { type: "VariableDeclaration", kind: "let", declarations: [{ type: "VariableDeclarator", id: { type: "Identifier", name: "b" }, init: { type: "NumericLiteral", value: 2 } }] },
        ],
    });

    // Let inside block (block scoping)
    test(`{ let a = 5; }`, {
        type: "Program",
        body: [
            { type: "BlockStatement", body: [{ type: "VariableDeclaration", kind: "let", declarations: [{ type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "NumericLiteral", value: 5 } }] }] },
        ],
    });

    // Whitespace and comments around let
    test(`  /* pre */ let /*mid*/ a /*mid2*/ = /*mid3*/ 10;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration",
                kind: "let",
                declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "NumericLiteral", value: 10 } },
                ],
            },
        ],
    });

    // Additional exhaustive cases requested by user

    // Simple: let a=10;
    test(`let a=10;`, {
        type: "Program",
        body: [
            { type: "VariableDeclaration", kind: "let", declarations: [{ type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "NumericLiteral", value: 10 } }] },
        ],
    });

    // Multiple declarators without initializers: let a,b,c;
    test(`let a,b,c;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration", kind: "let", declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: null },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "b" }, init: null },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "c" }, init: null },
                ]
            },
        ],
    });

    // Mixed: let a,b=10,c;
    test(`let a,b=10,c;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration", kind: "let", declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: null },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "b" }, init: { type: "NumericLiteral", value: 10 } },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "c" }, init: null },
                ]
            },
        ],
    });

    // All initialized: let a=10,b=90,c=80;
    test(`let a=10,b=90,c=80;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration", kind: "let", declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "NumericLiteral", value: 10 } },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "b" }, init: { type: "NumericLiteral", value: 90 } },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "c" }, init: { type: "NumericLiteral", value: 80 } },
                ]
            },
        ],
    });

    // Chained assignment in initializer: let a = b = c = 1;
    test(`let a = b = c = 1;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration", kind: "let", declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "AssignmentExpression", operator: "=", left: { type: "Identifier", name: "b" }, right: { type: "AssignmentExpression", operator: "=", left: { type: "Identifier", name: "c" }, right: { type: "NumericLiteral", value: 1 } } } },
                ]
            },
        ],
    });

    // Underscore identifier and mix: let _x, y=2;
    test(`let _x, y = 2;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration", kind: "let", declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "_x" }, init: null },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "y" }, init: { type: "NumericLiteral", value: 2 } },
                ]
            },
        ],
    });

    // Comments and whitespace between declarators
    test(`let a /*c*/ = 1, /*m*/ b = 2 , c;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration", kind: "let", declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "NumericLiteral", value: 1 } },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "b" }, init: { type: "NumericLiteral", value: 2 } },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "c" }, init: null },
                ]
            },
        ],
    });

    // Mixed types and expressions: let a = 1 + 2, b = "x", c;
    test(`let a = 1 + 2, b = "x", c;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration", kind: "let", declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 1 }, right: { type: "NumericLiteral", value: 2 } } },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "b" }, init: { type: "StringLiteral", value: "x" } },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "c" }, init: null },
                ]
            },
        ],
    });

    // Declaration followed by an extra semicolon (empty statement)
    test(`let a=10;;`, {
        type: "Program",
        body: [
            { type: "VariableDeclaration", kind: "let", declarations: [{ type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "NumericLiteral", value: 10 } }] },
            { type: "EmptyStatement" },
        ],
    });

    // Multi-line declarators: let a = 1,\n b = 2, c;
    test(`let a = 1,\n b = 2, c;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration", kind: "let", declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "NumericLiteral", value: 1 } },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "b" }, init: { type: "NumericLiteral", value: 2 } },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "c" }, init: null },
                ]
            },
        ],
    });

    // Nested assignment expressions inside initializer: let a = (b = (c = 1)), d;
    test(`let a = (b = (c = 1)), d;`, {
        type: "Program",
        body: [
            {
                type: "VariableDeclaration", kind: "let", declarations: [
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "a" }, init: { type: "AssignmentExpression", operator: "=", left: { type: "Identifier", name: "b" }, right: { type: "AssignmentExpression", operator: "=", left: { type: "Identifier", name: "c" }, right: { type: "NumericLiteral", value: 1 } } } },
                    { type: "VariableDeclarator", id: { type: "Identifier", name: "d" }, init: null },
                ]
            },
        ],
    });

};
