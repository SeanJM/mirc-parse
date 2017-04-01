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