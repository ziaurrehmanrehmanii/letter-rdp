/**
 * Main test Runner
 */

const { Parser } = require("../src/Parser");

const parser = new Parser();
const testProgram = [
  //Numbers
  `123`,
  //Whitespace should be ignored
  `            "Whitespace before"`,
  // Double quoted strings
  `"Double quoted string"`,
  // Single quoted strings
  `'Single quoted string'`,
  // Single line comment should be ignored
  `// This is a comment
    "Single line comment"`,
  // Multi line comment should be ignored
  `/* This is a 
       multi line comment */
    "Multi line comment"`,
];
for (let i = 0; i < testProgram.length; i++) {
  const program = testProgram[i];
  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, null, 2));
}
