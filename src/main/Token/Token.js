function Token(opt) {
  this.start = opt.start;
  this.end = opt.end;
  this.string = opt.string;

  this.token = this.string.substring(this.start, this.end);
  this.getType();
}