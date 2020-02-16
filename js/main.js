'use strict';
class GoodsList {
    constructor(container) {
      this.container = document.querySelector(container);
      this.goods = [];
    }
    initListeners() {
      const buttons = [...this.container.querySelectorAll('.add-to-cart')];
      buttons.forEach(button => {
          button.addEventListener('click', (event) => {
              const goodId = event.target.parentElement.getAttribute('data-id');
              this.sendToCart(parseInt(goodId));
          })
      })
  }
  findGood(id) {
      return this.goods.find(good => good.id === id);
  }
  sendToCart(goodId) {
      const good = this.findGood(goodId);
      console.log(good);
  }
    fetchGoods() {
      this.goods = [
        { id: 1, title: "Робот-пылесос Xiaomi", price: 20000, img: 'https://via.placeholder.com/150' },
        { id: 2, title: "Смартфон Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/150' },
        { id: 3, title: "Стиральная машина Hotpoint", price: 32000, img: 'https://via.placeholder.com/150' },
        { id: 4, title: "Умные часы Apple watch", price: 26000, img: 'https://via.placeholder.com/150' },
        { id: 5, title: "Умный дом от Fibaro", price: 155000, img: 'https://via.placeholder.com/150' },
        { id: 6, title: "Умный Холодильник Bork", price: 55000, img: 'https://via.placeholder.com/150' },
        { id: 7, title: "Робот-пылесос Xiaomi", price: 20000, img: 'https://via.placeholder.com/150' },
        { id: 8, title: "Смартфон Samsung Galaxy", price: 27500, img: 'https://via.placeholder.com/150' },
        { id: 9, title: "Стиральная машина Hotpoint", price: 32000, img: 'https://via.placeholder.com/150' },
        { id: 10, title: "Умные часы Apple watch", price: 26000, img: 'https://via.placeholder.com/150' },
        { id: 11, title: "Умный дом от Fibaro", price: 155000, img: 'https://via.placeholder.com/150' },
        { id: 12, title: "Умный Холодильник Bork", price: 50000, img: 'https://via.placeholder.com/150' },
      ];
    }
    render() {
      let listHtml = '';
      this.goods.forEach(good => {
          const goodItem = new GoodsItem(good.id, good.title, good.price, good.img);
          listHtml += goodItem.render();
      });
          this.container.innerHTML = listHtml;
          this.initListeners();
      }
      // Метод для подсчета общей суммы товаров
      sumGoods() {
        let sum = 0;
        this.goods.forEach(good => {
           sum += good.price;
          });
        const calcSumButton = document.getElementById('calcSumButton');
              calcSumButton.addEventListener('click', function(event) {
        const sumGoodResult = document.getElementById('sumGoodResult');
              sumGoodResult.innerText = `${sum} рублей`;
          });
      }
  }
class GoodsItem {
    constructor(id, title = 'Без названия', price = 0, img = '') {
      this.id = id;
      this.title = title;
      this.price = price;
      this.img = img;
    }
    render() {
    return `<div class="goods-item" data-id="${this.id}">
              <img src="${this.img}" alt="alt">
              <h3>${this.title}</h3>
              <p>${this.price}</p>
              <button class="add-to-cart">В корзину</button>
            </div>`
    }
  }
// Класс для корзины из ДЗ
class Cart {
  constructor() {
      this.cartItems = [];
  }
  addCardItem() { // Добавление товара

  }
  removeCardItem() { // Удаление товара

  }
  renderCardItem() {  // Отрисовка товаров

  }
}

const list = new GoodsList('.goods-list');
list.fetchGoods();
list.render();
list.sumGoods();