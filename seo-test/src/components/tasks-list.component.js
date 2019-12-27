import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = props => (
    <tr>
        <td>{props.task.taskid}</td>
        <td>{props.task.description}</td>
        <td>{props.task.state}</td>
        <td>
        <a href="#" onClick={() => {props.changeState(props.task._id)}}>complete </a>| 
        <Link to={"/editTask/"+props.task._id}> edit</Link> | 
        <a href="#" onClick={() => {props.deleteTask(props.task._id)}}> delete</a>
        </td>
    </tr>
)

export default class TasksList extends Component {
    constructor(props) {
        super(props);

        this.changeState = this.changeState.bind(this);
        this.deleteTask = this.deleteTask.bind(this); 
    
        this.state = {tasks: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/tasks/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    tasks: res.data
                });
            })
            .catch(err => console.log(err));
    }

    deleteTask(id) {
        axios.delete('http://localhost:5000/tasks/' + id)
            .then(res => console.log(res.data));

        this.setState({
            tasks: this.state.tasks.filter(el => el._id !== id)
        })
    }

    changeState(id) {
        axios.get('http://localhost:5000/tasks/check/' + id)
            .then(res => {
                const task = {
                    taskid: res.data.taskid,
                    description: res.data.description,
                    state: res.data.state,
                    userid: res.data.userid
                }

                if (res.data.state === "Pending") {
                    task.state = "Completed";
                } else {
                    task.state = "Pending";
                }
                
                axios.post('http://localhost:5000/tasks/update/' + id, task)
                    .then(res => {
                        console.log(res.data)
                        window.location.reload();
                    });
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    tasksList() {
        return this.state.tasks.map(curTask => {
            return <Task task={curTask} changeState={this.changeState} deleteTask={this.deleteTask} key={curTask._id}/>;
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm">
                        <h3>Users>Tasks</h3>
                    </div>
                    <div className="col-">
                        <Link to="/" className="nav-link">Back</Link>
                    </div>
                    <div className="col-">
                        <Link to={"/newTask/" + this.props.match.params.id} className="nav-link">Create New Task</Link>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>State</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tasksList()}
                    </tbody>
                </table>
            </div>
        );
    }
}