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
    // Numbers:
    if (!Number.isNaN(Number(string[0]))) {
      let number = "";
      while (!Number.isNaN(Number(string[this._cursor]))) {
        number += string[this._cursor++];
      }
      return {
        type: "NUMBER",
        value: number,
      };
    }
    //  Double Quot Strings:
    if (string[0] === '"') {
      let s = '';
      do {
        s += string[this._cursor++];
      } while (string[this._cursor] !== '"' && !this.isEOF());
      s += this._cursor++; //skip ""
      return {
        type: "D_STRING",
        value: s,
      };
    }
    //  Single Quot Strings:
    if (string[0] === `'`) {
      let s = ``;
      do {
        s += string[this._cursor++];
      } while (string[this._cursor] !== `'` && !this.isEOF());
      s += this._cursor++; //skip ""
      return {
        type: "S_STRING",
        value: s,
      };
    }
  }
}

module.exports = { Tokenizer };
