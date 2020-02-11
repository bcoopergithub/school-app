// set up router的分支
const express = require('express');
const router = express.Router(); // create a router
const Student = require('../models/Student')// import Model from Student.js;
const Joi = require('@hapi/joi')

router.get('/', async (req, res) => { // app全换成router
  try {
    const students = await Student.find()
    res.send(students)
    // res.send('helloooo')
  } catch(err) {
    res.status(500).send(err)
    }
})

const validationSchema = Joi.object().keys({
  studentID: Joi.number().required(),
  studentName: Joi.string().required(),
  studentEnrolDate: Joi.string().required()
})

const validate = (req, res, next) => {
  const result = validationSchema.validate(req.body, {abortEarly: false})
  if (result.error) {
    res.status(500).send(result.error.details)
  } else {
    next()
  }
}

router.post('/', express.json(), validate, async (req, res) => {
  try {
    // add validation for the req.body to prevent error
    // you could use joi for that
    const {studentID, studentName, studentEnrolDate} = req.body
    const date = new Date(studentEnrolDate)
    const student = new Student({
      studentID: studentID,
      studentName: studentName,
      studentEnrolDate: date
    })
    const newStudent = await student.save()
    res.send(newStudent);
  } catch(err) {
    res.status(500).send(err.message)
  }
})

router.put('/update/:id', async (req, res,next) => {

  try {
    const {id} = req.params
    const student = {studentID : req.body.studentID,
    studentName: req.body.studentName,
    studentEnrolDate: req.body.studentEnrolDate}

    await Student.findByIdAndUpdate( id, {$set:student}, {new:true} )
      console.log("update student")
    res.send(student)
  }catch(err) {
        res.send(500).send(err)
      }
})


router.delete('/all', async (req, res) => {
  try {
    await Student.deleteMany()
    res.send('all students removed')
  } catch(err) {
    console.log('here')
    res.status(500).send(err.message)
  }
})

router.delete('/:id' , async(req, res) => {
try {
  const { id } = req.params
  let student = await Student.findByIdAndRemove(id)
  res.send({message : "student deleted successful"})
  } catch(err) {
    res.status(500).send(err) 
  }
})

router.get('/:id', async (req,res) => {
  try { 
    const {id} = req.params
    const student = await Student.findById(id).limit(1) // Model
   res.send(student)
 }
 catch(err){
   res.status(500).send('err')
 }
 })

module.exports = router;

