const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Expression Statement (ban -u120k)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/expressionStatement_switches_number_mix.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 28,
      "body": [
        {
          "type": "functionStatement",
          "start": 0,
          "end": 28,
          "expression": {
            "type": "callExpression",
            "callee": {
              "type": "identifier",
              "start": 0,
              "name": "ban",
              "end": 3
            },
            "arguments": [
              {
                "type": "identifier",
                "start": 11,
                "name": "#channel",
                "end": 19
              },
              {
                "type": "literal",
                "value": "nickname",
                "raw": "'nickname'",
                "start": 20,
                "end": 28
              }
            ],
            "switches": false,
            "property": false,
            "optional": false,
            "required": false,
            "start": 0,
            "end": 28,
            "switches": {
              "start": 4,
              "end": 10,
              "value": [
                {
                  "start": 5,
                  "end": 9,
                  "prefix": "-",
                  "switch": "u",
                  "number": 120
                },
                {
                  "start": 9,
                  "end": 10,
                  "prefix": "-",
                  "switch": "k",
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