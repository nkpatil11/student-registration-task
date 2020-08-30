const _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
	env: process.env.NODE_ENV,

	// Server port
	port: process.env.PORT || 3005,

	// Secret for session, you will want to change this and make it an environment variable
	secrets: {
		session: 'task-secret',
	},

	// MongoDB connection options
	mongo: {
		options: {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		},
	},

	expires: {
		expiresIn: '5m',
	},
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
	all,
	require('./' + process.env.NODE_ENV + '.js') || {}
);
