Predicate.prototype.isCallExpression = function () {
  let slice = this.string.substring(this.start, this.end);

  let isIdentifier = (
    (slice[0] === '$' || /^\$+\(/.test(slice))
    && !/^\$\+$/.test(slice)
  );

   if (isIdentifier || this.context === 'functionStatement') {
    return true;
  }
};