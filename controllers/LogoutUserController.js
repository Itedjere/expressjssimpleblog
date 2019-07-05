module.exports = (req, res) => {
	//destroy session
	req.session.destroy(() => {
		res.redirect('/');
	});
	
}