const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'If Statement (inline and function)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/if_statement_no-parens_inline_function.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 16,
      "body": [
        {
          "type": "ifStatement",
          "start": 0,
          "end": 16,
          "test": {
            "type": "identifier",
            "start": 3,
            "name": "%cat",
            "end": 7
          },
          "consequent": {
            "type": "functionStatement",
            "start": 8,
            "end": 16,
            "expression": {
              "type": "callExpression",
              "callee": {
                "type": "identifier",
                "start": 8,
                "name": "echo",
                "end": 12
              },
              "arguments": [
                {
                  "type": "literal",
                  "value": "cat",
                  "raw": "'cat'",
                  "start": 13,
                  "end": 16
                }
              ],
              "switch": [],
              "property": false,
              "optional": false,
              "required": false,
              "start": 0,
              "end": 16
            }
          },
          "alternate": false
        }
      ]
    };
  }
};