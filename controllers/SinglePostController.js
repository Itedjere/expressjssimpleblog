//require mongodb
const blog = require('../models/BlogModel.js');
const user = require('../models/UserModel.js');

module.exports = (req, res) => {
	const id = req.params.id;
	blog.getModel().findById(id).exec((err, post) => {
		
		let userId = post.userId;
		//console.log(userId);
		//grab the username from the user collection
		user.getModel().findById(userId, 'username').exec((err, user) => {
			if (err) {
				console.log(err);
			} else {
				res.render('post', {post, username: user.username});
			}

		});

		
	});
	
}