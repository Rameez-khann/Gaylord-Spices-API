const FirebaseClient = require("../firebase/firebase-client");

class Orders {
    firebaseClient = new FirebaseClient('orders');

    getAll(){
        return this.firebaseClient.getAll();
    }

    getOne(id){
        return this.firebaseClient.getOne(id);
    }

    create(data){
        data.status = "pending";
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
    Orders
}