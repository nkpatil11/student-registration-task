const path = require('path');
module.exports = function (app) {

	// -------------- Routes ------------------
	app.use('/api/users', require('./manageUser'));
	app.use('/api/students', require('./manageStudent'));
	// application -------------------------------------------------------------

	app.use('/*', (req, res) => {
		res.status(404)
			.json({ statusCode: 404, success: false, message: 'Invalid api url' });
	});
};
