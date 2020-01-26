'use strict';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGetRequest(url, callback) {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else {
            xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              callback(xhr.responseText)
                if (xhr.status === 200) {
                    const body = JSON.parse(xhr.responseText)
                    resolve(body);
                } else {
                    reject(new Error("Network Error"));
                }
            }
        }
        xhr.onerror = function (err) {
            reject(err);
        }

        xhr.open('GET', url);
        xhr.send();
    })
};
class GoodsList {
    constructor(container) {
      this.container = document.querySelector(container);
      this.goods = [];
    }
    findGood(id) {
      return this.goods.find(good => good.id === id);
    }
    fetchGoods(callback) {
        makeGetRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            callback();
        })
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price, good.img);
            listHtml += goodItem.render();
        });
        this.container.innerHTML = listHtml;
   //     this.initListeners();
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
    constructor(id, title = 'Без названия', price = 0, img = 'https://via.placeholder.com/150') {
      this.id = id;
      this.title = title;
      this.price = price;
      this.img = img;
    }
    render() {
    return `<div class="goods-item">
              <img src="${this.img}" alt="alt">
              <h3>${this.title}</h3>
              <p>${this.price}p.</p>
              <button class="add-to-cart" data-id="${this.id}">В корзину</button>
            </div>`
    }
  }

class Cart extends GoodsList {
    constructor(props) {
        super(props);
        this.cartItems = [];
        this.container = document.querySelector(".cart-container");
        this.render();
        this.total = 0;
    }
    initListeners() {
        const cartCleanBtn = document.querySelector(".cart-clean");
        cartCleanBtn.addEventListener("click", () => {
            this.cleanCart()
        });
    }
    findCard(id) {
        return this.cartItems.find(cartItems => cartItems.id === id);
      }
      addToCart() {
        let goodsBtns = document.querySelectorAll(".add-to-cart");
        goodsBtns = [].slice.call(goodsBtns);
        goodsBtns.map(btn => {
            btn.addEventListener("click", () => {
                if (this.checkCartItem(btn)) {
                    return;
                } else {
                    this.cartItems.push(btn.getAttribute("data-id"));
                    this.render();
                    this.deleteItem();
                    this.incItem();
                    this.decItem();
                }
            })
        })
    }
    checkCartItem(btn) {
        for (let i = 0; i < this.cartItems.length; i++) {
            if (this.cartItems[i] === btn.getAttribute("data-id")) {
                return true;
            }
        }
    }
    deleteItem() {
        let removeBtn = document.querySelectorAll(".cart-item-remove");
        removeBtn = [].slice.call(removeBtn);
        removeBtn.map(btn => {
            btn.addEventListener("click", () => {
                for (let i = 0; i < this.cartItems.length; i++) {
                    if (btn.getAttribute("data-remove") === this.cartItems[i]) {
                        this.cartItems.splice(this.cartItems.indexOf(this.cartItems[i]), 1);
                        this.render();
                        if (this.cartItems.length !== 0) {
                            this.deleteItem();
                        }
                    }
                }
            })
        })
    }
    cleanCart() {
        this.cartItems = [];
        this.render();
  }
    render() {
        let listHtml = '';
        for (let i = 0; i < this.cartItems.length; i++) {
            for (let j = 0; j < this.goods.length; j++) {
                if (parseInt(this.cartItems[i]) === this.goods[j].id_product) {
                    const cartItem = new CartItem(this.goods[j].product_name, this.goods[j].price, this.goods[j].id_product);
                    listHtml += cartItem.render();
            }
        }
    }
    if (listHtml === '') {
        listHtml = '<span class="cart-null">Пока нет товаров в корзине</span>';
         //   let cartClean = document.querySelector(".cart-clean");
         //   cartClean.style.display = "none";

    }
    document.querySelector(".cart-items").innerHTML = listHtml;
}
incItem() {
    let incBtns = document.querySelectorAll(".cart-add");

    incBtns = [].slice.call(incBtns);
    incBtns.map(btn => {
        let input = btn.previousElementSibling;
        btn.addEventListener("click", () => {
            input.value = parseInt(input.value) + 1;
        })
    })
}
decItem() {
    let decBtns = document.querySelectorAll(".cart-del");

    decBtns = [].slice.call(decBtns);
    decBtns.map(btn => {
        let input = btn.nextElementSibling;
        btn.addEventListener("click", () => {
            if (input.value <= 0) {
                input.value = 0;
            } else {
                input.value = parseInt(input.value) - 1;
            }
        })
    })
}
}

class CartItem extends GoodsItem {
    constructor(...props) {
      super(...props);
      this.count = 0;
  }
  render() {
      return `<tr class="cart-item">
                  <td>
                      <h3 class="cart-item-title">${this.id}</h3>
                  </td>
                  <td>
                      <p class="cart-item-price">${this.title}p.</p>
                  </td>
                  <td class="cart-cell">
                      <button class="cart-del">-</button>
                      <input class="cart-input" type="text" data-price="${this.price}" value="1">
                      <button class="cart-add">+</button>
                  </td>
                  <td>
                      <button class="cart-item-remove" data-remove="${this.price}">Удалить</button>
                  </td>
              </tr>`;
  }
}



const list = new GoodsList('.goods-list');
list.fetchGoods(() => {
    list.render();
    list.sumGoods();
});

const cart = new Cart();
cart.fetchGoods(() => {
    cart.addToCart();
    cart.initListeners();
});