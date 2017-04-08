const ParseMirc = require('../../mirc-parse.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name : 'Basic Alias Declaration (inline)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/mrc/basic_alias_inline.mrc'), 'utf8');
    const parser = new ParseMirc(str);
    const result = parser.parse(str);
    return result;
  },
  isDeepEqual : function () {
    return {
      "type": "mirc",
      "start": 0,
      "end": 55,
      "body": [
        {
          "type": "functionDeclaration",
          "start": 0,
          "end": 55,
          "switches": false,
          "id": {
            "name": "carbon.whowas",
            "start": 6,
            "end": 19
          },
          "body": {
            "type": "functionStatement",
            "start": 20,
            "end": 55,
            "expression": {
              "type": "callExpression",
              "callee": {
                "type": "identifier",
                "start": 20,
                "name": "%:echo",
                "end": 26
              },
              "arguments": [
                {
                  "type": "callExpression",
                  "callee": {
                    "type": "identifier",
                    "start": 27,
                    "name": "$+",
                    "end": 29
                  },
                  "arguments": {
                    "start": 30,
                    "end": 55,
                    "value": [
                      {
                        "type": "callExpression",
                        "callee": {
                          "type": "identifier",
                          "start": 30,
                          "name": "$str",
                          "end": 34
                        },
                        "arguments": {
                          "start": 35,
                          "end": 47,
                          "value": [
                            {
                              "type": "callExpression",
                              "callee": {
                                "type": "identifier",
                                "start": 35,
                                "name": "$chr",
                                "end": 39
                              },
                              "arguments": {
                                "start": 40,
                                "end": 44,
                                "value": [
                                  {
                                    "type": "literal",
                                    "value": "160",
                                    "raw": "160",
                                    "start": 40,
                                    "end": 43
                                  }
                                ]
                              },
                              "switches": false,
                              "property": false,
                              "optional": false,
                              "required": false,
                              "start": 35,
                              "end": 44
                            },
                            {
                              "type": "literal",
                              "value": "3",
                              "raw": "3",
                              "start": 45,
                              "end": 46
                            }
                          ]
                        },
                        "switches": false,
                        "property": false,
                        "optional": false,
                        "required": false,
                        "start": 30,
                        "end": 47
                      },
                      {
                        "type": "identifier",
                        "start": 48,
                        "name": "%::pre",
                        "end": 54
                      }
                    ]
                  },
                  "switches": false,
                  "property": false,
                  "optional": false,
                  "required": false,
                  "start": 27,
                  "end": 55
                }
              ],
              "switches": false,
              "property": false,
              "optional": false,
              "required": false,
              "start": 20,
              "end": 55
            }
          }
        }
      ]
    };
  }
};