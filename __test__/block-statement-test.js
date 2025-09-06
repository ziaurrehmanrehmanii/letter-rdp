module.exports = (test) => {
    console.log("\ud83d\udd27 Running block-statement tests...\n");

    // Basic empty block {}
    test(`{};`, {
        type: "Program",
        body: [
            { type: "BlockStatement", body: [] },
        ],
    });

    // Block with a single expression statement
    test(`{ 15; };`, {
        type: "Program",
        body: [
            {
                type: "BlockStatement",
                body: [
                    { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 15 } },
                ],
            },
        ],
    });

    // Nested blocks
    test(`{ { 1; } { 2; } };`, {
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

    // Block with mixed statements
    test(`{ 'a'; 2; "b"; };`, {
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

    // Block with comments and whitespace
    test(`{ /*c*/ 15; // end\n 20; };`, {
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

    // Block followed by another statement
    test(`{ 1; } 2;`, {
        type: "Program",
        body: [
            { type: "BlockStatement", body: [{ type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 1 } }] },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 2 } },
        ],
    });

    // Multiple blocks in sequence
    test(`{1;}{2;};`, {
        type: "Program",
        body: [
            { type: "BlockStatement", body: [{ type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 1 } }] },
            { type: "BlockStatement", body: [{ type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 2 } }] },
        ],
    });

    // Block containing nested blocks and expressions
    test(`{ 1; { 2; { 3; } } 4; };`, {
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
};
