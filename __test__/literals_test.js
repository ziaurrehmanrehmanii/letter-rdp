module.exports = (test) => {
    // Small banner to add some pizazz when tests are loaded
    console.log("🔎 Running literal tests... ✨\n");

    // NumericLiteral 🎯
    test(`15;`, {
        type: "Program",
        body: [
            {
                type: "ExpressionStatement",
                expression: {
                    type: "NumericLiteral",
                    value: 15,
                },
            },
        ],
    });

    // StringLiteral - double quotes 💬
    test(`"Hello World";`, {
        type: "Program",
        body: [
            {
                type: "ExpressionStatement",
                expression: {
                    type: "StringLiteral",
                    value: "Hello World",
                },
            },
        ],
    });

    // StringLiteral - single quotes 📝
    test(`'Hello World';`, {
        type: "Program",
        body: [
            {
                type: "ExpressionStatement",
                expression: {
                    type: "StringLiteral",
                    value: "Hello World",
                },
            },
        ],
    });

    // StringLiteral - with whitespace before ⬅️ (should ignore leading spaces)
    test(`        "Hello World";`, {
        type: "Program",
        body: [
            {
                type: "ExpressionStatement",
                expression: {
                    type: "StringLiteral",
                    value: "Hello World",
                },
            },
        ],
    });

    // StringLiteral - with single line comment before 🗒️
    test(
        `// This is a comment
                    "Hello World";`,
        {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "StringLiteral",
                        value: "Hello World",
                    },
                },
            ],
        }
    );

    // StringLiteral - with multi line comment before 🧾
    test(
        `/* This is a 
                     multi line comment */
                    "Hello World";`,
        {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "StringLiteral",
                        value: "Hello World",
                    },
                },
            ],
        }
    );
};
