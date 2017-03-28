/*
  string : String,
  index : Number
*/
function TypeParser(props) {
  let i = props.start;
  let s = props.string;
  let n = props.end;
  let sl = props.string.substring(i, n);

  this.start = props.start;
  this.end = props.end;
  this.string = props.string;
  this.slice = sl;

  this.type = false;

  if (/^if(\s+|)\(|^if\s+/.test(sl)) {
    this.type = 'ifStatement';
  } else if (s.substring(i, 3) === 'var') {
    this.type = 'variableDeclaration';
  } else if (s.substring(i, 5) === 'alias') {
    this.type = 'aliasDeclaration';
  } else if (s.substring(i, 6) === 'return') {
    this.type = 'returnStatement';
  } else if (/^%[\:\.a-zA-Z0-9]+(\s+|)=/.test(sl)) {
    this.type = 'variableAssignment';
  } else if (/^%[\:\.a-zA-Z0-9]+/.test(sl) && props.isNewLine) {
    this.type = 'expressionStatement';
  } else if (/^(\/|)[a-zA-Z0-9]+/.test(sl) && props.isNewLine) {
    this.type = 'expressionStatement';
  } else if (/^\$[A-Za-z0-9\_]+/.test(sl)) {
    this.type = 'expressionStatement';
  }
}