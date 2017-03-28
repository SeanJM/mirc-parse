TypeParser.prototype.identifierArguments = function (opt) {
  var s = opt.string;
  var capture = between('(', ')', s.substring(opt.start, opt.end));

  var i = capture.start + 1;
  var n = capture.end + 1;
  var anchor = i;

  var props = [];

  while (i < n) {
    if (s[i] === '[') {
      i += (
        between('[', ']', s.substring(i, n))
        || { end : 1 }
      ).end;
    } else if (s[i] === '(') {
      i += (
        between('(', ')', s.substring(i, n))
        || { end : 1 }
      ).end;
    }

    if (s[i] === ',' || i === n - 1) {
      props.push(new ParseMirc({
        string : s,
        start : anchor,
        end : i
      }).parse());

      anchor = i + 1;
    }

    i += 1;
  }

  console.log(props);

  return props;
};