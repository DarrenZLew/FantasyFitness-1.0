const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const app = express();



// Serve static files from the React app in production. During development, run client app separately
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/../client/build')));
}

// CORS middleware
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});




//const bcrypt = require('bcrypt')
const test_user = {
  username: 'Michael',
  passwordHash: 'password',
  id: 42
}



// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
//passport.use(new Strategy(
	//function(username, password, cb) {
		////console.log(db);
		////console.log("YYYYYYYYYYYYYYYEEEEEEEEEEEEEAAAAAAAAAAAAAHHHHHHHHHHH");
		////db.users.findByUsername(username, function(err, user) {
		//return findUser(username, (err, user) => {
			//console.log("YYYYYEEEEEAHHHHH!");
			//if (err) { return cb(err); }
			//if (!user) { return cb(null, false); }
			//if (user.password != password) { return cb(null, false); }
			//return cb(null, user);
		//});
	//}));



passport.use(new Strategy(
	function(username, password, cb) {
		console.log("hiya!");
		return cb(null, test_user);

		//return db.users.findByUsername(username, function(err, user) {
			//console.log("Aaahhha");
			//if (err) { return cb(err); }
			//if (!user) { return cb(null, false); }
			//if (user.password != password) { return cb(null, false); }
			//return cb(null, user);
		//});
	}));

//app.use(flash());



// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
	console.log("serializing");
	cb(null, user.id);
});


//passport.deserializeUser(function(id, cb) {
	//db.users.findById(id, function (err, user) {
		//if (err) { return cb(err); }
		//cb(null, user);
	//});
//});
passport.deserializeUser(function(id, done) {
	console.log("This worked");

	done(null, test_user);
	return;

	User.findById(id, function(err, user) {
		done(err, user);
	});
});


// Create a new Express application.

// Configure view engine to render EJS templates.
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
//app.use(require('body-parser').urlencoded({ extended: false })); // TODO: False or True?
// TODO: move these to header






//app.use(express.static("public")); // TODO: what is this?
//app.use(require('morgan')('combined'));
//app.use(require('cookie-parser')());
//app.use(require('express-session')(
	//{
		//secret: 'keyboard cat',
		//resave: false,
		//saveUninitialized: false
	//}));
//app.use(passport.initialize());
//app.use(passport.session());


app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());

/*app.use(require('body-parser').urlencoded({
	extended: true
}));*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());




//app.post('/auth/login', function(req, res, next) {
	//function(req, res){
		//req.logout();
		//res.redirect('/');
	//}
//});


app.post('/auth/login', passport.authenticate('local', {
	//successRedirect: '/score',
	successRedirect: '/',
	failureRedirect: '/FAILURE', // TODO: make better
	//failureFlash: true
}));


/*
app.post('/auth/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/FAILURE', // TODO: make better
		//failureFlash: true
		//failureRedirect: '/login',
	})
);
*/

//app.listen(3000);


var isAuthenticated = function(req, res, next){
	if(req.user) {
		return next();
	}
	else
	{
		return res.status(401).json({
			error: 'User not authenticated'
		});
	}

}

//router.get('/checkauth', isAuthenticated, function(req, res){
    //res.status(200).json({
        //status: 'Login successful!'
    //});
//});


//app.get('/whatever', require('connect-ensure-login').ensureLoggedIn(),

app.get('/whatever', isAuthenticated, function(req, res) {
			//console.log(res);
			console.log(req.session.passport.user);
			console.log(req.user);
			res.status(200).send({"message" : "this is the message" });
			//res.send('hello', 55);
			//res.render('home', { user: req.user });
		});

		//function(req, res) {
			//console.log("why?");
			//res.render('home', { user: req.user });
		//});





// Routing
app.use('/', require('./routes'));

const port = process.env.PORT || 5001;
app.listen(port);

console.log('listening on port ' + port);
