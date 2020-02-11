import React from 'react';
import axios from 'axios';

class CreateStudents extends React.Component {
  state = { errors: null }

  inputChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  
  formSubmit = async (e) => {
    e.preventDefault()  //阻止每次都刷新
    const { studentID, studentName, studentEnrolDate } = this.state
    const data = {
      studentID, 
      studentName,
      studentEnrolDate
    }
    try{
      const response = await axios.post("http://localhost:5000/students", data)
      console.log(response.data)
    } catch(err){ 
      const errorArray = err.response.data
      this.setState({
        errors: errorArray
      })
    }
  }

  handleErrors = () => {
    return this.state.errors.map((error,index) => {
      return (
        <div key = {index}>
          <p>{error.message}</p>
        </div>
      ) 
    })
    
  }
    
  render(){
    return (
      <div className = "form">
        <form onSubmit={this.formSubmit}>
          <label>Student ID</label>
          <input type="number" name="studentID" id= "id" onChange={this.inputChange} />
          <hr></hr>
          <label>Student Name</label>
          <input type="text" name="studentName" id= "name" onChange={this.inputChange}/>
          <hr></hr>
          <label>Student Enrol Date</label>
          <input type="date" name="studentEnrolDate" id= "studentEnrolDate" onChange={this.inputChange} />
          <input type="submit" value="Submit" />
        </form>
        {this.state.errors ? this.handleErrors() : null}
      </div>
      )
  }


  
  
  
}

export default CreateStudents