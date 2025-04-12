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
            
        return data
            // data.meals will be null if nothing is found
            // const filteredFromAPI =( data.meals || []).filter(i=> !existingIdMeals.includes(i.idMeal));
            // return (await this.assignIdstoApiResults(filteredFromAPI)).concat(searchResultsFromDB);
          } catch (error) {
            throw new Error(`Error fetching meals: ${error.message}`);
          }
    }
}

module.exports={Search}