import React, { Component } from 'react';

import AxiosActions from '../services/AxiosActions';

import { Redirect } from 'react-router-dom';





class FeedPage extends Component {

    constructor(props) {

        super(props);

        this.message = null;



        this.state = {

            redirect: false

        };

    }

    disconnect = () => {

        AxiosActions.disconnect().then((results) => {

            console.log(results)

            if(results.data["Déconnexion"]==="ok")

            localStorage.clear();

            this.setState({

                redirect: true

            })

        });

    }

    listMessages = () => {

        return AxiosActions.listMessages().then((results)=>{

            console.log(results)

        })

    }

    listUser = () => {

        return AxiosActions.listUser().then((results)=>{

            console.log(results)

        })

    }

    listFriends = () => {

        return AxiosActions.listFriends().then((results)=>{

            console.log(results)

        })

    }

    componentDidMount = () => {

        this.listMessages().then(()=>{

            AxiosActions.getFriends().then(()=>{

                AxiosActions.listUser().then((results)=>{

                console.log(results)

            })

        })

        });

    }

    

    onMessageChange = (element) => {

        this.message = element.target.value;

    }

    addMessage = () => {

        let obj = {

            message: this.message

        }

        AxiosActions.addMessage(obj).then((results) => {

            this.message = null;

            document.querySelector('.textAreaForMessage').value = null;

        });

    }

    setFriendName  = (element)=>{

        this.friendName = element.target.value;

    }

    addAFriend = ()=>{

        AxiosActions.addAFriend(this.friendName).then((results) => {

            console.log(results)

        });

    }

    render() {

        if (this.state.redirect)

            return <Redirect to="/" />

        return (

            <div>

                <h1>FeedPage</h1>

                <textarea className="textAreaForMessage" onChange={this.onMessageChange} />

                <button onClick={this.addMessage}> Ajouter un message</button>

                <button onClick={this.disconnect}> Deconnexion</button>

                <div>

                    <h2>

                        LISTE MESSAGES

                    </h2>

                </div>

                <div>

                    <h4>

                        Ajouter un ami en tappant son login ( à défaut de mieux)

                    </h4>

                    <input onChange={this.setFriendName} type="text"/>

                    <button onClick={this.addAFriend}>Ajouter un ami</button>

                </div>



            </div>

        )



    }



}



export default FeedPage;


