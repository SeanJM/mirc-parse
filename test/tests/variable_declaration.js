const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Variable declaration',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/variable_declaration.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 19,
      "body": [
        {
          "type": "variableDeclaration",
          "start": 0,
          "end": 19,
          "declarations": [
            {
              "type": "assignmentExpression",
              "operator": "=",
              "left": {
                "type": "identifier",
                "start": 4,
                "name": "%identifier",
                "end": 15
              },
              "right": {
                "type": "literal",
                "value": "1",
                "raw": "1",
                "start": 18,
                "end": 19
              }
            }
          ]
        }
      ]
    };
  }
};