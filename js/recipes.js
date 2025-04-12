const FirebaseClient = require("../firebase/firebase-client");

class Recipes {
    firebaseClient = new FirebaseClient('recipes');

    getAll(){
        return this.firebaseClient.getAll();
    }
}

module.exports = {
    Recipes
}