const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Identifier function statement',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/variable_functionStatement.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    console.log(JSON.stringify(result, null, '  '));
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 11,
      "body": [
        {
          "type": "functionStatement",
          "start": 0,
          "end": 11,
          "expression": {
            "type": "callExpression",
            "callee": {
              "type": "identifier",
              "start": 0,
              "name": "%identifier",
              "end": 11
            },
            "arguments": [],
            "property": false,
            "optional": false,
            "required": false,
            "start": 0,
            "end": 11
          }
        }
      ]
    };
  }
};