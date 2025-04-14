const { generateUniqueId } = require("victor-dev-toolbox");

class Search {
    async findRecipes(searchTerm){
        return this.getRecipesFromMealDb(searchTerm);
    }
    
    
    async getRecipesFromMealDb(searchTerm) {
        console.log({searchTerm});
        
        const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`;
        // const searchFields = ['strInstructions', 'strCategory', 'strArea', 'strMeal']

        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            
        return this.assignPricesAndIds(data.meals)
            // data.meals will be null if nothing is found
            // const filteredFromAPI =( data.meals || []).filter(i=> !existingIdMeals.includes(i.idMeal));
            // return (await this.assignIdstoApiResults(filteredFromAPI)).concat(searchResultsFromDB);
          } catch (error) {
            throw new Error(`Error fetching meals: ${error.message}`);
          }
    }


    async assignPricesAndIds(results){
      const modifiedResults =[];
      results.forEach(result=>{
        const id = generateUniqueId();
        result.id = id;
  
        const price = this.estimatePrice(result);
        result.price = price;
  
      // this.menuClient.create(result);
      modifiedResults.push(result);
      })
      return modifiedResults;
    }


    estimatePrice(meal) {
      const minPrice = 15;
      const maxPrice = 22;
    
      const ingredientCount = [...Array(20).keys()]
        .filter(i => meal[`strIngredient${i + 1}`]?.trim())
        .length;
    
      const maxIngredients = 20;
      const complexityFactor = ingredientCount / maxIngredients;
    
      const randomVariation = Math.random() * 0.3 + 0.85; // Between 0.85 and 1.15
    
      let estimatedPrice = minPrice + (maxPrice - minPrice) * complexityFactor * randomVariation;
    
      return Math.min(estimatedPrice, maxPrice).toFixed(2);
    }
    
    
}

module.exports={Search}