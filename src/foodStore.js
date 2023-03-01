
const FoodService = require('./food.service');
const restAPI = require('./rest-api');

module.exports = class foodStore {
  constructor(store) {
    if (store) {
      this.store = store;
    } else {
      this.store = {};
    }

    const foodService = FoodService(this.store);
    restAPI(foodService);
  }
};