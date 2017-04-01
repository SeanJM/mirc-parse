Expression.prototype.switches = function () {
  var value = [];
  var match = [];

  var i = this.start;
  var string = this.string;

  var n = Math.min.apply(null,
    [
      string.indexOf(' ', i),
      string.indexOf('\r\n', i),
      string.indexOf('\n', i),
      this.end
    ].filter(function (a) {
      return a !== -1;
    })
  );

  var prefix;
  var slice;

  while (i < n) {
    if (string[i] === '-' || string[i] === '+') {
      prefix = string[i];
    } else {
      slice = string.substring(i, n);

      match[0] = slice.match(/^([a-zA-Z\@])([0-9]+)/);
      match[1] = slice.match(/^[a-zA-Z\@]/);
      match[2] = slice.match(/^[0-9]+/);

      if (match[0]) {
        value.push({
          start : i,
          end : i + match[0][0].length,
          prefix : prefix,
          switch : match[0][1],
          number : Number(match[0][2]),
        });
        i += match[0][0].length - 1;
      } else if (match[1]) {
        value.push({
          start : i,
          end : i + match[1][0].length,
          prefix : prefix,
          switch : match[1][0],
          number : false,
        });
      } else if (match[2]) {
        value.push({
          start : i,
          end : i + match[2][0].length,
          prefix : prefix,
          switch : false,
          number : match[2][0],
        });
        i += match[2][0].length - 1;
      }
    }

    i += 1;
  }

  return {
    start : this.start,
    end : i,
    value : value
  };
};