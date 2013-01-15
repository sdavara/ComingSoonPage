var utilities = require('../modules/utilities');
var titleDescr_obj = require('../coolTitleDescr');
var coolTitleDescr = titleDescr_obj['t' + String(utilities.randomIntBetween(1,20))];
console.log(coolTitleDescr);

exports.index = function(req, res){

  console.log('From inside app : ' + 'Need to pull the coolTitleDescr variable here');
  res.render('index', { title: 'SexyHobo',
                        description: titleDescr_obj['t' + String(utilities.randomIntBetween(1,20))]});
};