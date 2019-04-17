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
            password2: password2
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
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Twister</h1>
                    <p className="lead">Not the KFC one...</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-row">
                            <div class="col-md-4 mb-3">
                                <label for="nom">Nom</label>
                                <input id="nom" className="form-control" type="text" name="nom" placeholder="nom" required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="prenom">Prénom</label>
                                <input id="prenom" className="form-control" type="text" name="prenom" placeholder="prenom" required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="login">Login</label>
                                <input type="text" className="form-control" id="login" name="login" placeholder="login" required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="mail">Mail</label>
                                <input type="text" className="form-control" id="mail" name="mail" placeholder="mail" required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="age">Age</label>
                                <input type="text" className="form-control" id="age" name="age" placeholder="age" required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" id="password" name="password" placeholder="password" required />
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="password2">Password2</label>
                                <input type="password" class="form-control" name="password2" id="password2" placeholder="confirmation_password" required />
                            </div>
                        </div>
                        <button class="btn btn-primary" type="submit">Sign up</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUpPage;