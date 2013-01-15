
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log('From inside app : ' + 'Need to pull the coolTitleDescr variable here');
  res.render('index', { title: 'SexyHobo',
                        description: 'Need to pull the coolTitleDescr variable here'});
};