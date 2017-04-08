const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Basic Alias Declaration (pipes)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/basic_alias_inline_pipe.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 38,
      "body": [
        {
          "type": "functionDeclaration",
          "start": 0,
          "end": 39,
          "switches": false,
          "id": {
            "name": "pipe",
            "start": 6,
            "end": 10
          },
          "body": {
            "type": "pipeStatement",
            "start": 11,
            "end": 39,
            "body": [
              {
                "type": "functionStatement",
                "start": 11,
                "end": 24,
                "expression": {
                  "type": "callExpression",
                  "callee": {
                    "type": "identifier",
                    "start": 11,
                    "name": "echo",
                    "end": 15
                  },
                  "arguments": [
                    {
                      "type": "literal",
                      "value": "lest",
                      "raw": "'lest'",
                      "start": 19,
                      "end": 23
                    }
                  ],
                  "switches": {
                    "start": 16,
                    "end": 18,
                    "value": [
                      {
                        "start": 17,
                        "end": 18,
                        "prefix": "-",
                        "switch": "t",
                        "number": false
                      }
                    ]
                  },
                  "property": false,
                  "optional": false,
                  "required": false,
                  "start": 11,
                  "end": 23
                }
              },
              {
                "type": "functionStatement",
                "start": 26,
                "end": 38,
                "expression": {
                  "type": "callExpression",
                  "callee": {
                    "type": "identifier",
                    "start": 26,
                    "name": "echo",
                    "end": 30
                  },
                  "arguments": [
                    {
                      "type": "literal",
                      "value": "test",
                      "raw": "'test'",
                      "start": 34,
                      "end": 38
                    }
                  ],
                  "switches": {
                    "start": 31,
                    "end": 33,
                    "value": [
                      {
                        "start": 32,
                        "end": 33,
                        "prefix": "-",
                        "switch": "a",
                        "number": false
                      }
                    ]
                  },
                  "property": false,
                  "optional": false,
                  "required": false,
                  "start": 26,
                  "end": 38
                }
              }
            ]
          }
        }
      ]
    };
  }
};