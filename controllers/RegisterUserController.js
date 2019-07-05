module.exports = (req, res) => {
	//console.log('errors', req.flash('registrationErrors'));
	//console.log(req.flash('data'));
	res.render('register_user', {
		errors: req.flash('registrationErrors'),
		data: req.flash('data')[0]
	});
}