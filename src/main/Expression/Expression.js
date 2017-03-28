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

  if (p.isAssignmentExpression()) {
    return this.assignmentExpression();
  } else if (p.isLogicalExpression()) {

  } else if (p.isBinaryExpression()) {
    return this.binaryExpression();
  } else if (p.isCallExpression()) {
    return this.callExpression();
  } else if (p.isIdentifierExpression()) {
    return this.identifierExpression();
  } else if (p.isLiteralExpression()) {
    return this.literalExpression();
  }
}