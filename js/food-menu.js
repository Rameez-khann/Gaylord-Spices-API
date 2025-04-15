const FirebaseClient = require("../firebase/firebase-client");

const drinks = [
    {
      idMeal: 'D001',
      strMeal: 'Coca-Cola',
      strCategory: 'Soft Drink',
      strArea: 'American',
      price: '1.50',
      strMealThumb: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      idMeal: 'D002',
      strMeal: 'Pepsi',
      strCategory: 'Soft Drink',
      strArea: 'American',
      price: '1.50',
      strMealThumb: 'https://www.pepsi.com/en-us/uploads/images/can-pepsi.png'
    },
    {
      idMeal: 'D003',
      strMeal: 'Fanta Orange',
      strCategory: 'Soft Drink',
      strArea: 'German',
      price: '1.50',
      strMealThumb: 'https://www.fanta.com/content/dam/fanta/global/fanta-orange-500ml.png'
    },
    {
      idMeal: 'D004',
      strMeal: 'Sprite',
      strCategory: 'Soft Drink',
      strArea: 'American',
      price: '1.50',
      strMealThumb: 'https://www.sprite.com/content/dam/sprite/global/sprite-500ml.png'
    },
    {
      idMeal: 'D005',
      strMeal: '7Up',
      strCategory: 'Soft Drink',
      strArea: 'American',
      price: '1.50',
      strMealThumb: 'https://www.7up.com/images/7up-can.png'
    },
    {
      idMeal: 'D006',
      strMeal: 'Tropicana Orange Juice',
      strCategory: 'Fruit Juice',
      strArea: 'American',
      price: '2.00',
      strMealThumb: 'https://www.tropicana.co.uk/images/orange-juice.png'
    },
    {
      idMeal: 'D007',
      strMeal: 'Minute Maid Apple Juice',
      strCategory: 'Fruit Juice',
      strArea: 'American',
      price: '2.00',
      strMealThumb: 'https://www.minutemaid.com/content/dam/minute-maid/en/products/apple-juice.png'
    },
    {
      idMeal: 'D008',
      strMeal: 'Ribena Blackcurrant',
      strCategory: 'Fruit Juice',
      strArea: 'British',
      price: '1.80',
      strMealThumb: 'https://www.ribena.co.uk/images/ribena-blackcurrant.png'
    },
    {
      idMeal: 'D009',
      strMeal: 'Capri-Sun Orange',
      strCategory: 'Fruit Juice',
      strArea: 'German',
      price: '1.20',
      strMealThumb: 'https://www.caprisun.com/images/orange.png'
    },
    {
      idMeal: 'D010',
      strMeal: 'Lucozade Energy Original',
      strCategory: 'Energy Drink',
      strArea: 'British',
      price: '1.80',
      strMealThumb: 'https://www.lucozade.com/images/lucozade-energy-original.png'
    }
  ];
  


class FoodMenu {
    firebaseClient = new FirebaseClient('recipes');

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