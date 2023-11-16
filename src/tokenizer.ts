import { TokenType, type Token } from '../types/lexer'
import KEYWORDS from './keywords.ts'

class Tokenizer {
  tokens: Token[] = []
  source: string[] = []
  currentChar: string = this.source[0]

  constructor(sourceCode: string) {
    this.source = this.getChars(sourceCode)
    this.currentChar = this.source[0]
  }

  isInteger(str: string) {
    const c = str.charCodeAt(0)
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)]
    return c >= bounds[0] && c <= bounds[1]
  }

  isAlpha(src: string) {
    return src.toUpperCase() != src.toLowerCase()
  }

  getChars(sourceCode: string): string[] {
    return sourceCode.trim().split('')
  }

  createToken(type: TokenType, value: string) {
    this.source.shift()
    return this.tokens.push({
      type,
      value,
    })
  }

  tokenize() {
    while (this.source.length > 0) {
      switch (this.currentChar) {
        case '(':
          this.createToken(TokenType.OpenParen, this.currentChar)
          break
        case '{':
          this.createToken(TokenType.OpenCurly, this.currentChar)
          break
        case '[':
          this.createToken(TokenType.OpenBracket, this.currentChar)
          break
        case ')':
          this.createToken(TokenType.CloseParen, this.currentChar)
          break
        case '}':
          this.createToken(TokenType.CloseCurly, this.currentChar)
          break
        case ']':
          this.createToken(TokenType.CloseBracket, this.currentChar)
          break
        case '=':
          if (this.source[1] === '=') {
            if (this.source[2] === '=') {
              this.createToken(
                TokenType.SafeEquals,
                this.currentChar + this.source[1] + this.source[2],
              )
              this.source.shift()
              this.source.shift()
              this.source.shift()
              break
            } else {
              this.createToken(TokenType.Equals, this.currentChar + this.source[1])
              this.source.shift()
              this.source.shift()
              break
            }
          } else {
            this.createToken(TokenType.ToBe, this.currentChar)
            this.source.shift()
            break
          }
        case '!':
          if (this.source[1] === '=') {
            if (this.source[2] === '=') {
              this.createToken(
                TokenType.SafeNotEquals,
                this.currentChar + this.source[1] + this.source[2],
              )
              this.source.shift()
              this.source.shift()
              this.source.shift()
              break
            } else {
              this.createToken(TokenType.NotEquals, this.currentChar + this.source[1])
              this.source.shift()
              this.source.shift()
              break
            }
          } else {
            this.createToken(TokenType.Not, this.currentChar)
            this.source.shift()
            break
          }
        case '&':
          this.createToken(TokenType.And, this.currentChar)
          this.source.shift()
          break
        case '|':
          this.createToken(TokenType.Or, this.currentChar)
          this.source.shift()
          break
        case '+':
          this.createToken(TokenType.BinaryOperator, this.currentChar)
          this.source.shift()
          break
        case '-':
          this.createToken(TokenType.BinaryOperator, this.currentChar)
          this.source.shift()
          break
        case '*':
          if (this.source[1] === '*') {
            this.createToken(TokenType.BinaryOperator, this.currentChar + this.source[1])
            this.source.shift()
          } else {
            this.createToken(TokenType.BinaryOperator, this.currentChar)
          }
          this.source.shift()
          break
        case '/':
          this.createToken(TokenType.BinaryOperator, this.currentChar)
          this.source.shift()
          break
        case '%':
          this.createToken(TokenType.BinaryOperator, this.currentChar)
          this.source.shift()
          break
        default:
          if (this.isInteger(this.source[0])) {
            let num = ''
            while (this.source.length > 0 && this.isInteger(this.source[0])) {
              num += this.source.shift()
            }

            this.createToken(TokenType.Number, num)
          } else if (this.isAlpha(this.source[0])) {
            let ident = ''
            while (this.source.length > 0 && this.isAlpha(this.source[0])) {
              ident += this.source.shift()
            }
            const reserved = KEYWORDS[ident]
            if (reserved) {
              this.createToken(TokenType.Keyword, reserved)
            } else {
              this.createToken(TokenType.Identifier, ident)
            }
          } else if (this.source[0] === ' ' || this.source[0] === '\t' || this.source[0] === '\n') {
            this.source.shift()
          } else {
            console.error(
              'Unreconized character found in source: ',
              this.source[0].charCodeAt(0),
              this.source[0],
            )
          }
      }
      this.currentChar = this.source[0]
    }
  }

  getTokens() {
    return this.tokens
  }
}

export default Tokenizer
