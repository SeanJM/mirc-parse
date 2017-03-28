/*
  a operator b
*/
TypeParser.prototype.isBinaryExpression = function () {
  let i = this.start;
  let n = this.end;
  let s = this.string;

  let props = {
    left : {
      start : 0,
      end : 0
    },
    operator : {
      start : 0,
      end : 0
    },
    right : {
      start : 0,
      end : 0
    }
  };

  let key = 'left';
  let anchor = i;

  while (/\s/.test(s[i])) {
    i += 1;
  }

  while (i < n) {
    if (['==', '!=', '<=', '>='].includes(s.substring(i, i + 2))) {
      props.operator.start = i;
      props.operator.end = i + 2;
      i += 2;
      key = 'right';
    } else if ('<' === s[i] || '>' === s[i]) {
      props.operator.start = i;
      props.operator.end = i + 1;
      i += 1;
      key = 'right';
    }

    // $identifier(arguments) or $identifier(arguments).property
    if (s[i] === '$') {
      while (/[\$a-zA-Z0-9_\-]/.test(s[i])) i += 1;

      if (s[i] === '(') {
        i += (
          between('(', ')', s.substring(anchor, n))
          || { end : 1 }
        ).end;
      }

      while (/\s/.test(s[i])) i += 1;

      if (s[i] === '.') {
        while (/[a-zA-Z0-9_]/.test(s[i])) i += 1;
      }
    } else if (s[i] === '[') {
      i += (
        between('[', ']', s.substring(anchor, n))
        || { end : 1 }
      ).end;
    }

    i += 1;
    props[key].end = i;
  }
};