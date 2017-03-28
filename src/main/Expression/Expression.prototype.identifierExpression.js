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