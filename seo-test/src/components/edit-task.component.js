import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditTask extends Component {
    constructor(props) {
        super(props);

        this.onChangeTaskid = this.onChangeTaskid.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            taskid: '',
            description: '',
            state: '',
            userid: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/tasks/check/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    taskid: res.data.taskid,
                    description: res.data.description,
                    state: res.data.state,
                    userid: res.data.userid
                })
            })
            .catch(function(err) {
                console.log(err);
            });
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
            state: this.state.state,
            userid: this.state.userid
        }
        console.log(task);

        axios.post('http://localhost:5000/tasks/update/' + this.props.match.params.id, task)
            .then(res => console.log(res.data));

        window.location = '/tasks/' + this;
    }

    getUserID() {
        return this.state.userid;
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm">
                        <h3>Users>Tasks>Edit Task</h3>
                    </div>
                    <div className="col-">
                        <Link to={"/tasks/" + this.getUserID()} className="nav-link">Back</Link>
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
                        <input type="submit" value="Update Task" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}