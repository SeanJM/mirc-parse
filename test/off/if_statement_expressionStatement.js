const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'If statement',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/if_statement_expressionStatement.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    console.log(JSON.stringify(result, null, '  '));
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
            "type": "binaryExpression",
            "start": 4,
            "end": 9,
            "left": {
              "start": 4,
              "end": 8,
              "type": "identifier",
              "name": "%cat"
            },
            "operator": false,
            "right": false
          },
          "consequent": {
            "type": "blockStatement",
            "start": 11,
            "end": 25,
            "body": [
              {
                "type": "expressionStatement",
                "start": 15,
                "end": 25,
                "expression": {
                  "start": 15,
                  "calle": {
                    "type": "identifier",
                    "start": 15,
                    "name": "echo",
                    "end": 19
                  },
                  "arguments": [
                    {
                      "start": 20,
                      "end": 23,
                      "type": "stringLiteral",
                      "value": "cat"
                    }
                  ]
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