/*
  opt : {
    start : Number,
    end : Number,
    string : String
  }
*/

function Expression(opt) {
  let p = new Predicate(opt);

  Object.assign(this, opt);
  this.type = false;

  if (p.isAssignmentExpression()) {
    return this.assignmentExpression();
  } else if (p.isCallExpression()) {
    return this.callExpression();
  } else if (p.isLogicalExpression()) {
    return this.logicalExpression();
  } else if (p.isBinaryExpression()) {
    return this.binaryExpression();
  } else if (p.isIdentifierExpression()) {
    return this.identifierExpression();
  } else if (p.isLiteralExpression()) {
    return this.literalExpression();
  }
}