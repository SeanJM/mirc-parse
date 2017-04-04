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