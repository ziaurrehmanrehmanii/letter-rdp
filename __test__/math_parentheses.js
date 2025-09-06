module.exports = (test) => {
    console.log("\ud83d\udd22 Running math parentheses tests... \n");

    // Parentheses around a single literal
    test(`(3);`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "NumericLiteral", value: 3 } },
        ],
    });

    // Simple grouping does not change a single operation: (1 + 2)
    test(`(1 + 2);`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 1 }, right: { type: "NumericLiteral", value: 2 } } },
        ],
    });

    // Parentheses forcing addition before multiplication: (1 + 2) * 3
    test(`(1 + 2) * 3;`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "BinaryExpression", operator: "*", left: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 1 }, right: { type: "NumericLiteral", value: 2 } }, right: { type: "NumericLiteral", value: 3 } } },
        ],
    });

    // Parentheses keep multiplication localized: 1 + (2 * 3)
    test(`1 + (2 * 3);`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 1 }, right: { type: "BinaryExpression", operator: "*", left: { type: "NumericLiteral", value: 2 }, right: { type: "NumericLiteral", value: 3 } } } },
        ],
    });

    // Nested parentheses: ((1 + 2) + 3)
    test(`((1 + 2) + 3);`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "BinaryExpression", operator: "+", left: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 1 }, right: { type: "NumericLiteral", value: 2 } }, right: { type: "NumericLiteral", value: 3 } } },
        ],
    });

    // Parentheses combining many ops: (1 + 2) * (3 - 4)
    test(`(1 + 2) * (3 - 4);`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "BinaryExpression", operator: "*", left: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 1 }, right: { type: "NumericLiteral", value: 2 } }, right: { type: "BinaryExpression", operator: "-", left: { type: "NumericLiteral", value: 3 }, right: { type: "NumericLiteral", value: 4 } } } },
        ],
    });

    // Parentheses with division: (8 / (4 / 2))
    test(`8 / (4 / 2);`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "BinaryExpression", operator: "/", left: { type: "NumericLiteral", value: 8 }, right: { type: "BinaryExpression", operator: "/", left: { type: "NumericLiteral", value: 4 }, right: { type: "NumericLiteral", value: 2 } } } },
        ],
    });

    // Deeply nested parentheses: ( (1 + (2)) )
    test(`( (1 + (2)) );`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 1 }, right: { type: "NumericLiteral", value: 2 } } },
        ],
    });

    // Parentheses altering evaluation: 1 * (2 + 3) - 4
    test(`1 * (2 + 3) - 4;`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "BinaryExpression", operator: "-", left: { type: "BinaryExpression", operator: "*", left: { type: "NumericLiteral", value: 1 }, right: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 2 }, right: { type: "NumericLiteral", value: 3 } } }, right: { type: "NumericLiteral", value: 4 } } },
        ],
    });

    // Mixed with multiple parentheses: (1 + (2 * (3 + 4)))
    test(`(1 + (2 * (3 + 4)));`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 1 }, right: { type: "BinaryExpression", operator: "*", left: { type: "NumericLiteral", value: 2 }, right: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 3 }, right: { type: "NumericLiteral", value: 4 } } } } },
        ],
    });

    // Parentheses around entire expression: (1 + 2 * 3 - 4 / 2)
    test(`(1 + 2 * 3 - 4 / 2);`, {
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
                        right: { type: "BinaryExpression", operator: "*", left: { type: "NumericLiteral", value: 2 }, right: { type: "NumericLiteral", value: 3 } },
                    },
                    right: { type: "BinaryExpression", operator: "/", left: { type: "NumericLiteral", value: 4 }, right: { type: "NumericLiteral", value: 2 } },
                },
            },
        ],
    });

    // Ensure parentheses can appear anywhere in a chain: 1 + (2 + (3 * (4)))
    test(`1 + (2 + (3 * (4)));`, {
        type: "Program",
        body: [
            { type: "ExpressionStatement", expression: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 1 }, right: { type: "BinaryExpression", operator: "+", left: { type: "NumericLiteral", value: 2 }, right: { type: "BinaryExpression", operator: "*", left: { type: "NumericLiteral", value: 3 }, right: { type: "NumericLiteral", value: 4 } } } } },
        ],
    });

};
