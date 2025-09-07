/**
 * Tokenizer spec.
 */
const Spec = [
  //Numbers:
  //-----------------------------
  [/^\d+/, "NUMBER"],
  //Strings:
  //-----------------------------
  [/^"[^"]*"/, "STRING"],
  [/^'[^']*'/, "STRING"],
  //Identifiers:
  //-----------------------------
  [/^[A-Za-z_]\w*/, "IDENTIFIER"],

  // Skip tokens
  //-----------------------------
  //Whitespace:
  //-----------------------------
  [/^\s+/, null],
  //Single Line Comments:
  //-----------------------------
  [/^\/\/.*/, null],
  //Multi Line Comments:
  //-----------------------------
  [/^\/\*[\s\S]*?\*\//, null],

  //Symbols: delimiters and operators
  //-----------------------------
  [/^;/, ";"],
  [/^{/, "{"],
  [/^}/, "}"],
  [/^\(/, "("],
  [/^\)/, ")"],

  //Operators:
  //-----------------------------
  // Assignment complex forms first so we don't split e.g. '+=' into '+' and '='
  [/^[\*\/\+\-]=/, "COMPLEX_ASSIGN"],
  //Math:
  //-----------------------------
  [/^[+\-]/, "ADDITIVE_OPERATOR"],
  [/^[*\/]/, "MULTIPLICATIVE_OPERATOR"],
  // Simple assignment
  [/^=/, "SIMPLE_ASSIGN"],




];


/**
 * Tokenizer class
 *
 * Lazily pulls a token from a stream
 */

class Tokenizer {
  /**
   * Initializes the string
   */
  init(string) {
    this._string = string;
    this._cursor = 0;
  }
  /**
   * Whether the tokenizer reached EOF
   */
  isEOF() {
    return this._cursor === this._string.length;
  }

  /**
   * whether we still have more tokens
   */
  hasMoreTokens() {
    return this._cursor < this._string.length;
  }

  /**
   * Obtain next token
   */
  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this._string.slice(this._cursor);
    for (const [regexp, tokenType] of Spec) {
      const tokenValue = this._match(regexp, string);
      if (tokenValue == null) {
        continue;
      }
      //should skip token, e.g.whitespace
      if (tokenType == null) {
        return this.getNextToken();
      }
      //return token
      return { type: tokenType, value: tokenValue[0] };
    }
    throw new SyntaxError(`Unexpected token ${string[0]} `);
  }

  /**
   *
   * Matches a regexp from the current cursor position
   * If matched, advances the cursor
   * Otherwise, returns null
   */
  _match(regexp, string) {
    const matched = regexp.exec(string);
    if (matched == null) {
      return null;
    }
    this._cursor += matched[0].length;
    return matched;
  }
}
module.exports = { Tokenizer, Spec };
