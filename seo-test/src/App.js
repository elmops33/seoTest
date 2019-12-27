import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import UsersList from "./components/users-list.component";
import TasksList from "./components/tasks-list.component"; 
import CreateUser from "./components/create-user.component";
import EditUser from "./components/edit-user.component";
import CreateTask from "./components/create-task.component";
import EditTask from "./components/edit-task.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <div className="container">
        <Route path="/" exact component={UsersList} />
        <Route path="/edit/:id" component={EditUser} />
        <Route path="/newUser" component={CreateUser} />
        <Route path="/tasks/:id" component={TasksList} />
        <Route path="/newTask/:id" component={CreateTask} />
        <Route path="/editTask/:id" component={EditTask} />
      </div>
    </Router>
  );
}

export default App;
