'use strict';

function strip(src) {
  src = src.replace(
    /.*var .* = require.*;\n/g,
    '');
  src = src.replace(
    /.*exports.*;\n/g,
    '');
  src = src.replace(
    /.*'use strict';\n/g,
    '');
  src = src.replace(
    /.*\/\* global .*\*\/\n/g,
    '');
  src = src.replace(
    /.*\/\* exported .*\*\/\n/g,
    '');
  src = src.replace(
    /\n([^\n])/g, function(match, p1) {
      return '\n  ' + p1;
    });
  return src;
}

var clientsideOpts = {
  separator: '',
  banner: '' +
    '(function(window, undefined) {\n' +
    '  \'use strict\';\n' +
    '\n' +
    '  /* jshint validthis:true */',
  footer: '\n})(this);\n',
  process: strip
};

module.exports = {
  web: {
    options: clientsideOpts,
    src: [
      'src/lib/errors.js',
      'src/bindings/html/io.js',
      'src/lib/events.js',
      'src/lib/plurals.js',
      'src/lib/format/properties/parser.js',
      'src/lib/resolver.js',
      'src/lib/util.js',
      'src/lib/pseudo.js',
      'src/lib/locale.js',
      'src/lib/context.js',
      'src/bindings/html/allowed.js',
      'src/bindings/html/index.js',
      'src/bindings/html/dom.js',
      'src/runtime/web/index.js',
    ],
    dest: 'dist/web/l10n.js',
  },
  jsshell: {
    options: clientsideOpts,
    src: [
      'src/lib/errors.js',
      'src/lib/events.js',
      'src/lib/plurals.js',
      'src/lib/format/properties/parser.js',
      'src/lib/resolver.js',
      'src/lib/util.js',
      'src/lib/pseudo.js',
      'src/lib/locale.js',
      'src/lib/context.js',
      'src/bindings/jsshell/io.js',
      'src/bindings/jsshell/index.js',
    ],
    dest: 'dist/jsshell/l10n.js',
  },
};
