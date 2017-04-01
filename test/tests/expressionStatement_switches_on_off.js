const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Expression Statement (strip +bur-c)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/expressionStatement_switches_on_off.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 12,
      "body": [
        {
          "type": "functionStatement",
          "start": 0,
          "end": 12,
          "expression": {
            "type": "callExpression",
            "callee": {
              "type": "identifier",
              "start": 0,
              "name": "strip",
              "end": 5
            },
            "arguments": false,
            "switches": false,
            "property": false,
            "optional": false,
            "required": false,
            "start": 0,
            "end": 12,
            "switches": {
              "start": 6,
              "end": 12,
              "value": [
                {
                  "start": 7,
                  "end": 8,
                  "prefix": "+",
                  "switch": "b",
                  "number": false
                },
                {
                  "start": 8,
                  "end": 9,
                  "prefix": "+",
                  "switch": "u",
                  "number": false
                },
                {
                  "start": 9,
                  "end": 10,
                  "prefix": "+",
                  "switch": "r",
                  "number": false
                },
                {
                  "start": 11,
                  "end": 12,
                  "prefix": "-",
                  "switch": "c",
                  "number": false
                }
              ]
            }
          }
        }
      ]
    };
  }
};