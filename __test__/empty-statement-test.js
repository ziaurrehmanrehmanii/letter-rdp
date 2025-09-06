module.exports = (test) => {
    console.log("\u26a0\ufe0f Empty-statement tests (not registered)\n");

    // Single empty statement
    test(`;`, {
        type: "Program",
        body: [{ type: "EmptyStatement" }],
    });

    // Two empty statements
    test(`;;`, {
        type: "Program",
        body: [{ type: "EmptyStatement" }, { type: "EmptyStatement" }],
    });

    // Empty before an expression
    test(`;15;`, {
        type: "Program",
        body: [
            { type: "EmptyStatement" },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 15 } },
        ],
    });

    // Empty after an expression (trailing empty)
    test(`15;;`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 15 } },
            { type: "EmptyStatement" },
        ],
    });

    // Empty in the middle between expressions
    test(`15;;20;`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 15 } },
            { type: "EmptyStatement" },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 20 } },
        ],
    });

    // Spaces between semicolons
    test(`15; ;20;`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 15 } },
            { type: "EmptyStatement" },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 20 } },
        ],
    });

    // Empty input -> empty body
    test(``, {
        type: "Program",
        body: [],
    });

    // Whitespace-only input -> empty body
    test(`   \n  \t  `, {
        type: "Program",
        body: [],
    });

    // Semicolon with comment after it
    test(`; // lone empty`, {
        type: "Program",
        body: [{ type: "EmptyStatement" }],
    });

    // Empty statements mixed with nested blocks (empty statements around blocks)
    test(`;{ };;{1;};`, {
        type: "Program",
        body: [
            { type: "EmptyStatement" },
            { type: "BlockStatement", body: [] },
            { type: "EmptyStatement" },
            { type: "EmptyStatement" },
            { type: "BlockStatement", body: [{ type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 1 } }] },
        ],
    });
};
