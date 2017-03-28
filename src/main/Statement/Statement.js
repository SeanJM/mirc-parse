function Statement(opt) {
  let slice = opt.string.substring(opt.start, opt.end).trim();
  Object.assign(this, opt);

  if (/^(\/|)var\b/.test(slice)) {
    return this.variableDeclaration();
  } else if (/^%[a-zA-Z\-\_0-9]+(\s+)=/.test(slice)) {
    return this.assignmentStatement();
  } else if (/^(\/|)alias\b/.test(slice)) {
    return this.functionDeclaration();
  } else if (/^(\/|)[a-zA-Z0-9\-\_]+/.test(slice)) {
    return this.functionStatement();
  } else if (/^\$[a-zA-Z0-9\-\_]+/.test(slice)) {
    return this.functionStatement();
  } else if (/^\%[\:\.a-zA-Z0-9\-\_]+/.test(slice)) {
    return this.functionStatement();
  } else if (/^(\/|)return\b/.test(slice)) {
    return this.returnStatement();
  } else if (/^(\/|)halt\b/.test(slice)) {
    return this.haltStatement();
  } else if (/^if\b/.test(slice)) {
    return this.ifStatement();
  }
}