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

  console.log(parts.value.length, parts.value[1].slice);

  return (
    parts.value.length > 2
    && BINARY_OPERATORS.includes(parts.value[1].slice)
  );
};