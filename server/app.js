const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('./queries/queries');
const isAuthenticated = require('./routes/helpers');


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



// TODO: use this, or something like it, for hashing passwords
//const bcrypt = require('bcrypt')



// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
	function(username, password, cb) {
		console.log("whoo");
		return db.getUserByUserName(username)
			.then(function(user, err) {
				// NOTE: currently doesn't ever return err

				if (err) { return cb(err); }
				if (!user) { return cb(null, false); }

				// Also, we should add password checking. Currently that's disabled
				//if (user.password != password) { return cb(null, false); }
				return cb(null, user);
			})
		.catch(function(error) {
			// couldn't find anybody (or something went wrong, generally), probably. Return false
			console.log("uh");
			console.log(error);
			return cb(null, false);
		});
	}));




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

passport.deserializeUser(function(id, done) {
	console.log("deserializing");
	db.getUser(id)
		.then(function(user) {
			console.log("By god! IT WORkED!");
			console.log(id);
			console.log(user);
			done(null, user);
		})
	.catch(function(error) {
		console.log("TODO: this");
		done(null, null);
	});
});


// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.

// TODO: what is this?
//app.use(express.static("public"));
//app.use(require('morgan')('combined'));


app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());



// login routing
//app.use(flash());
app.post('/auth/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/FAILURE', // TODO: make better/work
	//failureFlash: true
}));


// Routing
app.use('/', require('./routes'));

const port = process.env.PORT || 5001;
app.listen(port);

console.log('listening on port ' + port);

