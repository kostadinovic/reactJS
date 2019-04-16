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
    componentDidMount(){
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
            if (results.data.Connexion === "ok "  ||  results.data.Message === "Utilisateurs déja connecté") {
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

        return <div>
            <h1>Login</h1>
            <form onSubmit={this.onSubmit}>
                <input defaultValue="imaneB" type="text" name="login" placeholder="login" />
                <input defaultValue="123456789" type="password" name="password" placeholder="password" />
                <input type="submit" value="Connect" />
            </form>
        </div>

    }
}
export default LoginPage;