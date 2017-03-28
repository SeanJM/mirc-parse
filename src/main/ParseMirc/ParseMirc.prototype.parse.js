ParseMirc.prototype.parse = function () {
  var s = this.string;
  var i = this.start;
  var n = this.end;
  var statement;

  for (; i < n; i++) {
    if (s[i] === '\n') {
      this.isNewLine = true;
    } else if (this.isNewLine && !/\s/.test(s[i])) {
      this.isNewLine = false;
    }

    while (/\s/.test(s[i])) i += 1;

    statement = new Statement({
      string : this.string,
      start : i,
      end : this.end
    });

    if (statement.type) {
      i += statement.end;
      this.body.push(statement);
    }
  }

  return {
    type : this.type,
    start : this.start,
    end : this.end,
    body : this.body
  };
};