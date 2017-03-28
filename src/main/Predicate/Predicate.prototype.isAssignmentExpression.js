Predicate.prototype.isAssignmentExpression = function () {
  var slice = this.string.substring(this.start, this.end);
  return new RegExp(EXP_VAR.source + '(\\s+|)=').test(slice);
};