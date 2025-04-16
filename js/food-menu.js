const FirebaseClient = require("../firebase/firebase-client");



class FoodMenu {
    firebaseClient = new FirebaseClient('menu');

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

    async getFiltered() {
        const items = await this.getAll();
    
        // Shuffle the items array
        const shuffled = items.sort(() => 0.5 - Math.random());
    
        // Pick first 20 items from shuffled array
        const selected = shuffled.slice(0, 20);
    
        return selected;
    }

    saveDrinks(){
        drinks.forEach(d=> this.create(d));
    }
    
}


module.exports = {
    FoodMenu
}