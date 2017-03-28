const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Function Statement (echo string)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/echo_string.mrc'), 'utf8');
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
          "type": "functionStatement",
          "start": 0,
          "end": 26,
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
                "type": "literal",
                "value": "should",
                "raw": "'should'",
                "start": 5,
                "end": 11
              },
              {
                "type": "literal",
                "value": "be",
                "raw": "'be'",
                "start": 12,
                "end": 14
              },
              {
                "type": "literal",
                "value": "one",
                "raw": "'one'",
                "start": 15,
                "end": 18
              },
              {
                "type": "literal",
                "value": "token",
                "raw": "'token'",
                "start": 19,
                "end": 24
              }
            ],
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