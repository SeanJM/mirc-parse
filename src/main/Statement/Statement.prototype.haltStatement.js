Statement.prototype.haltStatement = function () {
  return {
    type : 'haltStatement',
    start : 0,
    end : 0,
    value : []
  };
};