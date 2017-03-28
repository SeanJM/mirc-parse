Statement.prototype.assignmentStatement = function () {
  let type = 'assignmentStatement';
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