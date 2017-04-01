const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Variable declaration (multiple)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/variable_declaration_multiple.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 43,
      "body": [
        {
          "type": "variableDeclaration",
          "start": 0,
          "end": 43,
          "declarations": [
            {
              "type": "assignmentExpression",
              "operator": "=",
              "left": {
                "type": "identifier",
                "start": 4,
                "name": "%x",
                "end": 6
              },
              "right": {
                "type": "literal",
                "value": "1",
                "raw": "1",
                "start": 9,
                "end": 10
              }
            },
            {
              "type": "assignmentExpression",
              "operator": "=",
              "left": {
                "type": "identifier",
                "start": 12,
                "name": "%a",
                "end": 14
              },
              "right": {
                "type": "callExpression",
                "callee": {
                  "type": "identifier",
                  "start": 17,
                  "name": "$duration",
                  "end": 26
                },
                "arguments": {
                  "start": 27,
                  "end": 34,
                  "value": [
                    {
                      "type": "literal",
                      "value": "300000",
                      "raw": "300000",
                      "start": 27,
                      "end": 33
                    }
                  ]
                },
                "switch": [],
                "property": false,
                "optional": false,
                "required": false,
                "start": 17,
                "end": 34
              }
            },
            {
              "type": "assignmentExpression",
              "operator": "=",
              "left": {
                "type": "identifier",
                "start": 36,
                "name": "%b",
                "end": 38
              },
              "right": {
                "type": "identifier",
                "start": 41,
                "name": "%c",
                "end": 43
              }
            }
          ]
        }
      ]
    };
  }
};