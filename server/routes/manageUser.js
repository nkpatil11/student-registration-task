const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const validator = require('../common/validators/user.validator');
const auth = require('../common/auth/auth.service');
const common = require('../common/common');

// User signup
router.post('/signup', common.upload.any(), validator.userValidator, controller.userSignup);

// User login
router.post('/login', controller.userLogin);

// User validate by token
router.post('/validate', auth.isAuthenticated(), controller.validateUser);

module.exports = router;
