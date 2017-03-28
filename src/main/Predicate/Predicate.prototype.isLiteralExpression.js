/*
  - (A) && (B)
  - (A) || (B)
  - (A) || (B)
*/
Predicate.prototype.isLiteralExpression = function () {
  var slice = this.string.substring(this.start, this.end);
  return !/^(%|\$)/.test(slice);
};