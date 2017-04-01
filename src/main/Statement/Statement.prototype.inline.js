Statement.prototype.inline = function () {
  var i = this.start;
  var n = this.end;
  var string = this.string;

  while (i < n && !/\r\n|\n/.test(string[i])) {
    i += 1;
  }

  return new ParseMirc({
    type : 'blockStatement',
    start : this.start,
    end : i,
    string : string
  }).parse();
};