var express = require('express');
var router = express.Router();
const Student = require('../database/models/Student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/student', (req, res) => {
  const { first_name, last_name } = req.body;
  Student.create({first_name, last_name})
    .then(data => res.json(data))
    .catch(err => console.error(err))
  // (async () => {
  //   try {
  //     const newStudent = await Student.create({first_name, last_name})
  //     res.json(newStudent)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // })()
})

router.get('/student/:id', (req, res) => {
  const { id } = req.params
  Student.findById(id)
  .then(data => res.json(data))
  .catch(err => console.error(err))
})

router.get('/student', (req, res) => {
  Student.find()
    .then(data => res.json(data))
    .catch(err => console.error(err))
})

router.put('/student', (req, res) => {
  const { old_name, new_name } = req.body
  Student.updateMany({last_name: old_name}, {last_name: new_name})
    .then(data => res.json(data))
    .catch(err => console.error(err))
})

router.delete('/student/:id', (req, res) => {
  const { id } = req.params
  Student.findByIdAndDelete(id)
    .then(data => res.json(data))
    .catch(err => console.error(err))
})

router.delete('/student', (req, res) => {
  const { condition, value } = req.body
  Student.deleteMany({[condition]: value})
    .then(data => res.json(data))
    .catch(err => console.error(err))
})



module.exports = router;
