const bcrypt = require('bcrypt');
const user = require('../models/UserModel.js');

module.exports = (req, res) => {
	const { email, password } = req.body;
	//check if email is in the database
	user.getModel().findOne({email}, (err, user) => {
		//console.log(err, user);
		if (!err && !user) {
			return res.redirect('/login/user');
		}
		//check for the user password
		bcrypt.compare(password, user.password, function(error, result) {
		    if (!result) {
		    	return res.redirect('/login/user');
		    }
		    //if password is correct
		    //add the user id to the session
		    req.session._id = user._id;
		    res.redirect('/');
		});
	});
}