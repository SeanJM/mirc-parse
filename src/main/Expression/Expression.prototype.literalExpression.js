Expression.prototype.literalExpression = function () {
  var i = this.start;
  var n = this.end;
  var string = this.string;

  var value;
  var isNumber;
  var capture = i < n;

  while (capture) {
    if (CONTROL_CODE[string[i]]) {
      while (i < n && !/\s/.test(string[i])) i += 1;
    }

    if (/^\s(%|\$|\|)/.test(string.substring(i, i + 3))) {
      capture = false;
    } else {
      capture = i < n;
    }

    i += 1;
  }

  value = string
    .substring(this.start, i)
    .replace(/\r\n|\n/g, '')
    .trimRight();

  isNumber = /^[0-9]+(\.[0-9]+|)$/.test(value);

  return {
    type : 'literal',
    value : value,
    raw : isNumber ? value : '\'' + value + '\'',
    start : this.start,
    end : i
  };
};