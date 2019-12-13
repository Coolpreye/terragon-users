import React, { Component } from 'react';
import axios from 'axios';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeProfession = this.onChangeProfession.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      password: '',
      profession: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.name),
            name: response.data[0].name
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeProfession(e) {
    this.setState({
      profession: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.name,
      password: this.state.password,
      profession: this.state.profession
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={this.onSubmit}>
      <div className="form-group"> 
          <label>Name: </label>
          <input type="text"
              required
              className="form-control"
              onChange={this.onChangeName}>
          </input>
        </div>
        <div className="form-group"> 
          <label>Password: </label>
          <input  type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
        </div>
        <div className="form-group"> 
          <label>Profession: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.profession}
              onChange={this.onChangeProfession}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Create New User" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}