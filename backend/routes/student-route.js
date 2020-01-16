// set up router的分支
const express = require('express');
const router = express.Router(); // create a router
const Student = require('../models/Student')// import Model from Student.js;

router.get('/', async (req, res) => { // app全换成router
  try {
    const students = await Student.find().limit(20)
    res.send(students)
  } catch(err) {
    res.status(500).send(err)
    }
})

router.post('/', async (req, res) => {
  try {
    const {studentID, studentName, studentEnrolDate} = req.body

    const date = new Date(studentEnrolDate)
    const student = await new Student({
      studentID: studentID,
      studentName: studentName,
      studentEnrolDate: date
    })
    const result = await student.save()
    res.send(result);
  } catch(err) {
    res.status(500).send(err)
    }
})

router.put('/update/:id', async (req, res) => {

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
    console.log('heeereee')
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
  res.send(student)
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

