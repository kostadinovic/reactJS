import React, { Component } from 'react';

import AxiosActions from '../services/AxiosActions';

import { Redirect } from 'react-router-dom';

import Fuse from 'fuse.js';



class FeedPage extends Component {
    //mise en place des states et var
    constructor(props) {
        super(props);
        this.message = null;
        this.state = {
            messages: [],
            users: [],
            displayedUsers: [],
            friends: [],
            redirect: false
        };
    }
    //déclenche la méthode de déconnexion et redirige vers la page d'accueil
    disconnect = () => {
        AxiosActions.disconnect().then((results) => {
            if (results.data["Déconnexion"] === "ok")
                localStorage.clear();
            this.setState({
                redirect: true
            });
        });
    }
    //liste tous les messages et refresh 
    listMessages = () => {
        return AxiosActions.listMessages().then((results) => {
            let k = Object.keys(results.data)[0];
            if (typeof (k) != "undefined") {
                return this.setState({
                    messages: results.data[k]
                });

            }

        });
    }
    //liste tous les users
    listUser = () => {
        return AxiosActions.listUser().then((results) => {
            let c = Object.keys(results.data).map((key, index) => {
                return results.data[key]
            });
            let options = {
                //keys: ['title', 'author'
            }
            this.fuse = new Fuse(c, options)
            return this.setState({
                users: c,
                displayedUsers: c
            });
        });
    }
    //liste les amis
    listFriends = () => {
        return AxiosActions.listFriends().then((results) => {
            return this.setState({
                friends: results.data.friends
            });
        });
    }
    //react lifecycle methods
    componentDidMount = () => {
        this.feedTheRenderMethod();
    }
    //requetes ajax et refresh la view
    feedTheRenderMethod = () => {
        this.listMessages().then(() => {
            this.listUser().then(() => {
                this.listFriends().then((results) => {
                    console.log(results);
                })
            })
        });
    }
    //met a jour le message qd il est change
    onMessageChange = (element) => {
        this.message = element.target.value;
    }
    //ajoute message a la bd
    addMessage = () => {
        let obj = {
            message: this.message
        }
        AxiosActions.addMessage(obj).then((results) => {
            //clear the texteArea input
            this.message = null;
            document.querySelector('.textAreaForMessage').value = null;
            this.listMessages();
        });

    }
    //ajout d'amis
    addAFriend = (login) => {
        AxiosActions.addAFriend(login).then(() => { this.listFriends() });
    }
    //suppression d'amis
    removeFriend = (friendLogin) => {
        AxiosActions.removeFriend(friendLogin).then(() => { this.listFriends() });
    }
    //recherche un users et rafraichi la liste
    searchUser = (element) => {
        let r = this.fuse.search(element.target.value);
        return this.setState({
            displayedUsers: r
        });
    }

    
    render() {
        if (this.state.redirect)
            return <Redirect to="/" />

        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Twister <button className="float-right btn btn-secondary btn-sm" onClick={this.disconnect}> Deconnexion</button></h1>
                        <p className="lead">Not the KFC one...</p>
                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Write a new message</label>
                            <textarea className="form-control form-group textAreaForMessage" id="exampleFormControlTextarea1" rows="3"></textarea>
                            <button onClick={this.addMessage} type="submit" class="btn btn-primary">Ajouter un message</button>
                        </div>
                    </div>
                </div>
                <div className="jumbotron jumbotron-fluid bg-secondary">
                    <div className="container">
                        <h3>Messages list</h3>
                        <p className="lead">
                            <ul className="list-group list-group-flush">
                                {
                                    this.state.messages.map((message, index) => {
                                        return (
                                            <li key={index} className="list-group-item"><p>{message}</p></li>
                                        )
                                    })
                                }
                            </ul>
                        </p>
                    </div>
                </div>
                <div className="jumbotron jumbotron-fluid bg-info">
                    <div className="container">
                        <h3>Users list </h3>
                        <p className="lead">
                            <ul className="list-group list-group-flush">
                                {
                                    this.state.users.map((user, index) => {
                                        return (
                                            <li key={index} className="list-group-item">{user} <button className="float-right btn btn-dark" onClick={() => this.addAFriend(user)}>Ajouter</button></li>
                                        )
                                    })
                                }
                            </ul>
                        </p>
                    </div>
                </div>
                <div className="jumbotron jumbotron-fluid bg-primary">
                    <div className="container">
                        <h3>Friends list</h3>
                        <p className="lead">
                            <ul className="list-group list-group-flush">
                                {
                                    this.state.friends.map((friend, index) => {
                                        return (
                                            <li key={index} className="list-group-item">{friend} <button className="float-right btn btn-dark" onClick={() => this.removeFriend(friend)}>Supprimer</button></li>
                                            ) 
                                    
                                    })
                                }
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        )
    }


}



export default FeedPage;


