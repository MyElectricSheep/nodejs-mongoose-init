var express = require('express');
var router = express.Router();
const courseController = require('../controllers/courseController')

router.post('/', courseController.create_course)

module.exports = router;
