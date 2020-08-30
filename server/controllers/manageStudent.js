const Student = require('../models/student.model');
const common = require('../common/common');
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectID;
const moment = require('moment');

exports.createStudent = async (req, res, next) => {
	try {
		console.log('body ', req.body);
		console.log('files ', req.files);
		if (req.files.length > 0) {
			const profileImage = req.files.find(file => file.fieldname === 'profileImage');
			if (profileImage) {
				req.body.profileImage = profileImage.filename;
			}
		}
		req.body.userId = req.user.userId;
		const newStudent = new Student(req.body);
		const result = await Student.create(newStudent);
		return res.status(200).json({
			statusCode: 200,
			success: true,
			data: result,
			message: 'Student created successfully.',
		});
	} catch (error) {
		common.logger(error);
	}
};

exports.updateStudent = async (req, res, next) => {
	try {
		let studentData = await Student.find({ userId: req.user.userId, _id: req.body.studentId });
		if (studentData.length > 0) {
			req.body.updatedAt = new Date();
			if (req.files.length > 0) {
				const profileImage = req.files.find(
					file => file.fieldname === 'profileImage'
				);
				if (profileImage) {
					if (studentData[0].profileImage) {
						common.unlinkFile(studentData[0].profileImage);
					}
					req.body.profileImage = profileImage.filename;
				}
			} else {
				delete req.body.profileImage
			}

			await Student.updateOne(
				{ userId: req.user.userId, _id: req.body.studentId },
				{ $set: req.body },
				{ new: true }
			);
			return res.status(200).json({
				statusCode: 200,
				success: true,
				message: 'Student Details updated successfully.',
			});
		} else {
			return res.status(404).json({
				statusCode: 404,
				success: false,
				data: [],
				message: 'Student Details not found.',
			});
		}
	} catch (error) {
		common.logger(error);
	}
};

exports.getAllStudents = async (req, res, next) => {
	try {
		let sort = { createdAt: -1 };

		let query = { userId: ObjectId(req.user.userId) };

		const result = await Student.aggregate([
			{ $match: query },
			{ $sort: sort },
		]);

		if (result.length > 0) {
			for (let i = 0; i < result.length; i++) {
				let student = result[i];
				if (student.profileImage) {
					student.profileImageUrl = common.createFileUrl(req, student.profileImage);
				}
			}
		}
		if (result.length > 0) {
			return res.status(200).json({
				statusCode: 200,
				success: true,
				data: result,
				message: 'Student list found successfully.',
			});
		} else {
			return res.status(404).json({
				statusCode: 404,
				success: false,
				data: [],
				message: 'Student list not found.',
			});
		}
	} catch (error) {
		common.logger(error);
	}
};

exports.getStudentDetails = async (req, res, next) => {
	try {
		let query = {
			_id: ObjectId(req.query.studentId),
			userId: ObjectId(req.user.userId),
		};
		const result = await Student.aggregate([{ $match: query }]);
		if (result.length > 0) {
			if (result[0].profileImage) {
				result[0].profileImageUrl = common.createFileUrl(
					req,
					result[0].profileImage
				);
			}

			return res.status(200).json({
				statusCode: 200,
				success: true,
				data: result,
				message: 'Student Details found successfully.',
			});
		} else {
			return res.status(404).json({
				statusCode: 404,
				success: false,
				data: [],
				message: 'Student Details not found.',
			});
		}
	} catch (error) {
		common.logger(error);
	}
};

exports.removeStudent = async (req, res, next) => {
	try {
		console.log(req.body);
		let result = await Student.deleteOne({ _id: req.body.studentId });

		console.log('result ', result);
		return res.status(200).json({
			statusCode: 200,
			success: true,
			message: 'Student deleted successfully.',
		});
	} catch (error) {
		common.logger(error);
	}
};
