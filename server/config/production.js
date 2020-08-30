// Production specific configuration
// =================================
module.exports = {
	// Server IP
	ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,

	// Server port
	port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 4001,

	// MongoDB connection options
	mongo: {
		url:
			process.env.MONGOLAB_URI ||
			process.env.MONGOHQ_URL ||
			process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
			'mongodb://localhost/task-db-prod',
	},
	clientOrigin: {
		ip: 'http://localhost'
	},
	seedDB: true,
};
