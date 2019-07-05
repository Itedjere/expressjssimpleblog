module.exports = (req, res, next) => {
	const { username, title, description, content } = req.body;

	if (!req.files && username == '' && title == '' && description == '' && content == '') {
		res.redirect('/post/new');
	} else {
		next();
	}
	
}