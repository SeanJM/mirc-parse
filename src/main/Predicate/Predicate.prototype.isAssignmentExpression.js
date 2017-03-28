Predicate.prototype.isAssignmentExpression = function () {
  var slice = this.string.substring(this.start, this.end);
  var exp = new RegExp(EXP_VAR.source + '(\\s+|)=[^=]');
  return exp.test(slice);
};