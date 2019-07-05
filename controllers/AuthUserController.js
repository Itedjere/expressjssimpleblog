const user = require('../models/UserModel.js');

module.exports = (req, res) => {
	let aUser = req.body;
	//console.log(aUser);
	user.getModel().create(aUser, (err, result) => {
		//console.log(err, result);
		if (err) {
			//console.log(Object.keys(err.errors).map(key => err.errors[key].message));
			const registrationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
			//console.log(registrationErrors);
			req.flash('registrationErrors', registrationErrors);
			req.flash('data', aUser);
			res.redirect('/register/user');
		} else {
			res.redirect('/');
		}

		//console.log(result);
		
	})
}