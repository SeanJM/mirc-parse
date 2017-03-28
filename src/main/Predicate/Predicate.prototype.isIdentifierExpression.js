Predicate.prototype.isIdentifierExpression = function () {
  var slice = this.string.substring(this.start, this.end);
  return EXP_VAR.test(slice);
};