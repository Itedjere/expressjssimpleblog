const user = require('../models/UserModel.js');

module.exports = (req, res, next) => {
	user.getModel().findById(req.session._id, (error, user) => {
		//console.log(error, user);
		if (error || !user) {
			return res.redirect('/')
		}

		next();
	});
}