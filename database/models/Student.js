const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    first_name: {type: String, min: 2, max: 50, required: true},
    last_name: {type: String, min: 2, max: 50, required: true},
    course: {type: Schema.Types.ObjectId, ref: 'Course', required: true},
    email: {type: String, min: 8, max: 100, required: true, unique: true},
    password: { type: String, required: true},
    last_updated: {type: Date, default: Date.now },
})

studentSchema.methods.createToken = function () {
    const payload = { _id: this._id, email: this.email }
    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign(payload, secretKey)
    return token
}

const Student = mongoose.model('Student', studentSchema)

module.exports = Student