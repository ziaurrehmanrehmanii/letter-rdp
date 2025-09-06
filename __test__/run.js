/**
 * Main test Runner
 */

const { Parser } = require("../src/Parser");

const parser = new Parser();
const testProgram = [
  `123`,
  `            123`,
  `"Hello, World!"`,
  `'Hello, World!'`,
];
for (let i = 0; i < testProgram.length; i++) {
  const program = testProgram[i];
  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, null, 2));
}
