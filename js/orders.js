const FirebaseClient = require("../firebase/firebase-client");

class Orders {
    firebaseClient = new FirebaseClient('orders');

    getAll(){
        return this.firebaseClient.getAll();
    }

async getGroupedOrders(){

    const orders = await this.getAll();
    const pendingOrders = orders.filter(o=> o.status ==='pending');
    const deliveredOrders = orders.filter(o=> o.status ==='delivered');
    return {pendingOrders,deliveredOrders}
}


async markAsDelivered(id){
    const update = await this.update(id,{status:'delivered'});
    return update;
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