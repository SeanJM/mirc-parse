/*
  var %calc = $calc($$1 / $$2)
  > calc = arguments[0] && arguments[1]
      ? $calc(arguments[0] / arguments[1])
      : undefined
*/
Statement.prototype.functionStatement = function () {
  let type = 'functionStatement';
  return {
    type : type,
    start : this.start,
    end : this.end,
    expression : new Expression({
      context : type,
      start : this.start,
      end : this.end,
      string : this.string
    })
  };
};
