export enum TokenType {
  OpenParen,
  CloseParen,
  OpenCurly,
  CloseCurly,
  OpenBracket,
  CloseBracket,
  Equals,
  SafeEquals,
  Type,
  MaybeType,
  Identifier,
  NotEquals,
  SafeNotEquals,
  BinaryOperator,
  Keyword,
}

export interface Token {
  type: TokenType
  value: string
}
