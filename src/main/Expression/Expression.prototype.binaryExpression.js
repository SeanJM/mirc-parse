Expression.prototype.binaryExpression = function () {
  return this.logicalAndBinaryExpression(BINARY_OPERATORS, 'binaryExpression');
};