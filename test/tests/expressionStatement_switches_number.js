const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Expression Statement (autojoin -d90)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/expressionStatement_switches_number.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 13,
      "body": [
        {
          "type": "functionStatement",
          "start": 0,
          "end": 13,
          "expression": {
            "type": "callExpression",
            "callee": {
              "type": "identifier",
              "start": 0,
              "name": "autojoin",
              "end": 8
            },
            "arguments": false,
            "switches": false,
            "property": false,
            "optional": false,
            "required": false,
            "start": 0,
            "end": 13,
            "switches": {
              "start": 9,
              "end": 13,
              "value": [
                {
                  "start": 10,
                  "end": 13,
                  "prefix": "-",
                  "switch": "d",
                  "number": 90
                }
              ]
            }
          }
        }
      ]
    };
  }
};