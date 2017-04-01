const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Concatenation',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/concatenation.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 22,
      "body": [
        {
          "type": "functionStatement",
          "start": 0,
          "end": 22,
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
                "type": "binaryExpression",
                "operator": "$+",
                "left": {
                  "type": "literal",
                  "value": "concat",
                  "raw": "'concat'",
                  "start": 5,
                  "end": 11
                },
                "right": {
                  "type": "literal",
                  "value": "enate",
                  "raw": "'enate'",
                  "start": 15,
                  "end": 20
                }
              }
            ],
            "switch": [],
            "property": false,
            "optional": false,
            "required": false,
            "start": 0
          }
        }
      ]
    };
  }
};