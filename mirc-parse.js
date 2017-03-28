(function () {
function between(a, b, string) {
  var o = 0;
  var i = 0;
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
        start : start,
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
var EXP_ALIAS = /[a-zA-Z0-9_\-]+/;
var EXP_VAR = /%[a-zA-Z0-9_\-\:\.\_]+/;

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
function Expression(opt) {
  let p = new Predicate(opt);
  Object.assign(this, opt);

  if (p.isAssignmentExpression()) {
    return this.assignmentExpression();
  } else if (p.isLogicalExpression()) {

  } else if (p.isBinaryExpression()) {
    return this.binaryExpression();
  } else if (p.isCallExpression()) {
    return this.callExpression();
  } else if (p.isIdentifierExpression()) {
    return this.identifierExpression();
  } else if (p.isLiteralExpression()) {
    return this.literalExpression();
  }
}
Token.prototype.assignmentExpression = function () {

};
Expression.prototype.binaryExpression = function () {
  var parts = parseArray({
    start : this.start,
    end : this.end,
    string : this.string,
    delimiter : ' '
  });

  return {
    type : 'binaryExpression',
    operator : parts.value[1].slice,
    left : new Expression(parts.value[0]),
    right : new Expression(parts.value[2]),
  };
};
(function () {
  function callExpression(props) {
    var i = this.start;
    var array;

    props.callee = this.identifierExpression({
      start : i,
      end : this.end,
      string : this.string
    });

    i = props.callee.end;

    array = parseArray({
      start : i,
      end : this.end,
      string : this.string,
      delimiter : ' '
    });

    props.end = array.end;
    props.arguments = array.value.map(function (a) {
      return new Expression(a);
    });

    return props;
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
      arguments : false,
      property : false,
      optional : false,
      required : false,
      start : 0,
      end : 0
    };

    var i = this.start;

    if (this.string[i] === '$') {
      return callExpressionI.call(this, props);
    }

    return callExpression.call(this, props);
  };
}());

Expression.prototype.identifierExpression = function () {
  let s = this.string;
  let i = this.start;

  let props = {
    type : 'identifier',
    start : i,
    name : ''
  };

  let isMircIdentifier = s[i] === '$';
  let regExp = isMircIdentifier
    ? /\(|\s|\|/
    : /\s/;

  while (s[i] && !regExp.test(s[i])) {
    props.name += s[i];
    i += 1;
  }

  props.end = i;
  return props;
};
Expression.prototype.literal = function (opt) {
};
Expression.prototype.literalExpression = function () {
  var value = this.string.substring(this.start, this.end);
  var isNumber = /^[0-9]+(\.[0-9]+|)$/.test(value);

  return {
    type : 'literal',
    value : value,
    raw : isNumber ? value : '\'' + value + '\'',
    start : this.start,
    end : this.end
  };
};
Token.prototype.logicalExpression = function () {

};
Token.prototype.unaryExpression = function () {

};
function Parser(opt) {
  console.log(opt);
  Object.assign(this, opt);
}
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
(function () {
  function getType(content) {
    /*
      Identifier
      - Identifier
    */

    /*
      UnaryExpression
      - !identifier
    */

    /*
      BinaryExpression
      - Identifier/Literal operator Identifier/Literal
    */

    /*
      LogicalExpression
      - Expression operator Expression
    */
  }

  ParseMirc.prototype.parseConditional = function () {
    var capture = between('(', ')', this.string.substring(this.start, this.end));
    var s = this.string;
    var i = capture.start + 1;
    var n = capture.end + 1;

    this.start = i;
    this.end = n;
    this.type = 'binaryExpression';

    this.left = false;
    this.right = false;
    this.operator = false;

    i = this.trimStart(i);

    this.left = new ParseMirc({
      start : i,
      end : n,
      string : s
    }).parseToken();

    i = this.trimStart(this.left.end);

    if (['!', '=', '>', '<'].includes(s[i])) {
      this.operator = new ParseMirc({
        start : i,
        end : n,
        string : s
      }).parseToken();
    }

    return {
      type : this.type,
      start : this.start,
      end : this.end,
      left : this.left,
      operator : this.operator,
      right : this.right,
    };
  };
}());

ParseMirc.prototype.parseToken = function () {
  // Is a block
  var s = this.string;
  var i = this.start;
  var n = this.end;

  var newToken = true;
  var loop = true;

  while (i < n && loop) {
    if (i > this.start && newToken && (s[i] === '%' || s[i] === '$' || s[i] === '\r' || s[i] === '\n')) {
      loop = false;
    } else if (/\s/.test(s[i])) {
      newToken = true;
    } else {
      newToken = false;
    }
    i++;
  }

  i -= 1;
  while (s[i] === '\n') {
    i -= 1;
  }
  this.end = i;

  return new Token({
    start : this.start,
    end : this.end,
    string : this.string
  }).parse();
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
  return new RegExp(EXP_VAR + '(\s+|)=').test(slice);
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

  return (
    parts.value.length === 3
    && COMPARISON_OPERATORS.includes(parts.value[1].slice)
  );
};
Predicate.prototype.isCallExpression = function () {
   if (this.context === 'functionStatement') {
    return true;
  }
};
Predicate.prototype.isIdentifierExpression = function () {
  var slice = this.string.substring(this.start, this.end);
  return EXP_VAR.test(slice);
};
/*
  - (A) && (B)
  - (A) || (B)
  - (A) || (B)
*/
Predicate.prototype.isLiteralExpression = function () {
  var slice = this.string.substring(this.start, this.end);
  return !/^(%|\$)/.test(slice);
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

  return (
    parts.value.length > 2
    && LOGICAL_OPERATORS.includes(parts.value[1].slice)
  );
};
/*
  string : String,
  index : Number
*/
function TypeParser(props) {
  let i = props.start;
  let s = props.string;
  let n = props.end;
  let sl = props.string.substring(i, n);

  this.start = props.start;
  this.end = props.end;
  this.string = props.string;
  this.slice = sl;

  this.type = false;

  if (/^if(\s+|)\(|^if\s+/.test(sl)) {
    this.type = 'ifStatement';
  } else if (s.substring(i, 3) === 'var') {
    this.type = 'variableDeclaration';
  } else if (s.substring(i, 5) === 'alias') {
    this.type = 'aliasDeclaration';
  } else if (s.substring(i, 6) === 'return') {
    this.type = 'returnStatement';
  } else if (/^%[\:\.a-zA-Z0-9]+(\s+|)=/.test(sl)) {
    this.type = 'variableAssignment';
  } else if (/^%[\:\.a-zA-Z0-9]+/.test(sl) && props.isNewLine) {
    this.type = 'expressionStatement';
  } else if (/^(\/|)[a-zA-Z0-9]+/.test(sl) && props.isNewLine) {
    this.type = 'expressionStatement';
  } else if (/^\$[A-Za-z0-9\_]+/.test(sl)) {
    this.type = 'expressionStatement';
  }
}
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
/*
  string : String,
  index : Number
*/
TypeParser.prototype.parse = function (props) {
  console.log(this.type);
  return this[this.type](props);
};
function Statement(opt) {
  let slice = opt.string.substring(opt.start, opt.end).trim();
  Object.assign(this, opt);

  if (/^(\/|)var\b/.test(slice)) {
    return this['variableDeclaration']();
  } else if (/^%[a-zA-Z\-\_0-9]+(\s+)=/.test(slice)) {
    return this['assignmentStatement']();
  } else if (/^(\/|)alias\b/.test(slice)) {
    return this['functionDeclaration']();
  } else if (/^(\/|)[a-zA-Z0-9\-\_]+/.test(slice)) {
    return this['functionStatement']();
  } else if (/^\$[a-zA-Z0-9\-\_]+/.test(slice)) {
    return this['functionStatement']();
  } else if (/^\%[\:\.a-zA-Z0-9\-\_]+/.test(slice)) {
    return this['functionStatement']();
  } else if (/^(\/|)return\b/.test(slice)) {
    return this['returnStatement']();
  } else if (/^(\/|)halt\b/.test(slice)) {
    return this['haltStatement']();
  } else if (/^if\b/.test(slice)) {
    return this['ifStatement']();
  }
}
Statement.prototype.assignmentStatement = function () {
  return {
    type : 'assignmentStatement',
    start : this.body.start,
    end : this.body.end,
    declarations : []
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
    this.start = i + capture.start + 1;
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
  var s = this.string;

  var props = {
    type : 'functionDeclaration',
    start : i,
    end : 0,
    id : {
      name : '',
    },
  };

  i += 5;

  while (/\s/.test(s[i])) {
    i += 1;
  }

  // Capture name
  props.id.start = i;
  while (s[i] && !/\s|\{/.test(s[i])) {
    props.id.name += s[i];
    i += 1;
  }

  props.id.end = i;
  while (/\s/.test(s[i])) i += 1;
  this.start = i;
  props.body = this.block();
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
Statement.prototype.ifStatement = function (opt) {
  var s = opt.string;
  var i = opt.start;

  var props = {
    type : 'ifStatement',
    start : i,
    end : 0,
    test : {},
    consequent : false,
    alternate : false
  };

  if (/^if(\s+|)\(/.test(s)) {
    props.test = new ParseMirc({
      string : s,
      start : i
    }).parseConditional();
  }

  i = props.test.end;
  props.consequent = new ParseMirc({
    string : s,
    start : i
  }).parseBlock();
  props.end = props.consequent.end;

  // Capture name
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
  return {
    type : 'variableDeclaration',
    start : this.body.start,
    end : this.body.end,
    declarations : []
  };
};
function Token(opt) {
  this.start = opt.start;
  this.end = opt.end;
  this.string = opt.string;

  this.token = this.string.substring(this.start, this.end);
  this.getType();
}
Token.prototype.getType = function () {
  if (/\$(\$|)[a-zA-Z]/.test(this.token)) {
    this.type = 'expressionStatement';
  } else if (/%[a-zA-Z:_\-0-9]/.test(this.token)) {
    this.type = 'identifier';
  } else {
    this.type = 'stringLiteral';
  }
};
Token.prototype.identifier = function () {
  let i = this.start;
  let n = this.end;
  let s = this.string;

  let props = {
    start : this.start,
    end : 0,
    type : this.type,
    name : ''
  };

  while (i < n && !/\s/.test(s[i])) {
    props.name += s[i];
    i += 1;
  }
  props.end = i;
  return props;
};
Token.prototype.parse = function () {
  return this[this.type]();
};
Token.prototype.stringLiteral = function () {
  return {
    start : this.start,
    end : this.end,
    type : this.type,
    value : this.token
  };
};
if (typeof module === 'object') {
  module.exports = ParseMirc;
} else if (typeof window === 'object') {
  window.ParseMirc = ParseMirc;
}
}());
//# sourceMappingURL=mirc-parse.js.map