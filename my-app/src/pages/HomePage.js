
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Img from 'react-image';


class HomePage extends Component {

    render() {
        return <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Twister</h1>
                <p className="lead">Not the KFC one...</p>
                <Link className="btn btn-primary" to="/login">Login</Link> <Link to="/sign-up" className="btn btn-primary">Sign up</Link>
            </div>
        </div>

    }
}

export default HomePage;