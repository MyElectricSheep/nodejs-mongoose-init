const Student = require('../database/models/Student')
const bcrypt = require('bcrypt')

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

exports.create_student = async (req, res) => {
    const { first_name, last_name, course, email, password } = req.body;

    let student = await Student.findOne({ email })
    if (student) return res.status(400).send('This student already exists')

    // Student.create({first_name, last_name, course, email, password })
    //   .then(data => res.json(data))
    //   .catch(err => console.error(err))

    student = new Student({ first_name, last_name, course, email, password: await bcrypt.hash(password, 10) })

    await student.save()

    const token = student.createToken()

    res.set('x-authorization-token', token).json({
      _id: student._id,
      email: student.email
    })
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