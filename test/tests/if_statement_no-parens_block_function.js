const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'If Statement (block and function)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/if_statement_no-parens_block_function.mrc'), 'utf8');
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
          "type": "ifStatement",
          "start": 0,
          "end": 23,
          "test": {
            "type": "identifier",
            "start": 3,
            "name": "%cat",
            "end": 7
          },
          "consequent": {
            "type": "blockStatement",
            "start": 9,
            "end": 23,
            "body": [
              {
                "type": "functionStatement",
                "start": 13,
                "end": 23,
                "expression": {
                  "type": "callExpression",
                  "callee": {
                    "type": "identifier",
                    "start": 13,
                    "name": "echo",
                    "end": 17
                  },
                  "arguments": [
                    {
                      "type": "literal",
                      "value": "cat",
                      "raw": "'cat'",
                      "start": 18,
                      "end": 23
                    }
                  ],
                  "switch": [],
                  "property": false,
                  "optional": false,
                  "required": false,
                  "start": 0,
                  "end": 23
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