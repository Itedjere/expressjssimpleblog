module.exports = (req, res) => {
	console.log(req.flash('loginError'));
	res.render('login');
}