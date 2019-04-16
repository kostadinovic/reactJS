import AxiosInstance from './AxiosInstance';
import UserServices from './UserServices'

const AxiosActions = {
    //get a user based on it login && password
    getUsers(obj) {
        return AxiosInstance.get(`/twister/Login?login=${obj.login}&password=${obj.password}`);
    },
    //create a user based on the infos provided by the form
    createUser(obj){
        return AxiosInstance.get(`/twister/CreateUser?nom=${obj.nom}&prenom=${obj.prenom}&mail=${obj.mail}&login=${obj.login}&password=${obj.password}&age=${obj.age}`);
    },

    //just disconnect everyine
    disconnect(){
        return AxiosInstance.get(`/twister/Logout?login=${UserServices.getUser()["Login"]}&key=${UserServices.getUser()["Clé"]}`);
    },
    //add a message to the DB
    addMessage(obj){
        return AxiosInstance.get(`/twister/AddMessage?login=${UserServices.getUser()["Login"]}&key=${UserServices.getUser()["Clé"]}&message=${obj.message}`);
    },
    //list all the fiend of the connected user
    getFriends(){
        return AxiosInstance.get(`twister/ListFriend?login=${UserServices.getUser()["Login"]}&key=${UserServices.getUser()["Clé"]}`);
    },
    //add a friend to the connected user
    addAFriend(friendLogin){
        return AxiosInstance.get(`twister/AddFriend?monlogin=${UserServices.getUser()["Login"]}&key=${UserServices.getUser()["Clé"]}&friendlogin=${friendLogin}`);
    },
    //list all the messages of the connected user
    listMessages(){
        return AxiosInstance.get(`/twister/ListMessage?login=${UserServices.getUser()["Login"]}`);
    },
    //list all friends
    listFriends(){
        return AxiosInstance.get(`twister/ListFriend?login=${UserServices.getUser()["Login"]}&key=${UserServices.getUser()["Clé"]}`);
    }

    
}

export default AxiosActions;
