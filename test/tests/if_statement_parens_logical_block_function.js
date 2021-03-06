const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'If Statement (parens, logical, block and function)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/if_statement_parens_logical_block_function.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 51,
      "body": [
        {
          "type": "ifStatement",
          "start": 0,
          "end": 50,
          "test": {
            "type": "logicalExpression",
            "operator": "&&",
            "left": {
              "type": "binaryExpression",
              "operator": "===",
              "left": {
                "type": "identifier",
                "start": 4,
                "name": "%cat",
                "end": 8
              },
              "right": {
                "type": "literal",
                "value": "cat",
                "raw": "'cat'",
                "start": 13,
                "end": 16
              },
              "start": 4,
              "end": 16
            },
            "right": {
              "type": "binaryExpression",
              "operator": "==",
              "left": {
                "type": "identifier",
                "start": 20,
                "name": "%that",
                "end": 25
              },
              "right": {
                "type": "literal",
                "value": "this",
                "raw": "'this'",
                "start": 29,
                "end": 33
              },
              "start": 20,
              "end": 33
            },
            "start": 4,
            "end": 33
          },
          "consequent": {
            "type": "blockStatement",
            "start": 36,
            "end": 50,
            "body": [
              {
                "type": "functionStatement",
                "start": 40,
                "end": 50,
                "expression": {
                  "type": "callExpression",
                  "callee": {
                    "type": "identifier",
                    "start": 40,
                    "name": "echo",
                    "end": 44
                  },
                  "arguments": [
                    {
                      "type": "literal",
                      "value": "cat",
                      "raw": "'cat'",
                      "start": 45,
                      "end": 48
                    }
                  ],
                  "switches": false,
                  "property": false,
                  "optional": false,
                  "required": false,
                  "start": 40,
                  "end": 48
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