const crypto = require('crypto');
const bcrypt = require('bcrypt');
const colors = require('colors');
const config = require('../config');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

exports.encryptPassword = password => {
	return bcrypt.hashSync(password, 10);
};

exports.authenticate = (plainText, hash) => {
	return bcrypt.compareSync(plainText, hash);
};

exports.encryptString = string => {
	const cipher = crypto.createCipher('aes-256-cbc', 'd6F3Efeq');
	let crypted = cipher.update(string, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
};

exports.decryptString = string => {
	const decipher = crypto.createDecipher('aes-256-cbc', 'd6F3Efeq');
	let dec = decipher.update(string, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
};

exports.logger = data => {
	if (config.env !== 'production') {
		console.log(colors.black.red('LOG: ---------------------------'));
		console.log(colors.white.bgBlack('LOG: Common -> logger -> ', data));
		console.log(colors.black.red('LOG: ---------------------------'));
	}
};


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/');
	},
	filename: (req, file, cb) => {
		const newName = file.originalname.slice(0, 20);
		const filename =
			path.parse(newName).name +
			'-' +
			Date.now() +
			path.parse(file.originalname).ext;
		cb(null, filename);
	},
});

exports.upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 25,
	},
});

exports.unlinkFile = async filename => {
	let photoExist = path.join(__dirname + '/../uploads/' + filename);
	if (fs.existsSync(photoExist)) {
		fs.unlinkSync(photoExist);
	}
};

exports.createFileUrl = (req, filename) => {
	if (process.env.NODE_ENV == 'development') {
		return (
			req.protocol + '://' + req.headers.host + '/api/files/uploads/' + filename
		);
	} else {
		return '/api/files/uploads/' + filename;
	}
};
