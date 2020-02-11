import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Students from './Students'
import CreateStudent from './CreateStudent'
import Student from './Student'



const Router = (props) => {
  return (
 
    <Switch>
     
      <Route exact path = "/" render={() => <Students students = {props.students}/>}/>    
      <Route exact path = "/create" component = {CreateStudent} />
      <Route exact path = "/:id" render = {(routeProps) => <Student handleStudentDelete = {props.handleStudentDelete} history = {routeProps.history} match = {routeProps.match} />} />
    </Switch> 
  )  
}
//pass the props through router,return the component inside the callback funtion , render syntax,外面是route components，里面是Products component
export default Router;