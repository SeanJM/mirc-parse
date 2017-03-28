Statement.prototype.assignmentStatement = function () {
  return {
    type : 'assignmentStatement',
    start : this.body.start,
    end : this.body.end,
    declarations : []
  };
};