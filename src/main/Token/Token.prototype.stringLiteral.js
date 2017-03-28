Token.prototype.stringLiteral = function () {
  return {
    start : this.start,
    end : this.end,
    type : this.type,
    value : this.token
  };
};