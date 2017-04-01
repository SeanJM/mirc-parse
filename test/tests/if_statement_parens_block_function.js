const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'If Statement (parens, block and function)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/if_statement_parens_block_function.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 26,
      "body": [
        {
          "type": "ifStatement",
          "start": 0,
          "end": 25,
          "test": {
            "type": "identifier",
            "start": 4,
            "name": "%cat",
            "end": 8
          },
          "consequent": {
            "type": "blockStatement",
            "start": 11,
            "end": 25,
            "body": [
              {
                "type": "functionStatement",
                "start": 15,
                "end": 25,
                "expression": {
                  "type": "callExpression",
                  "callee": {
                    "type": "identifier",
                    "start": 15,
                    "name": "echo",
                    "end": 19
                  },
                  "arguments": [
                    {
                      "type": "literal",
                      "value": "cat",
                      "raw": "'cat'",
                      "start": 20,
                      "end": 25
                    }
                  ],
                  "switches": false,
                  "property": false,
                  "optional": false,
                  "required": false,
                  "start": 0,
                  "end": 25
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