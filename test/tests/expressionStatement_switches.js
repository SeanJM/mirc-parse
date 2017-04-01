const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Expression Statement (echo -at)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/expressionStatement_switches.mrc'), 'utf8');
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
              "name": "echo",
              "end": 4
            },
            "arguments": [
              {
                "type": "literal",
                "value": "test",
                "raw": "'test'",
                "start": 9,
                "end": 13
              }
            ],
            "switch": [],
            "property": false,
            "optional": false,
            "required": false,
            "start": 0,
            "end": 13,
            "switches": {
              "start": 5,
              "end": 8,
              "value": [
                {
                  "start": 6,
                  "end": 7,
                  "prefix": "-",
                  "switch": "a",
                  "number": false
                },
                {
                  "start": 7,
                  "end": 8,
                  "prefix": "-",
                  "switch": "t",
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