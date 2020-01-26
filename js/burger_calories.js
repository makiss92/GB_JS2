'use strict';
class Hamburger {
    constructor() {
      this.hamburgerStuff = [];
      this.sum = 0;
      this.calories = 0;
    }
    initHamburgerEvent() {
      let inputs = document.querySelectorAll("input");
      for(let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("change", () => {
          this.hamburgerStuff = [];
          this.calculatePrice();
          this.calculateCalories();
        })
      }
    }
    getHamburgerStuffItem() {
      for(let i = 0; i < document.forms[0].elements.length; i++) {
        if(document.forms[0].elements[i].checked) {
          this.hamburgerStuff.push(document.forms[0].elements[i].value);
        }
      }
    }
    calculatePrice() {
      this.sum = 0;
      this.getHamburgerStuffItem();
      for(let i = 0; i < this.hamburgerStuff.length; i++) {
        this.getStuff(this.hamburgerStuff[i]);
      }
      document.querySelector(".price").innerHTML = `Цена: <b>${this.sum} руб.</b>`;
    }
    calculateCalories() {
      this.calories = 0;
      this.getHamburgerStuffItem();
      for(let i = 0; i < this.hamburgerStuff.length; i++) {
        this.getStuff(this.hamburgerStuff[i]);
      }
      document.querySelector(".calories").innerHTML = `Калории: <b>${this.calories}</b>`;
    }
    getStuff(string) {
      switch(string) {
        case "small-size":
          this.sum += 50;
          this.calories += 20;
          break;
        case "big-size":
          this.sum += 100;
          this.calories += 40;
          break;
        case "cheese":
          this.sum += 10;
          this.calories += 20;
          break;
        case "salate":
          this.sum += 20;
          this.calories += 5;
          break;
        case "potato":
          this.sum += 15;
          this.calories += 10;
          break;
        case "seasoning":
          this.sum += 15;
          this.calories += 0;
          break;
        case "mayo":
          this.sum += 20;
          this.calories += 5;
          break;
        default:
          return this.sum, this.calories;
      }
    }
    init() {
      this.initHamburgerEvent();
      this.calculatePrice();
      this.calculateCalories();
    }
  }

  let hamburger = new Hamburger;
  hamburger.init();