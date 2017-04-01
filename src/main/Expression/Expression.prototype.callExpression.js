(function () {
  function callExpression(props) {
    var i = this.start;
    var n = this.end;
    var step = 0;
    var string = this.string;
    var exp;

    props.callee = this.identifierExpression();
    i = props.callee.end;

    while (/\s/.test(string[i])) i += 1;

    if (/(-|\+)[a-zA-Z0-9]+\b/.test(string.substring(i, n))) {
      props.switches = Expression.prototype.switches.call({
        start : i,
        end : n,
        string : string
      });

      i = props.switches.end;
      while (/\s/.test(string[i])) i += 1;
    }

    while (i < n) {
      exp = new Expression({
        string : string,
        start : i,
        end : n
      });

      if (exp.type) {
        props.arguments.push(exp);
      } else {
        throw new Error({
          type : 'INVALID_ARGUMENTS',
          start : i,
          end : n
        });
      }

      if (exp.end === step) {
        throw new Error({
          type : 'BAD_EXPRESSION',
          start : i,
          end : n
        });
      }

      step = i;
      i = exp.end;
      while (/\s/.test(string[i])) i += 1;
    }

    props.end = props.arguments.length
      ? props.arguments.slice(-1)[0].end
      : i;

    this.end = props.end;
  }

  function getArgumentsI(props) {
    var i = props.start;
    var n = props.end;
    var s = props.string;

    var b = between('(', ')', s.substring(i, n));

    var array = b && parseArray({
      start : i + b.start + 1,
      end : i + b.end,
      string : s,
      delimiter : ','
    });

    if (!b) {
      throw new Error({
        error : 'INVALID_ARGUMENTS',
        reason : 'UNMATCHED_PARENTHESIS',
        start : props.start
      });
    }

    array.value = array.value.map(function (a) {
      return new Expression(a);
    });

    return array;
  }

  function callExpressionI(props) {
    var i = this.start;
    var n = this.end;
    var s = this.string;

    props.start = i,
    props.callee = this.identifierExpression({
      start : i,
      end : n,
      string : s
    });

    i = props.callee.end;
    while (/\s/.test(s[i])) i += 1;

    // Check to see if identifier has arguments
    if (s[i] === '(') {
      props.arguments = getArgumentsI({
        start : i,
        end : n,
        string : s
      });
    }

    props.end = props.arguments.end || i;
    return props;
  }

  Expression.prototype.callExpression = function () {
    var props = {
      type : 'callExpression',
      callee : false,
      arguments : [],
      switch : [],
      property : false,
      optional : false,
      required : false,
      start : 0,
      end : 0
    };

    var i = this.start;

    if (this.string[i] === '$') {
      callExpressionI.call(this, props);
    } else {
      callExpression.call(this, props);
    }

    return props;
  };
}());
