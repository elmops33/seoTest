import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateTask extends Component {
    constructor(props) {
        super(props);

        this.onChangeTaskid = this.onChangeTaskid.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            taskid: '',
            description: '',
            state: 'Pending',
            userid: ''
        }
    }

    onChangeTaskid(e) {
        this.setState({
            taskid: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const task = {
            taskid: this.state.taskid,
            description: this.state.description,
            state: this.state.state
        }
        console.log(task);

        axios.post('http://localhost:5000/tasks/add/' + this.props.match.params.id, task)
            .then(res => console.log(res.data));

        window.location = '/tasks/' + this.props.match.params.id;
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm">
                        <h3>Users>Tasks>Create New Task</h3>
                    </div>
                    <div className="col-">
                        <Link to={"/tasks/" + this.props.match.params.id} className="nav-link">Back</Link>
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Task ID</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.taskid}
                            onChange={this.onChangeTaskid}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Task" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}