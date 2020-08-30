const User = require('../../models/user.model');

exports.userValidator = async (req, res, next) => {
	req.checkBody({
		firstName: {
			notEmpty: true,
			errorMessage: 'First Name Required',
		},
		lastName: {
			notEmpty: true,
			errorMessage: 'Last Name Required',
		},
		email: {
			isEmail: true,
			notEmpty: true,
			errorMessage: 'Email Address Required',
		},
		password: {
			notEmpty: true,
			errorMessage: 'Password Required',
		},
	});
	const error = req.validationErrors();
	if (error) {
		res.status(400).send({
			status: 400,
			message: 'respond from signup user - bad request',
			validationErrors: error,
		});
	} else {
		let userExist = await User.find({ email: req.body.email });
		if (userExist.length > 0) {
			res.status(409).send({
				statusCode: 409,
				message: "Provided email id is already in used by another user.",
				success: false,
			});
		} else {
			next();
		}
	}
};
