'use strict';

/* jshint node:true */

var bundle = require('../../../build/babel/bundle');

module.exports = {
  node: {
    options: bundle,
    files: {
      'dist/bundle/node/l20n.js': 'src/runtime/node/index.js'
    }
  },
};
