Predicate.prototype.isCallExpression = function () {
  let slice = this.string.substring(this.start, this.end);
   if (slice[0] === '$' || this.context === 'functionStatement') {
    return true;
  }
};