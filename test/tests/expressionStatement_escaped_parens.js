const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Expression Statement (escaped parens)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/expressionStatement_escaped_parens.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 16,
      "body": [
        {
          "type": "functionStatement",
          "start": 0,
          "end": 16,
          "expression": {
            "type": "callExpression",
            "callee": {
              "type": "identifier",
              "start": 0,
              "name": "echo",
              "end": 4
            },
            "switch": [],
            "arguments": [
              {
                "type": "literal",
                "value": "\u0003( value )\u0003",
                "raw": "'\u0003( value )\u0003'",
                "start": 5,
                "end": 16
              }
            ],
            "property": false,
            "optional": false,
            "required": false,
            "start": 0,
            "end": 16
          }
        }
      ]
    };
  }
};