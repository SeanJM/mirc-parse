const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Expression Statement ($iif)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/expressionStatement_iif.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 24,
      "body": [
        {
          "type": "functionStatement",
          "start": 0,
          "end": 24,
          "expression": {
            "type": "callExpression",
            "callee": {
              "type": "identifier",
              "start": 0,
              "name": "$iif",
              "end": 4
            },
            "arguments": {
              "start": 5,
              "end": 24,
              "value": [
                {
                  "type": "binaryExpression",
                  "operator": "==",
                  "left": {
                    "type": "identifier",
                    "start": 5,
                    "name": "%cat",
                    "end": 9
                  },
                  "right": {
                    "type": "literal",
                    "value": "2",
                    "raw": "2",
                    "start": 13,
                    "end": 14
                  }
                },
                {
                  "type": "literal",
                  "value": "yes",
                  "raw": "'yes'",
                  "start": 16,
                  "end": 19
                },
                {
                  "type": "literal",
                  "value": "no",
                  "raw": "'no'",
                  "start": 21,
                  "end": 23
                }
              ]
            },
            "switch": [],
            "property": false,
            "optional": false,
            "required": false,
            "start": 0,
            "end": 24
          }
        }
      ]
    };
  }
};