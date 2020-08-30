const express = require('express');
const router = express.Router();
const controller = require('../controllers/manageStudent');
const auth = require('../common/auth/auth.service');
const common = require('../common/common');

// Create student
router.post('/save', auth.isAuthenticated(), common.upload.any(), controller.createStudent);

// Update student details
router.post('/update', auth.isAuthenticated(), common.upload.any(), controller.updateStudent);

// Get all students
router.get('/getAllStudents', auth.isAuthenticated(), controller.getAllStudents);

// Get student details
router.get('/getStudentDetails', auth.isAuthenticated(), controller.getStudentDetails);

// Remove student
router.post('/remove', auth.isAuthenticated(), controller.removeStudent);

module.exports = router;
