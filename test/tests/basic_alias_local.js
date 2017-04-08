const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Basic Alias Declaration (local)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/basic_alias_local.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 58,
      "body": [
        {
          "type": "functionDeclaration",
          "start": 0,
          "end": 58,
          "switches": {
            "start": 6,
            "end": 8,
            "value": [
              {
                "start": 7,
                "end": 8,
                "prefix": "-",
                "switch": "l",
                "number": false
              }
            ]
          },
          "id": {
            "name": "carbon.whowas",
            "start": 9,
            "end": 22
          },
          "body": {
            "type": "functionStatement",
            "start": 23,
            "end": 58,
            "expression": {
              "type": "callExpression",
              "callee": {
                "type": "identifier",
                "start": 23,
                "name": "%:echo",
                "end": 29
              },
              "arguments": [
                {
                  "type": "callExpression",
                  "callee": {
                    "type": "identifier",
                    "start": 30,
                    "name": "$+",
                    "end": 32
                  },
                  "arguments": {
                    "start": 33,
                    "end": 58,
                    "value": [
                      {
                        "type": "callExpression",
                        "callee": {
                          "type": "identifier",
                          "start": 33,
                          "name": "$str",
                          "end": 37
                        },
                        "arguments": {
                          "start": 38,
                          "end": 50,
                          "value": [
                            {
                              "type": "callExpression",
                              "callee": {
                                "type": "identifier",
                                "start": 38,
                                "name": "$chr",
                                "end": 42
                              },
                              "arguments": {
                                "start": 43,
                                "end": 47,
                                "value": [
                                  {
                                    "type": "literal",
                                    "value": "160",
                                    "raw": "160",
                                    "start": 43,
                                    "end": 46
                                  }
                                ]
                              },
                              "switches": false,
                              "property": false,
                              "optional": false,
                              "required": false,
                              "start": 38,
                              "end": 47
                            },
                            {
                              "type": "literal",
                              "value": "3",
                              "raw": "3",
                              "start": 48,
                              "end": 49
                            }
                          ]
                        },
                        "switches": false,
                        "property": false,
                        "optional": false,
                        "required": false,
                        "start": 33,
                        "end": 50
                      },
                      {
                        "type": "identifier",
                        "start": 51,
                        "name": "%::pre",
                        "end": 57
                      }
                    ]
                  },
                  "switches": false,
                  "property": false,
                  "optional": false,
                  "required": false,
                  "start": 30,
                  "end": 58
                }
              ],
              "switches": false,
              "property": false,
              "optional": false,
              "required": false,
              "start": 23,
              "end": 58
            }
          }
        }
      ]
    };
  }
};