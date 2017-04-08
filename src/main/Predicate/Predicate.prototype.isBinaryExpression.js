/*
  - (A) === (B)
  - (A) != (B)
  - (A) iswm (B)
*/
Predicate.prototype.isBinaryExpression = function () {
  var parts = parseArray({
    start : this.start,
    end : this.end,
    string : this.string,
    delimiter : ' '
  });

  var operator = parts.value.filter(function (a) {
    return BINARY_OPERATORS.indexOf(a.slice) > -1;
  });

  return (
    parts.value.length > 2
    && operator.length > 0
  );
};