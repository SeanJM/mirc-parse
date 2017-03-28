Statement.prototype.variableDeclaration = function () {
  var declarations = parseArray({
    start : this.start + 3,
    end : this.end,
    string : this.string,
    delimiter : ','
  });

  var self = this;

  return {
    type : 'variableDeclaration',
    start : this.start,
    end : this.end,
    declarations : declarations.value.map(function (a) {
      return new Expression({
        start : a.start,
        end : a.end,
        string : self.string
      });
    })
  };
};