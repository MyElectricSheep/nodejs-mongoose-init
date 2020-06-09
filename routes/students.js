var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentController')
const authorizeStudent = require('../middlewares/authorizeStudent')

// Create
router.post('/', studentController.create_student)

// Find
router.get('/:id', studentController.find_student)

// List
router.get('/', authorizeStudent, studentController.list_students)

// Update
router.put('/', studentController.update_student)

// Delete one
router.delete('/:id', studentController.delete_student)

// Delete many
router.delete('/', studentController.delete_students)

module.exports = router;
