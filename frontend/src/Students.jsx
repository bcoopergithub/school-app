import React from 'react';
import {Link} from 'react-router-dom'

const Students = (props) => {   // 输出的可以随便取名
           // import props from component Router
  return props.students.map(
    (student,index) => {
      return (
        <Link to={`/${student._id}`} key = {index}>

        <div className = "students">
          <div className = "id">student ID: {student.studentID}</div>
          <div className = "name">student Name: {student.studentName}</div>
          <div className = "enrol">student Enrol Time: {student.studentEnrolDate}</div>
        </div>
        </Link>

      )
    }
  ) 



}

export default Students