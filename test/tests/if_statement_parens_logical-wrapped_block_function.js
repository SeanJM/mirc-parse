const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'If Statement (parens, logical, parens, block and function)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/if_statement_parens_logical-wrapped_block_function.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 55,
      "body": [
        {
          "type": "ifStatement",
          "start": 0,
          "end": 54,
          "test": {
            "type": "logicalExpression",
            "operator": "&&",
            "left": {
              "type": "binaryExpression",
              "operator": "===",
              "left": {
                "type": "identifier",
                "start": 5,
                "name": "%cat",
                "end": 9
              },
              "right": {
                "type": "literal",
                "value": "cat",
                "raw": "'cat'",
                "start": 14,
                "end": 17
              },
              "start": 5,
              "end": 17
            },
            "right": {
              "type": "binaryExpression",
              "operator": "==",
              "left": {
                "type": "identifier",
                "start": 23,
                "name": "%that",
                "end": 28
              },
              "right": {
                "type": "literal",
                "value": "this",
                "raw": "'this'",
                "start": 32,
                "end": 36
              },
              "start": 23,
              "end": 36
            },
            "start": 5,
            "end": 36
          },
          "consequent": {
            "type": "blockStatement",
            "start": 40,
            "end": 54,
            "body": [
              {
                "type": "functionStatement",
                "start": 44,
                "end": 54,
                "expression": {
                  "type": "callExpression",
                  "callee": {
                    "type": "identifier",
                    "start": 44,
                    "name": "echo",
                    "end": 48
                  },
                  "arguments": [
                    {
                      "type": "literal",
                      "value": "cat",
                      "raw": "'cat'",
                      "start": 49,
                      "end": 52
                    }
                  ],
                  "switches": false,
                  "property": false,
                  "optional": false,
                  "required": false,
                  "start": 44,
                  "end": 52
                }
              }
            ]
          },
          "alternate": false
        }
      ]
    };
  }
};