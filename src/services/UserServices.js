

const UserServices = {
    setUser(obj) {
        Object.keys(obj).map((e) => {
            localStorage.setItem(e, obj[e]);
            return null;
        })

    },
    getUser(){
        let user={
            "Clé":localStorage.getItem("Clé"),             
            "Login":localStorage.getItem("Login")
        };

        return user;
    }

}

export default UserServices;
