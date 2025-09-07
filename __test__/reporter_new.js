const assert = require('assert');
const { Parser } = require("../src/Parser");

function runSuites(suites, Parser) {
    const parser = new Parser();
    const allFailures = [];
    let globalTestNumber = 1;

    suites.forEach(({ name, run }) => {
        // collect tests for this suite
        const registered = [];
        function test(program, expected) {
            registered.push({ program, expected });
        }

        // run suite registration
        try {
            run(test);
        } catch (err) {
            console.error(`Error while registering tests for suite ${name}:`, err && err.message ? err.message : err);
            return;
        }

        let passed = 0;
        let failed = 0;
        const suiteFailures = [];

        console.log(`\n📦 Suite: ${name}`);
        registered.forEach((t, index) => {
            const testNum = globalTestNumber++;
            console.log(`Test ${testNum}: ${t.program.replace(/\n/g, ' ↩︎ ')}`);
            try {
                const ast = parser.parse(t.program);
                assert.deepEqual(ast, t.expected);
                passed++;
                console.log(`   ✅ Passed`);
            } catch (err) {
                failed++;
                let actual;
                try {
                    actual = parser.parse(t.program);
                } catch (parseErr) {
                    actual = { parseError: parseErr && parseErr.message ? parseErr.message : String(parseErr) };
                }
                suiteFailures.push({ testNum, program: t.program, expected: t.expected, actual });
                console.log(`   ❌ Failed`);
            }
        });

        // Per-suite summary
        console.log(`   Total: ${registered.length}  Passed: ${passed}  Failed: ${failed}\n`);

        if (suiteFailures.length) {
            suiteFailures.forEach((f) => allFailures.push({ suite: name, ...f }));
        }
    });

    // Final failures dump
    if (allFailures.length) {
        console.log('\n❌ Failed tests details:');
        allFailures.forEach((f) => {
            console.log(`\nTest ${f.testNum}) Suite: ${f.suite}`);
            console.log(`   Input: ${f.program.replace(/\n/g, ' ↩︎ ')}`);
            console.log('   Actual:');
            console.log(JSON.stringify(f.actual, null, 2));
        });
    }

    if (allFailures.length === 0) {
        console.log('\n✅ All suites passed with no failures.');
    }

    return allFailures.length;
}

module.exports = { runSuites };

// Define suites and run them
const suites = [
    { name: 'literals', run: require('./literals_test') },
    { name: 'math', run: require('./math_test') },
    { name: 'assignment', run: require('./assignment_operator_test') },
    { name: 'statement-list', run: require('./statement-list-test') },
    { name: 'block-statement', run: require('./block-statement-test') },
    { name: 'empty-statement', run: require('./empty-statement-test') },
    { name: 'math-parentheses', run: require('./math_parentheses') },
    { name: 'variable', run: require('./variable_test') },
    { name: 'if-statement', run: require('./if_statement_test') },
];

const failures = runSuites(suites, Parser);
if (failures > 0) process.exit(1);
