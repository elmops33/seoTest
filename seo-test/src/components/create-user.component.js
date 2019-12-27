import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeUserid = this.onChangeUserid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userid: '',
            username: ""
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeUserid(e) {
        this.setState({
            userid: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            userid: this.state.userid
        }
        console.log(user);

        axios.post('http://localhost:5000/users/add/', user)
            .then(res => console.log(res.data));

        window.location = '/';
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm">
                        <h3>Users>Create New User</h3>
                    </div>
                    <div className="col-">
                        <Link to="/" className="nav-link">Back</Link>
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User ID</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.userid}
                            onChange={this.onChangeUserid}
                        />
                    </div>
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}