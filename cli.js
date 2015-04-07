#!/usr/bin/env node
'use strict';

var pkg = require('./package.json');
var stripeCountries = require('./');
var argv = process.argv.slice(2);

var columnify = require('columnify');
var logSymbols = require('log-symbols');

function help() {
  console.log([
    '',
      '  ' + pkg.description,
    '',
    '  Example',
    '    stripe-countries',
    '',
    '    =>     COUNTRY        OPEN BETA PRIVATE',
    '        AU Australia       ✔',
    '        CA Canada          ✔',
    '        CH Switzerland          ✔      ✔'
  ].join('\n'));
}

if (argv.indexOf('--help') !== -1) {
  help();
  return;
}

if (argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}

function checkmark(data){
  if(!data){
    return '';
  }

  return logSymbols.success;
}

stripeCountries(function(results){
  console.log(results);

  var columns = columnify(results, {
    columns: ['countryCode', 'country', 'open', 'beta', 'private'],
    config: {
      countryCode: { showHeaders: false },
      open: { dataTransform: checkmark, align: 'center' },
      beta: { dataTransform: checkmark, align: 'center' },
      private: { dataTransform: checkmark, align: 'center' }
    }
  })
  console.log(columns)
});
