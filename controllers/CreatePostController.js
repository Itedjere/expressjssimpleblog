const path = require('path');
//require mongodb
const blog = require('../models/BlogModel.js');

module.exports = (req, res) => {

	if (Object.keys(req.files).length == 0) {
		return res.status(400).send('No files were uploaded.');
	}
	//console.log(req.files);

	//The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.image;
	let post = req.body;

	console.log(path.join(__dirname, `../public/img/posts/${sampleFile.name}`));

	// Use the mv() method to place the file somewhere on your server
	sampleFile.mv(path.join(__dirname, `../public/img/posts/${sampleFile.name}`), function(err) {

		if (err) {
			return res.status(500).send(err);
		}

		blog.getModel().create({...req.body, image: `/img/posts/${sampleFile.name}`, userId: req.session._id}, (err, result) => {
			console.log(err, result);
			if (err) {
				console.log(err);
			} else {
				res.redirect('/');
			}
		});
	});

	
	
}