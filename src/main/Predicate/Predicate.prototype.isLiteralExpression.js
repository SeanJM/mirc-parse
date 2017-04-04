Predicate.prototype.isLiteralExpression = function () {
  var slice = this.string.substring(this.start, this.end);
  return !/^(%|\$|\|)/.test(slice);
};