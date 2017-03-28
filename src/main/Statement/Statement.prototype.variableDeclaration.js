Statement.prototype.variableDeclaration = function () {
  return {
    type : 'variableDeclaration',
    start : this.body.start,
    end : this.body.end,
    declarations : []
  };
};