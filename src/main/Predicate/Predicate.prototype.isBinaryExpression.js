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

  return (
    parts.value.length === 3
    && COMPARISON_OPERATORS.includes(parts.value[1].slice)
  );
};