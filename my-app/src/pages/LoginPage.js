import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AxiosActions from '../services/AxiosActions';
import UserServices from '../services/UserServices';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }
    componentDidMount() {
        localStorage.clear();
    }
    onSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let login = data.get('login');
        let password = data.get('password');
        let obj = {
            password: password,
            login: login
        }

        AxiosActions.getUsers(obj).then((results) => {
            if (results.data.Connexion === "ok " || results.data.Message === "Utilisateurs déja connecté") {
                UserServices.setUser(results.data)
                this.setState({
                    redirect: true
                })
            }
        })
    }
    render() {

        if (this.state.redirect)
            return <Redirect to="/feed" />

        return <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Twister</h1>
                <p className="lead">Not the KFC one...</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row align-items-center">
                        <div className="col-sm-3 my-1">
                            <label className="sr-only" for="login">Login</label>
                            <input defaultValue="imaneB" id="login" className="form-control" name="login" placeholder="login" />
                        </div>
                        <div className="col-sm-3 my-1">
                            <label className="sr-only" for="login">Password</label>
                            <input className="form-control" defaultValue="123456789" type="password" name="password" placeholder="password" />
                        </div>
                        <div class="col-auto my-1">
                            <button type="submit" class="btn btn-primary">Connect</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    }
}
export default LoginPage;