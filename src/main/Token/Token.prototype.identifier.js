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