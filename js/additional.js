'use strict';

class Hamburger {
    constructor() {
        this.hamburgerStuff = [];
        this.sum = 0;
        this.calories = 0;
  }
    addTopping(topping) {}    // Добавить добавку
    removeTopping(topping) {} // Убрать добавку
    getToppings(topping) {}   // Получить список добавок
    getSize() {}              // Узнать размер гамбургера
    getStuffing() {}          // Узнать начинку гамбургера
    calculatePrice() {}     // Узнать цену
    calculateCalories() {}    // Узнать калорийность
}

const hamburger = new Hamburger();
console.log(hamburger);