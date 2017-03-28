(function () {
  function parseTestParens() {
    var b = between('(', ')', this.string.substring(this.start, this.end));
    return new Expression({
      start : this.start + b.start + 1,
      end : this.start + b.end,
      string : this.string
    });
  }

  Statement.prototype.ifStatement = function () {
    var s = this.string;
    var i = this.start;
    var n = this.end;

    var type = 'ifStatement';

    var props = {
      type : type,
      start : i,
      end : 0,
      test : false,
      consequent : false,
      alternate : false
    };

    i += 2;
    if (/^(\s+|)\(/.test(s.substring(i, n))) {
      props.test = parseTestParens.call(this);
      i = props.test.end + 1;
    } else {
      while (i < n && /\s/.test(s[i])) i += 1;
      props.test = new Expression({
        start : i,
        end : n,
        string : s
      });
      i = props.test.end;
    }

    while (i < n && /\s/.test(s[i])) i += 1;

    props.consequent = new Statement({
      string : s,
      start : i,
      end : n
    });
    props.end = props.consequent.end;

    // Capture name
    return props;
  };
}());