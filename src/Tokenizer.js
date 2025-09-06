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

    let matched = /^\d+/.exec(string);
    // Numbers:
    if (matched !== null) {
      this._cursor += matched[0].length;
      return {
        type: "NUMBER",
        value: matched[0],
      };
    }
    // Strings:
    matched = /"[^"]*"/.exec(string);
    if (matched !== null) {
      this._cursor += matched.length;
      return {
        type: "STRING",
        value: matched[0],
      };
    }
    //  Single Quot Strings:
    matched = /'[^']*'/.exec(string);
    if (matched !== null) {
      this._cursor += matched.length;
      return {
        type: "STRING",
        value: matched[0],
      };
    }
  }
}

module.exports = { Tokenizer };
