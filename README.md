# js-string-escape

[![Build Status](https://travis-ci.org/joliss/js-string-escape.png?branch=master)](https://travis-ci.org/joliss/js-string-escape)

Escape any string to be a valid JavaScript string literal between double
quotes or single quotes.

## Installation

```
npm install js-string-escape
```

## Example

If you need to generate JavaScript output, this library will help you safely
put arbitrary data in JavaScript strings:

```js
jsStringEscape = require('js-string-escape')

console.log('"' + jsStringEscape('Quotes (\", \'), newlines (\n), etc.') + '"')
// => "Quotes (\", \'), newlines (\n), etc."
```

In other words, given any string `s`, the following invariants hold:

```js
eval('"' + jsStringEscape(s) + '"') === s
eval("'" + jsStringEscape(s) + "'") === s
```

These `eval` expressions are safe with untrusted strings `s`.

Non-strings will be cast to strings.

## Compliance

This library has been checked against [ECMAScript
5.1](http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4) and tested
against all Unicode code points.

Note that the returned string is not necessarily valid JSON, since JSON
disallows control characters, and `\'` is illegal in JSON.

## Options
If you need to exclude single or double quote marks from the escaping then you may provide an optional second `options` parameter.  e.g.:
```js
jsStringEscape = require('js-string-escape');
string = '<p class="show">' + "'single'</p>";
options = { excludeDoubleQuote : true };
output = jsStringEscape(string, options);
console.log(output); // <p class="show">\'single\'</p>
```
The `options` parameter should be an object, with attributes to tailor the escaping.
* When `options` has the attribute `excludeDoubleQuote` set to true then double quote marks `"` will not be escaped.
* When `options` has the attribute `excludeSingleQuote` set to true then single quote marks `'` will not be escaped.

These options may be useful when it is known that the escaped string returned by js-string-escape will only be used within single or double quote marks.
