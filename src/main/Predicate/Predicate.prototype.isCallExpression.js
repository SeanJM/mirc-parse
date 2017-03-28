Predicate.prototype.isCallExpression = function () {
   if (this.context === 'functionStatement') {
    return true;
  }
};