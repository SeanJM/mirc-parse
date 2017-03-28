function parseArray(props) {
  var i = props.start;
  var s = props.string;
  var n = props.end;

  var anchor = i;
  var array = [];
  var delimiter_exp = new RegExp(props.delimiter);
  var temp;

  if (!props.delimiter) {
    throw new Error('Delimiter required');
  }

  while (s[i] && /\s/.test(s[i])) i += 1;
  anchor = i;
  while (i < n && (s[i] !== '\r' || s[i] !== '\n' || s[i] !== '|')) {
    if (s[i] === '(') {
      temp = between('(', ')', s.substring(i, n));
      if (temp) {
        i += temp.end;
      } else {
        throw new Error('Open bracket "(", does not have matching closing bracket.');
      }
    }

    if (s[i] === '[') {
      temp = between('[', ']', s.substring(i, n));
      if (temp) {
        i += temp.end;
      } else {
        throw new Error('Open bracket "[", does not have matching closing bracket.');
      }
    }

    if (delimiter_exp.test(s[i])) {
      array.push({
        start : anchor,
        end : i,
        string : s,
        slice : s.substring(anchor, i),
        context : 'array'
      });

      i += 1;
      while (s[i] && /\s/.test(s[i])) i += 1;
      anchor = i;
    }
    i += 1;
  }

  while (/\s/.test(s[i - 1])) i -= 1; // Trim end

  if (array.length) {
    array.push({
      start : anchor,
      end : i,
      string : s,
      slice : s.substring(anchor, i),
      context : 'array'
    });

    return {
      start : array[0].start,
      end : array.slice(-1)[0].end,
      value : array
    };
  } else {
    return {
      start : anchor,
      end : i,
      value : array
    };
  }
}