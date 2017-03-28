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