Expression.prototype.literalExpression = function () {
  var i = this.start;
  var n = this.end;
  var string = this.string;

  var value;
  var isNumber;

  while (i < n && !/^\s(%|\$)/.test(string.substring(i, i + 3))) {
    i += 1;
  }

  value = string
    .substring(this.start, i)
    .replace(/\r\n|\n/g, '');

  isNumber = /^[0-9]+(\.[0-9]+|)$/.test(value);

  return {
    type : 'literal',
    value : value,
    raw : isNumber ? value : '\'' + value + '\'',
    start : this.start,
    end : i
  };
};