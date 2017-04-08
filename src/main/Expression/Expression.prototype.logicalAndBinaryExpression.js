(function () {
  function getExpression(leftOrRight) {
    var b;

    if (leftOrRight.string[leftOrRight.start] === '(') {
      b = between('(', ')', leftOrRight.string, leftOrRight.start);
      leftOrRight.start = b.start;
      leftOrRight.end = b.end;
    }

    return new Expression(leftOrRight);
  }

  Expression.prototype.logicalAndBinaryExpression = function (OPERATORS, type) {
    var parts = parseArray({
      start : this.start,
      end : this.end,
      string : this.string,
      delimiter : ' '
    });

    var operatorIndex = -1;

    var left = {
      start : parts.start,
      end : -1,
      string : this.string
    };

    var right = {
      start : -1,
      end : this.end,
      string : this.string
    };

    var operator = false;

    for (var i = 0, n = parts.value.length; i < n; i++) {
      if (operatorIndex < 0 && OPERATORS.indexOf(parts.value[i].slice) > -1) {
        operatorIndex = i;
        operator = parts.value[i].slice;
      } else if (operatorIndex < 0) {
        left.end = parts.value[i].end;
      } else {
        right.start = parts.value[i].start;
        i = n;
      }
    }

    return {
      type : type,
      operator : operator,
      left : getExpression(left),
      right : getExpression(right),
      start : left.start,
      end : right.end
    };
  };
}());