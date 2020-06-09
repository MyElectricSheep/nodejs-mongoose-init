const Student = require('../database/models/Student')
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    const { email, password } = req.body
    let student = await Student.findOne({ email })
    if (!student) return res.status(400).send('Invalid request')
    const match = await bcrypt.compare(password, student.password)
    if (!match) return res.status(400).send('Invalid credentials')
    const token = student.createToken()
    res.set('x-authorization-token', token).send('Login was successfull')
}