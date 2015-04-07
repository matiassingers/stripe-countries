'use strict';

var osmosis = require('osmosis');

module.exports = function(callback){
  var countries = [];

  osmosis
    .get('https://stripe.com/global')
    .find('.availability ul li')
    .set({
      country: 'span',
      url: 'a @href',
      statusCodes: '@class',
      image: 'img @src'
    })
    .then(function(context, data, next){
      data.image = 'https://stripe.com' + data.image;
      data.countryCode = data.url.slice(-2);

      data.statusCodes = data.statusCodes
        .replace(data.countryCode, '')
        .replace(/\s{2,}/g, ' ')
        .trim()
        .split(' ');

      data.statusCodes.forEach(function(code) {
        data[code] = true;
      });

      if(data.url.indexOf('#') === 0){
        data.url = void 0;
      }

      next(context, data);
    })
    .data(function(country){
      countries.push(country);
    })
    .done(function(){
      callback(countries);
    });
};
