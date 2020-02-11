import React from 'react';
import axios from 'axios';


class Student extends React.Component {     //  有render的必定是class component
  state = { student : null }

  async componentDidMount() {
    const student = await axios.get(`http://localhost:5000/students/${this.props.match.params.id}`)
    this.setState({
      student : student.data
    })
}

  onButtonClick = (e) => {
    this.props.handleStudentDelete(this.props.match.params.id, this.props.history)
  }
  
  render() {
    const student = this.state.student
    return student ? (
        <div className = "student">
          <>{student.studentID}</> 
          <>{student.studentName}</>
          <>{student.studentEnrolDate}</>
          <button onClick= {this.onButtonClick}>Delete</button>
        </div>
      )
     :
    (<h2>there no such a student</h2>)
  } // pass students as props
}

export default Student;