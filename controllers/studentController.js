const Student = require('../database/models/Student')

exports.list_students = (req, res) => {
    Student.find().populate('course')
    .then(data => res.json(data))
    .catch(err => console.error(err))
}

exports.find_student = (req, res) => {
    const { id } = req.params
    Student.findById(id)
    .then(data => res.json(data))
    .catch(err => console.error(err))
}

exports.create_student = (req, res) => {
    const { first_name, last_name, course } = req.body;
    Student.create({first_name, last_name, course})
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
}

exports.update_student = (req, res) => {
    const { old_name, new_name } = req.body
    Student.updateMany({last_name: old_name}, {last_name: new_name})
      .then(data => res.json(data))
      .catch(err => console.error(err))
}

exports.delete_student = (req, res) => {
    const { id } = req.params
    Student.findByIdAndDelete(id)
      .then(data => res.json(data))
      .catch(err => console.error(err))
}

exports.delete_students = (req, res) => {
    const { condition, value } = req.body
    Student.deleteMany({[condition]: value})
      .then(data => res.json(data))
      .catch(err => console.error(err))
}