(function () {
function between(a, b, string, index) {
  var o = 0;
  var i = index || 0;
  var n = string.length;
  var start;
  var alen = a.length;
  var blen = b.length;

  while (string[i] !== a && string[i]) {
    i++;
  }

  start = i;

  for (; i < n; i++) {
    if (string.substring(i, i + alen) === a) {
      o += 1;
    } else if (string.substring(i, i + blen) === b) {
      o -= 1;
    }

    if (o === 0) {
      return {
        start : start + 1,
        end : i,
        length : i - start,
        value : string.substring(start + 1, i)
      };
    }
  }

  return false;
}

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

    if (CONTROL_CODE[s[i]] === 'color') {
      while (i < n && !/\s/.test(s[i])) i += 1;
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

  if (anchor < i) {
    array.push({
      start : anchor,
      end : i,
      string : s,
      slice : s.substring(anchor, i),
      context : 'array'
    });

    return {
      start : array[0].start,
      end : array.slice(-1)[0].end + 1,
      value : array
    };
  } else {
    return {
      start : anchor,
      end : i + 1,
      value : array
    };
  }
}
var EXP_ALIAS = /[a-zA-Z0-9_\-]+/;
var EXP_VAR = /%[a-zA-Z0-9_\-\:\.\_]+/;
var EXP_CHANNEL = /#[a-zA-Z0-9_\-\_]+/;

var EXP_IDENTIFIER = new RegExp(
  '^(' + EXP_VAR.source + '|' + EXP_CHANNEL.source + ')'
);

var COMPARISON_OPERATORS = [
  '==',         // equal to
  '===',        // equal to (case-sensitive)
  '!=',         // not equal to
  '<',          // less than
  '>',          // larger than
  '>=',         // larger than or equal to
  '<=',         // smaller than or equal to
  '//',         // v2 is a multiple of v1
  '\\\\',       // v2 is not a multiple of v1
  '&',          // bitwise comparison

  'isin',       // string v1 is in string v2
  'isincs',     // string v1 is in string v2 (case sensitive)
  'iswm',       // wildcard string v1 matches string v2
  'iswmcs',     // wildcard string v1 matches string v2 (case sensitive)
  'isnum',      // number v1 is a number in the range v2 which is in the form n1-n2 (v2 optional)
  'isletter',   // letter v1 is a letter in the list of letters in v2 (v2 optional)
  'isalnum',    // text contains only letters and numbers
  'isalpha',    // text contains only letters
  'islower',    // text contains only lower case letters
  'isupper',    // text contains only upper case letters

  'ison',       // nickname v1 is on channel v2
  'isop',       // nickname v1 is an op on channel v2
  'ishop',      // nickname v1 is a halfop on channel v2
  'isvoice',    // nickname v1 has a voice on channel v2
  'isreg',      // nickname v1 is a normal nick on channel v2
  'ischan',     // if v1 is a channel which you are on.
  'isban',      // if v1 is a banned address in internal ban list on channel v2
  'isinvite',   // if v1 is on the invite list of channel v2
  'isexcept',   // if v1 is on the except list of channel v2

  'isaop',      // if v1 is a user in your auto-op list for channel v2 (v2 optional)
  'isavoice',   // if v1 is a user in your auto-voice list for channel v2 (v2 optional)
  'isignore',   // if v1 is a user in your ignore list with the ignore switch v2 (v2 optional)
  'isprotect',  // if v1 is a user in your protect list for channel v2 (v2 optional)
  'isnotify',    // if v1 is a user in your notify list.

  // Negate
  '!==',

  '!isin',
  '!isincs',
  '!iswm',
  '!iswmcs',
  '!isnum',
  '!isletter',
  '!isalnum',
  '!isalpha',
  '!islower',
  '!isupper',

  '!ison',
  '!isop',
  '!ishop',
  '!isvoice',
  '!isreg',
  '!ischan',
  '!isban',
  '!isinvite',
  '!isexcept',

  '!isaop',
  '!isavoice',
  '!isignore',
  '!isprotect',
  '!isnotify'
];

var LOGICAL_OPERATORS = [
  '&&',
  '||'
];

var BINARY_OPERATORS = COMPARISON_OPERATORS.concat(['$+']);

var CONTROL_CODE = {};
CONTROL_CODE[String.fromCharCode(3)] = 'color';
CONTROL_CODE[String.fromCharCode(2)] = 'bold';
CONTROL_CODE[String.fromCharCode(29)] = 'italics';
CONTROL_CODE[String.fromCharCode(31)] = 'underline';
CONTROL_CODE[String.fromCharCode(16)] = 'swap';
CONTROL_CODE[String.fromCharCode(15)] = 'clear';
/*
  opt : {
    start : Number,
    end : Number,
    string : String
  }
*/

function Expression(opt) {
  let p = new Predicate(opt);

  Object.assign(this, opt);
  this.type = false;

  if (p.isAssignmentExpression()) {
    return this.assignmentExpression();
  } else if (p.isCallExpression()) {
    return this.callExpression();
  } else if (p.isLogicalExpression()) {
    return this.logicalExpression();
  } else if (p.isBinaryExpression()) {
    return this.binaryExpression();
  } else if (p.isIdentifierExpression()) {
    return this.identifierExpression();
  } else if (p.isLiteralExpression()) {
    return this.literalExpression();
  }
}
Expression.prototype.assignmentExpression = function () {
  var parts = parseArray({
    start : this.start,
    end : this.end,
    string : this.string,
    delimiter : ' '
  });

  return {
    type : 'assignmentExpression',
    operator : parts.value[1].slice,
    left : new Expression(parts.value[0]),
    right : new Expression(parts.value[2]),
  };
};
Expression.prototype.binaryExpression = function () {
  return this.logicalAndBinaryExpression(BINARY_OPERATORS, 'binaryExpression');
};
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
        if (!props.arguments) {
          props.arguments = [];
        }
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
      start : i + b.start,
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
    var i = this.start;

    var props = {
      type : 'callExpression',
      callee : false,
      arguments : false,
      switches : false,
      property : false,
      optional : false,
      required : false,
      start : i,
      end : -1
    };


    if (this.string[i] === '$') {
      callExpressionI.call(this, props);
    } else {
      callExpression.call(this, props);
    }

    return props;
  };
}());

Expression.prototype.identifierExpression = function () {
  var s = this.string;
  var i = this.start;
  var n = this.end;

  var props = {
    type : 'identifier',
    start : i,
    name : ''
  };

  var isMircIdentifier = s[i] === '$';
  var regExp = isMircIdentifier
    ? /\(|\s|\|/
    : /\s/;

  while (i < n && !regExp.test(s[i])) {
    props.name += s[i];
    i += 1;
  }

  props.end = i;
  return props;
};
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

  i -= 1;

  while (/\s/.test(string[i - 1])) i -= 1;

  value = string.substring(this.start, i);

  isNumber = /^[0-9]+(\.[0-9]+|)$/.test(value);

  return {
    type : 'literal',
    value : value,
    raw : isNumber ? value : '\'' + value + '\'',
    start : this.start,
    end : i
  };
};
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
Expression.prototype.logicalExpression = function () {
  return this.logicalAndBinaryExpression(LOGICAL_OPERATORS, 'logicalExpression');
};
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
function ParseMirc(propsOrString) {
  this.body = [];
  this.newLine = true;
  this.type = 'mirc';

  if (typeof propsOrString === 'string') {
    this.string = propsOrString;
    this.start = 0;
    this.end = propsOrString.length;
  } else {
    this.type = propsOrString.type || 'mirc';
    this.string = propsOrString.string;
    this.start = propsOrString.start || 0;
    this.end = propsOrString.end || propsOrString.string.length;
  }
}
ParseMirc.prototype.parse = function () {
  var s = this.string;
  var i = this.start;
  var n = this.end;
  var statement;

  for (; i < n; i++) {
    if (s[i] === '\n') {
      this.isNewLine = true;
    } else if (this.isNewLine && !/\s/.test(s[i])) {
      this.isNewLine = false;
    }

    while (/\s/.test(s[i])) i += 1;

    statement = new Statement({
      string : this.string,
      start : i,
      end : this.end
    });

    if (statement.type) {
      i += statement.end;
      this.body.push(statement);
    }
  }

  return {
    type : this.type,
    start : this.start,
    end : this.end,
    body : this.body
  };
};
ParseMirc.prototype.slice = function () {
  return this.string.substring(this.start, this.end);
};

ParseMirc.prototype.trimStart = function (i) {
  var s = this.string;
  while (s[i] && /\s/.test(s[i])) {
    i += 1;
  }
  return i;
};

function Predicate(opt) {
  Object.assign(this, opt);
}
Predicate.prototype.isAssignmentExpression = function () {
  var slice = this.string.substring(this.start, this.end);
  var exp = new RegExp(EXP_VAR.source + '(\\s+|)=[^=]');
  return exp.test(slice);
};
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

  var operator = parts.value.filter(function (a) {
    return BINARY_OPERATORS.indexOf(a.slice) > -1;
  });

  return (
    parts.value.length > 2
    && operator.length > 0
  );
};
Predicate.prototype.isCallExpression = function () {
  let slice = this.string.substring(this.start, this.end);

  let isIdentifier = (
    (slice[0] === '$' || /^\$+\(/.test(slice))
    && !/^\$\+$/.test(slice)
  );

   if (isIdentifier || this.context === 'functionStatement') {
    return true;
  }
};
Predicate.prototype.isIdentifierExpression = function () {
  var slice = this.string.substring(this.start, this.end);
  return EXP_IDENTIFIER.test(slice);
};

Predicate.prototype.isLiteralExpression = function () {
  var slice = this.string.substring(this.start, this.end);
  return !/^(%|\$|\|)/.test(slice);
};
/*
  - (A) && (B)
  - (A) || (B)
  - (A) || (B)
*/
Predicate.prototype.isLogicalExpression = function () {
  var parts = parseArray({
    start : this.start,
    end : this.end,
    string : this.string,
    delimiter : ' '
  });

  var operator = parts.value.filter(function (a) {
    return LOGICAL_OPERATORS.indexOf(a.slice) > -1;
  });

  return (
    parts.value.length > 2
    && operator.length > 0
  );
};
Predicate.prototype.isPipeStatement = function () {
  var slice = this.string.substring(this.start, this.end);

  var index = Math.min.apply(null, [
    slice.indexOf('\r\n'),
    slice.indexOf('\n'),
    slice.length
  ].filter(function (a) {
    return a > -1;
  }));

  return /\s\|\s/.test(slice.substring(0, index));
};
function Statement(opt) {
  let slice = opt.string.substring(opt.start, opt.end).trim();
  let p = new Predicate(opt);
  Object.assign(this, opt);

  if (/^(\/|)var\b/.test(slice)) {
    return this.variableDeclaration();
  } else if (/^%[a-zA-Z\-\_0-9]+(\s+)=/.test(slice)) {
    return this.assignmentStatement();
  } else if (/^(\/|)alias\b/.test(slice)) {
    return this.functionDeclaration();
  } else if (/^(\/|)return\b/.test(slice)) {
    return this.returnStatement();
  } else if (/^(\/|)halt\b/.test(slice)) {
    return this.haltStatement();
  } else if (/^if\b/.test(slice)) {
    return this.ifStatement();
  } else if (p.isPipeStatement()) {
    return this.pipe();
  } else if (slice[0] === '{') {
    return this.block();
  } else if (/^(\/|)[a-zA-Z0-9\-\_]+/.test(slice)) {
    return this.functionStatement();
  } else if (/^\$[a-zA-Z0-9\-\_]+/.test(slice)) {
    return this.functionStatement();
  } else if (/^\%[\:\.a-zA-Z0-9\-\_]+/.test(slice)) {
    return this.functionStatement();
  }
}
Statement.prototype.assignmentStatement = function () {
  let type = 'assignmentStatement';
  return {
    type : type,
    start : this.start,
    end : this.end,
    expression : new Expression({
      context : type,
      start : this.start,
      end : this.end,
      string : this.string
    })
  };
};
Statement.prototype.block = function () {
  // Is a block
  var s = this.string;
  var i = this.start;
  var capture;

  while (/\s/.test(s[i])) i += 1;

  if (s[i] === '{') {
    capture = between('{', '}', s.substring(i, s.length));
    // offset the difference
    this.start = i + capture.start;
    this.end = capture.end + i;
  } else {
    this.start = i;
    this.end = s.indexOf('\n', i);
  }

  return new ParseMirc({
    type : 'blockStatement',
    start : this.start,
    end : this.end,
    string : s
  }).parse();
};
/*
  string : String,
  index : Number
*/
Statement.prototype.functionDeclaration = function () {
  var i = this.start;
  var string = this.string;

  var props = {
    type : 'functionDeclaration',
    start : i,
    end : 0,
    switches : false,
    id : {
      name : '',
    },
  };

  i += 5;

  while (/\s/.test(string[i])) i += 1;

  if (string[i] === '-') {
    props.switches = Expression.prototype.switches.call({
      start : i,
      end : this.end,
      string : string
    });
    i = props.switches.end;
    while (/\s/.test(string[i])) i += 1;
  }

  // Capture name
  props.id.start = i;
  while (string[i] && !/\s|\{/.test(string[i])) {
    props.id.name += string[i];
    i += 1;
  }

  props.id.end = i;
  while (/\s/.test(string[i])) i += 1;
  this.start = i;

  props.body = new Statement({
    string : string,
    start : i,
    end : this.end
  });

  props.end = props.body.end;

  return props;
};
/*
  var %calc = $calc($$1 / $$2)
  > calc = arguments[0] && arguments[1]
      ? $calc(arguments[0] / arguments[1])
      : undefined
*/
Statement.prototype.functionStatement = function () {
  let type = 'functionStatement';
  return {
    type : type,
    start : this.start,
    end : this.end,
    expression : new Expression({
      context : type,
      start : this.start,
      end : this.end,
      string : this.string
    })
  };
};

Statement.prototype.haltStatement = function () {
  return {
    type : 'haltStatement',
    start : 0,
    end : 0,
    value : []
  };
};
(function () {
  function parseTestParens() {
    var b = between('(', ')', this.string.substring(this.start, this.end));
    return new Expression({
      start : this.start + b.start,
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
      props.test = parseTestParens.call({
        start : i,
        end : n,
        string : s
      });

      i = props.test.end + 2;
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
Statement.prototype.pipe = function () {
  var i = this.start;
  var string = this.string;

  var n = Math.min.apply(null, [
    string.indexOf('\r\n', i),
    string.indexOf('\n', i),
    this.end
  ].filter(function (a) {
    return a > -1;
  }));

  var props = {
    type : 'pipeStatement',
    start : i,
    end : 0,
    body : undefined,
  };

  var members = parseArray({
    start : i,
    end : n,
    string : string,
    delimiter : '\\|'
  });

  props.body = members.value.map(function (member) {
    return new Statement(member);
  });

  props.end = members.end;

  return props;
};
Statement.prototype.returnStatement = function () {
  return {
    type : 'returnStatement',
    start : 0,
    end : 0,
    value : []
  };
};
Statement.prototype.variableDeclaration = function () {
  var declarations = parseArray({
    start : this.start + 3,
    end : this.end,
    string : this.string,
    delimiter : ','
  });

  var self = this;

  return {
    type : 'variableDeclaration',
    start : this.start,
    end : this.end,
    declarations : declarations.value.map(function (a) {
      return new Expression({
        start : a.start,
        end : a.end,
        string : self.string
      });
    })
  };
};
if (typeof module === 'object') {
  module.exports = ParseMirc;
} else if (typeof window === 'object') {
  window.ParseMirc = ParseMirc;
}
}());
//# sourceMappingURL=mirc-parse.js.map