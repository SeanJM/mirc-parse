Expression.prototype.literalExpression = function () {
  var value = this.string.substring(this.start, this.end);
  var isNumber = /^[0-9]+(\.[0-9]+|)$/.test(value);

  return {
    type : 'literal',
    value : value,
    raw : isNumber ? value : '\'' + value + '\'',
    start : this.start,
    end : this.end
  };
};