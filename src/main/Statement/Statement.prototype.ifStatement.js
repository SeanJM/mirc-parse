Statement.prototype.ifStatement = function (opt) {
  var s = opt.string;
  var i = opt.start;

  var props = {
    type : 'ifStatement',
    start : i,
    end : 0,
    test : {},
    consequent : false,
    alternate : false
  };

  if (/^if(\s+|)\(/.test(s)) {
    props.test = new ParseMirc({
      string : s,
      start : i
    }).parseConditional();
  }

  i = props.test.end;
  props.consequent = new ParseMirc({
    string : s,
    start : i
  }).parseBlock();
  props.end = props.consequent.end;

  // Capture name
  return props;
};