const FirebaseClient = require("../firebase/firebase-client");

class Filter {
  collection = "filtered-recipes";
  filterId = "filtered-recipes";
  dbClient = new FirebaseClient(this.collection)

  async getFilteredRecipes() {
    const item = await this.get(this.filterId);
    return item?.items || [];
  }


  async get(id) {
    return this.dbClient.getAll(id);
  }


  async updateFilteredRecipes(idMeal) {
    const idMeals = await this.getFilteredRecipes();
    if (!idMeals.includes(idMeal)) {
      idMeals.push(idMeal);
      const save = await this.update(this.filterId, { items: idMeals });
      return save;
    } else {
      return null;
    }
  }
}


module.exports={
  Filter
}