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

  props.body = new Statement({
    string : s,
    start : i,
    end : this.end
  });

  props.end = props.body.end;

  return props;
};