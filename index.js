const express = require('express');
const bodyParser = require('body-parser');
const edge = require('edge.js');
const expressEdge = require('express-edge');
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

//require mongodb
const db = require('./models/connectdb.js');

const app = new express();


//app session
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(flash());


// default options
app.use(fileUpload());

//set the static path
app.use(express.static('public'));

// Automatically sets view engine and adds dot notation to app.render
app.use(expressEdge);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//custom middlewares
const validatePost = require('./middleware/StorePostMiddleware.js');
const authUser = require('./middleware/AuthUserMiddleware.js');
const isUserLoggedIn = require('./middleware/IsUserLoggedInMiddleware.js');

app.use('*', (req, res, next) => {
	//console.log(req.session._id);
	edge.global('loggedin', req.session._id);

	next();
})


//Controllers
const newPostController = require('./controllers/NewPostController.js');
const homePageController = require('./controllers/HomePageController.js');
const createPostController = require('./controllers/CreatePostController.js');
const singlePostController = require('./controllers/SinglePostController.js');
const registerUserController = require('./controllers/RegisterUserController.js');
const authUserController = require('./controllers/AuthUserController.js');
const loginUserController = require('./controllers/LoginUserController.js');
const authLoginController = require('./controllers/AuthLoginController.js');
const logoutUserController = require('./controllers/LogoutUserController.js');


app.get('/', homePageController);

app.get('/post/new', authUser, newPostController);

app.post('/post/create', authUser, validatePost, createPostController);

app.get('/post/:id', singlePostController);

app.get('/register/user', isUserLoggedIn, registerUserController);

app.post('/auth/user', isUserLoggedIn, authUserController);

app.get('/login/user', isUserLoggedIn, loginUserController);

app.post('/auth/login', isUserLoggedIn, authLoginController);

app.get('/logout', logoutUserController);


db.connection((err) => {
	if (err) {
		console.log(err);
	} else {
		app.listen(3000, () => {
			console.log('App Running On Port 3000');
		});
	}
})