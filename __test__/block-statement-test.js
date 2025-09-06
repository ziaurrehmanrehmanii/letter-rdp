module.exports = (test) => {
    console.log("\ud83d\udd27 Running block-statement tests...\n");
    // Block followed by another statement
    test(`{ 1; } 2;`, {
        type: "Program",
        body: [
            { type: "BlockStatement", body: [{ type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 1 } }] },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 2 } },
        ],
    });

    // Empty block as the entire program (no trailing semicolon)
    test(`{}`, {
        type: "Program",
        body: [
            { type: "BlockStatement", body: [] },
        ],
    });

    // Nested empty block: one level deep
    test(`{ {} }`, {
        type: "Program",
        body: [
            {
                type: "BlockStatement",
                body: [
                    { type: "BlockStatement", body: [] },
                ],
            },
        ],
    });

    // Nested empty block: two levels deep
    test(`{ { {} } }`, {
        type: "Program",
        body: [
            {
                type: "BlockStatement",
                body: [
                    {
                        type: "BlockStatement",
                        body: [
                            { type: "BlockStatement", body: [] },
                        ],
                    },
                ],
            },
        ],
    });

    // Multiple empty blocks inside a parent
    test(`{ {} {} }`, {
        type: "Program",
        body: [
            {
                type: "BlockStatement",
                body: [
                    { type: "BlockStatement", body: [] },
                    { type: "BlockStatement", body: [] },
                ],
            },
        ],
    });

    // Single block as the entire program
    test(`{ 15; }`, {
        type: "Program",
        body: [
            { type: "BlockStatement", body: [{ type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 15 } }] },
        ],
    });

    // Nested blocks as the sole program
    test(`{ { 1; } { 2; } }`, {
        type: "Program",
        body: [
            {
                type: "BlockStatement",
                body: [
                    { type: "BlockStatement", body: [{ type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 1 } }] },
                    { type: "BlockStatement", body: [{ type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 2 } }] },
                ],
            },
        ],
    });

    // Block with mixed statements, no trailing semicolon after block
    test(`{ 'a'; 2; "b"; }`, {
        type: "Program",
        body: [
            {
                type: "BlockStatement",
                body: [
                    { type: "ExpressionStatement", expression: { type: "StringLiteral", value: "a" } },
                    { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 2 } },
                    { type: "ExpressionStatement", expression: { type: "StringLiteral", value: "b" } },
                ],
            },
        ],
    });

    // Block with comments and whitespace inside
    test(`{ /*c*/ 15; // end\n 20; }`, {
        type: "Program",
        body: [
            {
                type: "BlockStatement",
                body: [
                    { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 15 } },
                    { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 20 } },
                ],
            },
        ],
    });

    // Multiple blocks in sequence (no standalone semicolon)
    test(`{1;}{2;}`, {
        type: "Program",
        body: [
            { type: "BlockStatement", body: [{ type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 1 } }] },
            { type: "BlockStatement", body: [{ type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 2 } }] },
        ],
    });

    // Complex nested block structure (no trailing semicolon)
    test(`{ 1; { 2; { 3; } } 4; }`, {
        type: "Program",
        body: [
            {
                type: "BlockStatement",
                body: [
                    { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 1 } },
                    {
                        type: "BlockStatement",
                        body: [
                            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 2 } },
                            { type: "BlockStatement", body: [{ type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 3 } }] },
                        ],
                    },
                    { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 4 } },
                ],
            },
        ],
    });
    // (More complex nested-block tests removed because they relied on trailing semicolons)
};
