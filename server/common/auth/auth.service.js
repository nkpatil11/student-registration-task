const config = require('../../config');
const jwt = require('jsonwebtoken');
const compose = require('composable-middleware');

exports.isAuthenticated = () => {
	return compose().use((req, res, next) => {
		if (req.headers.authorization) {
			jwt.verify(
				req.headers.authorization,
				config.secrets.session,
				(err, user) => {
					if (err) {
						return res.status(403).json({
							statusCode: 403,
							success: false,
							message:
								'Your session has been expired, please log in to continue.',
						});
					} else {
						req.user = user;
						next();
					}
				}
			);
		} else {
			return res.status(403).json({
				statusCode: 403,
				success: false,
				message: 'Your session has been expired, please log in to continue.',
			});
		}
	});
};

exports.isAuthorized = () => {
	return compose().use(isAuthenticated());
};

exports.signToken = user => {
	const payload = {
		name: user.name,
		email: user.email,
		userId: user._id,
	};
	return jwt.sign(payload, config.secrets.session, config.expires);
};
