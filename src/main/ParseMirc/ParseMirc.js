function ParseMirc(propsOrString) {
  this.body = [];
  this.newLine = true;
  this.type = 'mirc';

  if (typeof propsOrString === 'string') {
    this.string = propsOrString;
    this.start = 0;
    this.end = propsOrString.length;
  } else {
    this.type = propsOrString.type || 'mirc';
    this.string = propsOrString.string;
    this.start = propsOrString.start || 0;
    this.end = propsOrString.end || propsOrString.string.length;
  }
}