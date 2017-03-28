var EXP_ALIAS = /[a-zA-Z0-9_\-]+/;
var EXP_VAR = /%[a-zA-Z0-9_\-\:\.\_]+/;

var COMPARISON_OPERATORS = [
  '==',         // equal to
  '===',        // equal to (case-sensitive)
  '!=',         // not equal to
  '<',          // less than
  '>',          // larger than
  '>=',         // larger than or equal to
  '<=',         // smaller than or equal to
  '//',         // v2 is a multiple of v1
  '\\\\',       // v2 is not a multiple of v1
  '&',          // bitwise comparison

  'isin',       // string v1 is in string v2
  'isincs',     // string v1 is in string v2 (case sensitive)
  'iswm',       // wildcard string v1 matches string v2
  'iswmcs',     // wildcard string v1 matches string v2 (case sensitive)
  'isnum',      // number v1 is a number in the range v2 which is in the form n1-n2 (v2 optional)
  'isletter',   // letter v1 is a letter in the list of letters in v2 (v2 optional)
  'isalnum',    // text contains only letters and numbers
  'isalpha',    // text contains only letters
  'islower',    // text contains only lower case letters
  'isupper',    // text contains only upper case letters

  'ison',       // nickname v1 is on channel v2
  'isop',       // nickname v1 is an op on channel v2
  'ishop',      // nickname v1 is a halfop on channel v2
  'isvoice',    // nickname v1 has a voice on channel v2
  'isreg',      // nickname v1 is a normal nick on channel v2
  'ischan',     // if v1 is a channel which you are on.
  'isban',      // if v1 is a banned address in internal ban list on channel v2
  'isinvite',   // if v1 is on the invite list of channel v2
  'isexcept',   // if v1 is on the except list of channel v2

  'isaop',      // if v1 is a user in your auto-op list for channel v2 (v2 optional)
  'isavoice',   // if v1 is a user in your auto-voice list for channel v2 (v2 optional)
  'isignore',   // if v1 is a user in your ignore list with the ignore switch v2 (v2 optional)
  'isprotect',  // if v1 is a user in your protect list for channel v2 (v2 optional)
  'isnotify',    // if v1 is a user in your notify list.

  // Negate
  '!==',

  '!isin',
  '!isincs',
  '!iswm',
  '!iswmcs',
  '!isnum',
  '!isletter',
  '!isalnum',
  '!isalpha',
  '!islower',
  '!isupper',

  '!ison',
  '!isop',
  '!ishop',
  '!isvoice',
  '!isreg',
  '!ischan',
  '!isban',
  '!isinvite',
  '!isexcept',

  '!isaop',
  '!isavoice',
  '!isignore',
  '!isprotect',
  '!isnotify'
];

var LOGICAL_OPERATORS = [
  '&&',
  '||'
];