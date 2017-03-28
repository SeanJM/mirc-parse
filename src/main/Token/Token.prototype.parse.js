Token.prototype.parse = function () {
  return this[this.type]();
};