
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

titleDescr_obj = require('./coolTitleDescr');

console.log(titleDescr_obj['t' + String(randomIntBetween(1,20))]);
var coolTitleDescr = titleDescr_obj['t' + String(randomIntBetween(1,20))];


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.png'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  // our custom "verbose errors" setting
    // which we can use in the templates
    // via settings['verbose errors']
  app.enable('verbose errors');
  // disable them in production
  // use $ NODE_ENV=production node examples/error-pages
  if ('production' == app.settings.env) {
    app.disable('verbose errors');
  }
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

app.use(function(req, res, next){
  // the status option, or res.statusCode = 404
  // are equivalent, however with the option we
  // get the "status" local available as well
  res.render('404', { status: 404, url: req.url });
});

// error-handling middleware, take the same form
// as regular middleware, however they require an
// arity of 4, aka the signature (err, req, res, next).
// when connect has an error, it will invoke ONLY error-handling
// middleware.

// If we were to next() here any remaining non-error-handling
// middleware would then be executed, or if we next(err) to
// continue passing the error, only error-handling middleware
// would remain being executed, however here
// we simply respond with an error page.


app.use(function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.render('500', {
      status: err.status || 500
    , error: err
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// -----------------------------
// Utility Functions
// -----------------------------

function randomIntBetween(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}
