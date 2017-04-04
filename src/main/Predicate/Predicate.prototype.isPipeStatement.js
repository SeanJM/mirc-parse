Predicate.prototype.isPipeStatement = function () {
  var slice = this.string.substring(this.start, this.end);

  var index = Math.min.apply(null, [
    slice.indexOf('\r\n'),
    slice.indexOf('\n'),
    slice.length
  ].filter(function (a) {
    return a > -1;
  }));

  return /\s\|\s/.test(slice.substring(0, index));
};