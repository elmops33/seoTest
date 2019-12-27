import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.userid}</td>
        <td>{props.user.username}</td>
        <td>
        <Link to={"/tasks/"+props.user._id}>tasks</Link> | <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => {props.deleteUser(props.user._id)}}>delete</a>
        </td>
    </tr>
)

export default class UsersList extends Component {
    constructor(props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this); 
    
        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                this.setState({
                    users: res.data
                });
            })
            .catch(err => console.log(err));
    }

    deleteUser(id) {
        axios.delete('http://localhost:5000/users/' + id)
            .then(res => console.log(res.data));

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    usersList() {
        return this.state.users.map(curUser => {
            return <User user={curUser} deleteUser={this.deleteUser} key={curUser._id}/>;
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm">
                        <h3>Users</h3>
                    </div>
                    <div className="col-">
                        <Link to="/newUser" className="nav-link">Create New User</Link>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.usersList()}
                    </tbody>
                </table>
            </div>
        );
    }
}