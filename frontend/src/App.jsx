import React from 'react';
import Router from './Router'
import './global.css';
import axios from 'axios';
// import CreateStudent from './CreateStudent'

class App extends React.Component {     //  有render的必定是class component
  
  state = { students : null }
 
  handleStudentDelete = async(id, history) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/students/${id}`) // important
    this.setState((prevState) => ({
      students: prevState.students.filter((student) => (id !== student._id))
    }) , () => {
        history.push("/")
     }
     )
  }
  
  async componentDidMount() {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/students`)
    const students = await response.json()
    this.setState({
      students
    })
  }
  
  paragraphStyles = () => {
    return {
      color:"black", 
      fontSize:"2em"
    }
  }

  render() {
    console.log(process.env.DREACT_APP_BACKEND_URL)
    return (  
    <div className = "students-all">
  
      <div className = "navbar">
        <a className = "active" href= "http://localhost:3000/">Home</a>
        <a href="#Educator">Educator</a>
        <a href="#Student">Student</a>
        <a href="#about">About</a>
      </div>

      <div className = "studentsaaa">
        {this.state.students ? <Router students = {this.state.students} handleStudentDelete ={this.handleStudentDelete}  /> : null}
        <div className = "createStudent">
      <form action="http://localhost:3000/create">
    <input type="submit" value="Create a Student" />
</form>
      </div>
      </div>
    </div>
    )
  } // pass students as props
}

export default App;
// style = {this.paragraphStyles()}

