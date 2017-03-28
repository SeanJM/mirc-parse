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
