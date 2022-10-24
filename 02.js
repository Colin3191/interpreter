const INTEGER = "INTEGER",
  PLUS = "PLUS",
  MINUS = "MINUS",
  EOF = "EOF";

const isDigit = (str) => {
  return Number.isInteger(Number(str));
};

class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class Interpreter {
  constructor(text) {
    this.text = text;
    this.pos = 0;
    this.currentToken = null;
    this.currentChar = this.text[this.pos];
  }

  advance() {
    this.pos++;
    if (this.pos > this.text.length - 1) {
      this.currentChar = null;
    } else {
      this.currentChar = this.text[this.pos];
    }
  }

  skipWhiteSpace() {
    while (this.currentChar !== null && this.currentChar === " ") {
      this.advance();
    }
  }

  integer() {
    let result = "";
    while (this.currentChar !== null && isDigit(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    return Number(result);
  }

  getNextToken() {
    while (this.currentChar !== null) {
      if (this.currentChar === " ") {
        this.skipWhiteSpace();
        continue;
      }
      if (isDigit(this.currentChar)) {
        return new Token(INTEGER, this.integer());
      }
      if (this.currentChar === "+") {
        this.advance();
        return new Token(PLUS, "+");
      }
      if (this.currentChar === "-") {
        this.advance();
        return new Token(MINUS, "-");
      }
      throw new Error();
    }
    return new Token(EOF, null);
  }

  eat(tokenType) {
    if (this.currentToken?.type === tokenType) {
      this.currentToken = this.getNextToken();
    } else {
      throw new Error();
    }
  }

  expr() {
    this.currentToken = this.getNextToken();
    const left = this.currentToken;
    this.eat(INTEGER);
    const op = this.currentToken;
    if (op.type === PLUS) {
      this.eat(PLUS);
    } else {
      this.eat(MINUS);
    }
    const right = this.currentToken;
    this.eat(INTEGER);
    let result;
    if (op.type === PLUS) {
      result = left.value + right.value;
    } else {
      result = left.value - right.value;
    }
    return result;
  }
}

const res = new Interpreter("1 - 2").expr();
console.log(res);
