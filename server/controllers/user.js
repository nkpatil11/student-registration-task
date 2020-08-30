const User = require('../models/user.model');
const auth = require('../common/auth/auth.service');
const common = require('../common/common');

exports.userSignup = async (req, res, next) => {
	try {
		req.body.hashedPassword = common.encryptPassword(req.body.password);
		req.body.name = req.body.firstName + ' ' + req.body.lastName;

		const newUser = new User(req.body);
		await User.create(newUser);

		return res.status(200).json({
			statusCode: 200,
			success: true,
			message: 'Thank you for Signing Up.',
		});

	} catch (error) {
		common.logger(error);
	}
};

exports.userLogin = async (req, res, next) => {
	try {
		const result = await User.find({ email: req.body.email });

		if (result.length > 0) {
			const user = result[0];
			let match = common.authenticate(req.body.password, user.hashedPassword);
			if (match) {
				user.hashedPassword = undefined;
				delete user.resetPasswordToken;
				delete user.resetPasswordExpires;
				delete user.__v;

				const token = auth.signToken(user);
				return res.status(200).json({
					statusCode: 200,
					success: true,
					token: token,
					data: user,
				});
			} else {
				return res.status(401).json({
					statusCode: 401,
					success: false,
					message: 'Invalid email or password.',
				});
			}
		} else {
			return res.status(401).json({
				statusCode: 401,
				success: false,
				message: 'Provided email id is not registered with us.',
			});
		}
	} catch (error) {
		common.logger(error);
	}
};

exports.validateUser = async (req, res, next) => {
	try {
		const data = await User.find({ _id: req.user.userId });
		if (data.length > 0) {
			const user = data[0];

			user.hashedPassword = undefined;
			delete user.resetPasswordToken;
			delete user.resetPasswordExpires;
			delete user.__v;

			return res.status(200).json({
				statusCode: 200,
				success: true,
				data: user,
			});
		} else {
			return res.status(401).json({
				statusCode: 401,
				success: false,
				message: 'Please login to continue.',
			});
		}
	} catch (error) {
		common.logger(error);
	}
};
