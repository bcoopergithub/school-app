const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentID: Number,
  studentName: String,
  studentEnrolDate: Date
}, 
{
  timestamps: true
}
)


module.exports = mongoose.model('Student', studentSchema)