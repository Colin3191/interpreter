const INTEGER = "INTEGER",
  PLUS = "PLUS",
  EOF = "EOF";

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
  }

  getNextToken() {
    if (this.pos > this.text.length - 1) {
      return new Token(EOF, null);
    }
    const currentChar = this.text[this.pos];
    if (Number.isInteger(Number(currentChar))) {
      this.pos++;
      return new Token(INTEGER, Number(currentChar));
    }
    if (currentChar === "+") {
      this.pos++;
      return new Token(PLUS, currentChar);
    }
    throw new Error();
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
    this.eat(PLUS);
    const right = this.currentToken;
    this.eat(INTEGER);
    const result = left.value + right.value;
    return result;
  }
}

const res = new Interpreter("1+2").expr();
console.log(res);
