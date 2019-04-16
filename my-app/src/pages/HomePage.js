import React, { Component } from 'react';
import { Link } from "react-router-dom";


class HomePage extends Component {

    render() {
        return (
            <div>
            <h1>Twister</h1>
                    <Link to="/login">Login</Link> <Link to="/sign-up">Sign up</Link>
            </div>)


    }
}

export default HomePage;



