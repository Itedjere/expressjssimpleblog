//require mongodb
const blog = require('../models/BlogModel.js');

module.exports = (req, res) => {
	//console.log(req.session);
	blog.getModel().find({}).sort({ date: -1 }).exec((err, posts) => {
		//res.json(posts);
		//console.log(posts);
		res.render('index', { posts });
	})
}