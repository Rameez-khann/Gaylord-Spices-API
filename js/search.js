const {
  searchObjectsByFields,
  generateUniqueId,
  getFieldValuesFromArray,
} = require("victor-dev-toolbox");
const DeletedRecords = require("./deleted-records");
const { Recipes } = require("./recipes");

class Search {
  recipesClient = new Recipes();
  deletedRecords = new DeletedRecords();

  async search(searchTerm) {
    const itemsFromAPI = await this.apiSearch(searchTerm);
    return itemsFromAPI;
  }


  async apiSearch(searchTerm) {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
      searchTerm
    )}`;

    const searchFields = [
      "strInstructions",
      "strCategory",
      "strArea",
      "strMeal",
    ];
    const itemsInDB = await this.recipesClient.getAll();
    
    
    const searchResultsFromDB = searchObjectsByFields(
      itemsInDB,
      searchFields,
      searchTerm
    );
    const idMealsInDb = getFieldValuesFromArray("idMeal", itemsInDB);
    const deletedIdMeals = await this.deletedRecords.getDeletedIdMeals();
    
    const existingIdMeals = idMealsInDb.concat(deletedIdMeals);

    try {
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // data.meals will be null if nothing is found
      const filteredFromAPI = (data.meals || []).filter(
        (i) => !existingIdMeals.includes(i.idMeal)
      );
      
      return (await this.assignIdstoApiResults(filteredFromAPI)).concat(
        searchResultsFromDB
      );
    } catch (error) {
      throw new Error(`Error fetching meals: ${error.message}`);
    }
  }

  async assignIdstoApiResults(results) {
    const modifiedResults = [];
    results.forEach((result) => {
      const id = generateUniqueId();
      result.id = id;

      const price = this.estimatePrice(result);
      result.price = price;

      this.recipesClient.create(result);
      result.appended = "APPENDED";
      modifiedResults.push(result);
    });
    return modifiedResults;
  }

  estimatePrice(meal) {
    const basePrice = 18;
    const ingredientCount = [...Array(20).keys()].filter((i) =>
      meal[`strIngredient${i + 1}`]?.trim()
    ).length;

    let price = basePrice + ingredientCount * 0.75;
    return Math.min(Math.max(price, 15), 25).toFixed(2);
  }
}

module.exports = Search;
