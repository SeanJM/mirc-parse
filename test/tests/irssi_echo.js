const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'IRSSI (%:echo)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/irssi_echo.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 47,
      "body": [
        {
          "type": "functionStatement",
          "start": 0,
          "end": 47,
          "expression": {
            "type": "callExpression",
            "callee": {
              "type": "identifier",
              "start": 0,
              "name": "%:echo",
              "end": 6
            },
            "switch": [],
            "arguments": [
              {
                "type": "literal",
                "value": "\u000300-\u000304!\u000300-\u0003",
                "raw": "'\u000300-\u000304!\u000300-\u0003'",
                "start": 7,
                "end": 20
              },
              {
                "type": "identifier",
                "start": 21,
                "name": "%::nick",
                "end": 28
              },
              {
                "type": "literal",
                "value": "\u000305[",
                "raw": "'\u000305['",
                "start": 29,
                "end": 33
              },
              {
                "type": "identifier",
                "start": 34,
                "name": "%::address",
                "end": 44
              },
              {
                "type": "literal",
                "value": "]\u0003",
                "raw": "']\u0003'",
                "start": 45,
                "end": 47
              }
            ],
            "property": false,
            "optional": false,
            "required": false,
            "start": 0,
            "end": 47
          }
        }
      ]
    };
  }
};