module.exports = (req, res) => {
	if (req.session._id) {
		res.render('create_post');
	} else {
		res.redirect('/login/user');
	}
}