module.exports = (test) => {
    console.log("\u2699\ufe0f Running statement-list tests...\n");

    // Two numeric statements
    test(`15; 20;`, {
        type: "Program",
        body: [
            {
                type: "ExpressionStatement",
                expression: { type: "NumericLiteral", value: 15 },
            },
            {
                type: "ExpressionStatement",
                expression: { type: "NumericLiteral", value: 20 },
            },
        ],
    });

    // Three numeric statements
    test(`1;2;3;`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 1 } },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 2 } },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 3 } },
        ],
    });

    // Mixed string and numeric statements
    test(`'a'; "b"; 10;`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "StringLiteral", value: "a" } },
            { type: "ExpressionStatement", expression: { type: "StringLiteral", value: "b" } },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 10 } },
        ],
    });

    // Whitespace and newlines between statements
    test(`  15;\n\n 20;   \n`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 15 } },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 20 } },
        ],
    });

    // Single-line comment between statements
    test(`15; // comment between\n20;`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 15 } },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 20 } },
        ],
    });

    // Multi-line comment between statements
    test(`15; /* multi\nline comment */ 20;`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 15 } },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 20 } },
        ],
    });

    // Leading comment before first statement
    test(`/*leading*/15;20;`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 15 } },
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 20 } },
        ],
    });
    // (Empty-statement tests removed for now)
};
