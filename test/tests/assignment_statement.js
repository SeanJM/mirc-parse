const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Assignment statement',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/assignment_statement.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 15,
      "body": [
        {
          "type": "assignmentStatement",
          "start": 0,
          "end": 15,
          "expression": {
            "type": "assignmentExpression",
            "operator": "=",
            "left": {
              "type": "identifier",
              "start": 0,
              "name": "%identifier",
              "end": 11
            },
            "right": {
              "type": "literal",
              "value": "5",
              "raw": "5",
              "start": 14,
              "end": 15
            }
          }
        }
      ]
    };
  }
};