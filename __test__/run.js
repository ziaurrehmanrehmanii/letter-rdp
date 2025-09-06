/**
 * Main test Runner with per-test terminal reporting
 */

const { Parser } = require("../src/Parser");
const assert = require("assert");

/**
 * List of test-definition modules. Each module should export a function
 * that receives a single `test(program, expected)` function and calls it
 * for each case. This keeps a single place for defining tests.
 */
const tests = [require("./literals_test"), require("./statement-list-test"), require("./block-statement-test"), require("./empty-statement-test")];

const parser = new Parser();

// Collector for registered tests (so test files only declare tests)
const registered = [];

/**
 * Registration function passed to test files. It only records tests.
 */
function test(program, expected) {
  registered.push({ program, expected });
}

/**
 * Manual test registrations (for quick debugging)
 */
function exec(input) {
  // Show a compact single-line preview of the input
  const preview = typeof input === 'string' ? input.replace(/\n/g, ' ↩︎ ').trim() : String(input);
  console.log(`
🧪 Manual exec: ${preview}
`);

  // Forward raw input to the parser without sanitization or alteration
  try {
    const ast = parser.parse(input);
    console.log("✅ AST:");
    console.log(JSON.stringify(ast, null, 2));
    return ast;
  } catch (err) {
    console.log("❌ Parse error during manual exec:");
    console.error(err && err.message ? err.message : err);
    return null;
  }
}
// Example manual run (safe: parse errors are caught and won't crash the test runner)
// exec(`;`);

// CLI: allow running a manual snippet with -m "your code"
const argv = process.argv.slice(2);
// Support a skip-sanitize flag anywhere in argv: -sm or --skip-sanitize
const skipSanitize = argv.includes("-sm") || argv.includes("--skip-sanitize");

// Build a cleaned argv that strips the skip flag so it won't be consumed as input
const cleanedArgv = argv.filter((a) => a !== "-sm" && a !== "--skip-sanitize");
const manualFlagIndex = cleanedArgv.findIndex((a) => a === "-m" || a === "--manual");
if (manualFlagIndex !== -1) {
  const manualArgs = cleanedArgv.slice(manualFlagIndex + 1);
  if (manualArgs.length === 0) {
    console.log("Usage: node __test__/run.js -m \"your program here\"");
    process.exit(2);
  }
  const manualInput = manualArgs.join(" ");
  // If skipSanitize is set, set a global flag the exec function will use
  global.__SKIP_SANITIZE = skipSanitize;
  const result = exec(manualInput);
  // exit non-zero if parse failed
  if (result === null) process.exit(1);
  process.exit(0);
}

// Load test definitions (they will call `test(...)` to register cases)
tests.forEach((testRun) => testRun(test));

// Run registered tests with per-test output
let passed = 0;
let failed = 0;

console.log("🔧 Running tests with per-test output...\n");

registered.forEach((t, i) => {
  const short = (() => {
    if (typeof t.program !== "string") return String(t.program);
    return t.program.replace(/\n/g, "↩︎ ").trim().slice(0, 60);
  })();

  try {
    const ast = parser.parse(t.program);
    assert.deepEqual(ast, t.expected);
    passed++;
    console.log(`✅ Test ${i + 1}: ${short}`);
  } catch (err) {
    failed++;
    console.log(`❌ Test ${i + 1}: ${short}`);
    // Print a compact error for easier debugging
    console.error(err && err.message ? err.message : err);
  }
});

console.log(`\nSummary: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("All tests passed :)");
}
