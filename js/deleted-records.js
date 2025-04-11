const FirebaseClient = require("../firebase/firebase-client");


 class DeletedRecords {
collection = 'deleted-records';
firebaseClient = new FirebaseClient(this.collection);
 deletedRecordsId =  `deletedRecords`;

async create(data){
    return this.firebaseClient.create(data);
}

async getAll(){
    return this.firebaseClient.getAll();
}

async get(id){
return this.firebaseClient.getOne(id);
}

async update(id, data){
return this.firebaseClient.update(id, data);
}

async delete(id){
    return this.firebaseClient.delete(id);
}

async getDeletedIdMeals(){
     const item = await this.get(this.deletedRecordsId);
     return item?.items ||[];
   }

async updateDeletedIdMeals(idMeal){
const idMeals = await this.getDeletedIdMeals();
if(!idMeals.includes(idMeal)){
    idMeals.push(idMeal);
    const save = await this.update(this.deletedRecordsId, {items:idMeals});
    return save;
} else{
    return null;
}
}

}


module.exports = DeletedRecords;
