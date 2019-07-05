const mongoose = require("mongoose");

const connect = {
	db: null
}

const connection = (cb) => {
	mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true}, function(err) {
		if (err) {
			//exit the script
			cb(err);
			process.exit(1);
		} else {
			cb();
			connect.db = true;
		}
	})
}

const getDbConn = () => {
	return connect.db;
}

module.exports = { connection, getDbConn }