Token.prototype.getType = function () {
  if (/\$(\$|)[a-zA-Z]/.test(this.token)) {
    this.type = 'expressionStatement';
  } else if (/%[a-zA-Z:_\-0-9]/.test(this.token)) {
    this.type = 'identifier';
  } else {
    this.type = 'stringLiteral';
  }
};