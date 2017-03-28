Expression.prototype.binaryExpression = function () {
  var parts = parseArray({
    start : this.start,
    end : this.end,
    string : this.string,
    delimiter : ' '
  });

  return {
    type : 'binaryExpression',
    operator : parts.value[1].slice,
    left : new Expression(parts.value[0]),
    right : new Expression(parts.value[2]),
  };
};