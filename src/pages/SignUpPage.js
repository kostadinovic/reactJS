import React, { Component } from 'react';
import AxiosActions from '../services/AxiosActions';
import { Redirect } from 'react-router-dom';
import UserServices from '../services/UserServices';


class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }


    onSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let nom = data.get('nom');
        let prenom = data.get('prenom');
        let login = data.get('login');
        let mail = data.get('mail');
        let age = data.get('age');
        let password = data.get('password');
        let password2 = data.get('password2');
        let obj = {
            password: password,
            login: login,
            nom: nom,
            prenom: prenom,
            mail: mail,
            age: age,
            password2:password2
        }

        AxiosActions.createUser(obj).then((results) => {
            if (results.data.Status === "OK") {
                AxiosActions.getUsers(obj).then((results) => {
                    if (results.data.Connexion === "ok ") {
                       UserServices.setUser(results.data)
                        this.setState({
                            redirect: true
                        })
                    }
                })
            }
        })

    }

    render() {
        if (this.state.redirect)
            return <Redirect to="/feed" />
        return (
            <div>
                <h1>Inscription</h1>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="nom" placeholder="nom" /><br></br>
                    <input type="text" name="prenom" placeholder="prenom" /><br></br>
                    <input type="text" name="login" placeholder="login" /><br></br>
                    <input type="text" name="mail" placeholder="mail" /><br></br>
                    <input type="text" name="age" placeholder="age" /><br></br>
                    <input type="password" name="password" placeholder="password" /><br></br>
                    <input type="password" name="password2" placeholder="password_verification" /><br></br>
                    <input type="submit" value="Sign up" />

                </form>
            </div>
        );
    }

}


export default SignUpPage;