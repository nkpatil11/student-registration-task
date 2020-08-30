const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for student

let StudentSchema = new Schema({
	userId: Schema.Types.ObjectId,
	firstName: String,
	lastName: String,
	fatherName: String,
	email: { type: String, lowercase: true },
	address: String,
	mobileNo: String,
	gender: String,
	birthday: Date,
	country: String,
	profileImage: String,
	files: [{
		image: String
	}],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', StudentSchema);
