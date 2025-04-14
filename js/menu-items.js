const FirebaseClient = require("../firebase/firebase-client");

class MenuItems {
    firebaseClient = new FirebaseClient('menu-items');

    getAll(){
        return this.firebaseClient.getAll();
    }

    getOne(id){
        return this.firebaseClient.getOne(id);
    }

    create(data){
        return this.firebaseClient.create(data);
    }

    update(id,data){
        return this.firebaseClient.update(id,data);
    }

    delete(id){
        return this.firebaseClient.delete(id);
    }
}

module.exports = {
    MenuItems
}