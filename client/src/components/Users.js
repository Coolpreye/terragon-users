import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.password}</td>
    <td>{props.user.profession}</td>
    <td>
      <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
    </td>
  </tr>
)

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this)

    this.state = {users: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteUser(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      users: this.state.users.filter(el => el._id !== id)
    })
  }

  userList() {
    return this.state.users.map(currentUser => {
      return <User user={currentUser} deleteUser={this.deleteUser} key={currentUser._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>password</th>
              <th>Profession</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
      </div>
    )
  }
}