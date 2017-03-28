(function () {
  function getType(content) {
    /*
      Identifier
      - Identifier
    */

    /*
      UnaryExpression
      - !identifier
    */

    /*
      BinaryExpression
      - Identifier/Literal operator Identifier/Literal
    */

    /*
      LogicalExpression
      - Expression operator Expression
    */
  }

  ParseMirc.prototype.parseConditional = function () {
    var capture = between('(', ')', this.string.substring(this.start, this.end));
    var s = this.string;
    var i = capture.start + 1;
    var n = capture.end + 1;

    this.start = i;
    this.end = n;
    this.type = 'binaryExpression';

    this.left = false;
    this.right = false;
    this.operator = false;

    i = this.trimStart(i);

    this.left = new ParseMirc({
      start : i,
      end : n,
      string : s
    }).parseToken();

    i = this.trimStart(this.left.end);

    if (['!', '=', '>', '<'].includes(s[i])) {
      this.operator = new ParseMirc({
        start : i,
        end : n,
        string : s
      }).parseToken();
    }

    return {
      type : this.type,
      start : this.start,
      end : this.end,
      left : this.left,
      operator : this.operator,
      right : this.right,
    };
  };
}());
