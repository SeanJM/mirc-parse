ParseMirc.prototype.trimStart = function (i) {
  var s = this.string;
  while (s[i] && /\s/.test(s[i])) {
    i += 1;
  }
  return i;
};
