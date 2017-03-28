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