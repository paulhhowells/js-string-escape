module.exports = function (string, options) {
  var regex = /["'\\\n\r\u2028\u2029]/g;

  return ('' + string).replace(regex, escapeCharacter);

  function escapeCharacter (character) {
    // Escape all characters not included in SingleStringCharacters and
    // DoubleStringCharacters on
    // http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
    // unless the options argument request excludes the character from escaping.
    if (options) {
      switch (character) {
        case '"':
          if (options.excludeDoubleQuote) {
            // Do not escape a Double Quote Mark.
            return character;
          }
        case "'":
          if (options.excludeSingleQuote) {
            // Do not escape a Single Quote Mark.
            return character;
          }
      }
    }
    switch (character) {
      case '"':
      case "'":
      case '\\':
        return '\\' + character
      // Four possible LineTerminator characters need to be escaped:
      case '\n':
        return '\\n'
      case '\r':
        return '\\r'
      case '\u2028':
        return '\\u2028'
      case '\u2029':
        return '\\u2029'
    }
  }
}
