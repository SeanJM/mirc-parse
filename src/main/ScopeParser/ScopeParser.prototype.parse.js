/*
  string : String,
  index : Number
*/
TypeParser.prototype.parse = function (props) {
  console.log(this.type);
  return this[this.type](props);
};