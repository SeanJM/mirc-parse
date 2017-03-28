/*
  - (A) && (B)
  - (A) || (B)
  - (A) || (B)
*/
Predicate.prototype.isLogicalExpression = function () {
  var parts = parseArray({
    start : this.start,
    end : this.end,
    string : this.string,
    delimiter : ' '
  });

  return (
    parts.value.length > 2
    && LOGICAL_OPERATORS.includes(parts.value[1].slice)
  );
};