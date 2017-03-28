const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Basic Alias Declaration',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/basic_alias.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 44,
      "body": [
        {
          "type": "functionDeclaration",
          "start": 0,
          "end": 43,
          "id": {
            "name": "basic",
            "start": 6,
            "end": 11
          },
          "body": {
            "type": "blockStatement",
            "start": 13,
            "end": 43,
            "body": [
              {
                "type": "functionStatement",
                "start": 17,
                "end": 43,
                "expression": {
                  "type": "callExpression",
                  "callee": {
                    "type": "identifier",
                    "start": 17,
                    "name": "echo",
                    "end": 21
                  },
                  "arguments": [
                    {
                      "type": "literal",
                      "value": "should",
                      "raw": "'should'",
                      "start": 22,
                      "end": 28
                    },
                    {
                      "type": "literal",
                      "value": "be",
                      "raw": "'be'",
                      "start": 29,
                      "end": 31
                    },
                    {
                      "type": "literal",
                      "value": "one",
                      "raw": "'one'",
                      "start": 32,
                      "end": 35
                    },
                    {
                      "type": "literal",
                      "value": "token",
                      "raw": "'token'",
                      "start": 36,
                      "end": 41
                    }
                  ],
                  "property": false,
                  "optional": false,
                  "required": false,
                  "start": 0,
                  "end": 41
                }
              }
            ]
          }
        }
      ]
    };
  }
};