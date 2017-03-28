const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Expression Statement',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/expressionStatement.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 20,
      "body": [
        {
          "type": "functionStatement",
          "start": 0,
          "end": 20,
          "expression": {
            "type": "callExpression",
            "callee": {
              "type": "identifier",
              "start": 0,
              "name": "$expressionStatement",
              "end": 20
            },
            "arguments": false,
            "property": false,
            "optional": false,
            "required": false,
            "start": 0,
            "end": 20
          }
        }
      ]
    };
  }
};