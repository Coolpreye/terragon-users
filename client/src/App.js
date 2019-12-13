import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";


import Navbar from './components/Navbar';
import EditUser from './components/EditUser';
import CreateUser from './components/CreateUser';
import Users from './components/Users'

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Navbar />
                    <br />
                    <Route path="/" exact component={Users} />
                    <Route path="/edit/:id" component={EditUser} />
                    <Route path="/user" component={CreateUser} />
                </div>
            </Router>
        )
    }
}
