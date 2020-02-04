const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const cartGoods = [];

function deBounce(callback, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) callback.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            callback.apply(context, args)
        }
    }
}

const searchForm = {
    name: 'search-form',
    data: () => ({
        searchLine: '',
    }),
    template: `
        <form class="search-form" @input.prevent="filterGoods">
            <input type="text" placeholder="Поиск товаров" class="goods-search" v-model="searchLine">
        </form>
    `,
    methods: {
        filterGoods(){
            this.$emit('filter-goods', this.searchLine);
        }
    },
};

const goodsItem = {
    name: 'goods-item',
    props: ['good'],
    template: `
                <div class="goods-item">
                    <img src="https://via.placeholder.com/150" alt="img" class="goods-img">
                    <h3 class="title goods-title">{{good.product_name}}</h3>
                    <p>{{good.price}} ₽</p>
                    <button class="add-to-cart" @click="addGoodToCart(good)">В корзину</button>
                </div>
            `,
   methods:{
        addGoodToCart(good) {
            let goodElem = this.findGoodItem(good.id_product);
            if ( goodElem >= 0){
                cartGoods[goodElem].count++;
                this.addCardModal();
            } else {
                const cartItem = Object.assign({}, good, {count: 1});
                cartGoods.push(cartItem);
                this.addCardModal();
            }
        },
        addCardModal() {
            alert(`Товар добавлен в корзину`);
        },
        findGoodItem(id_product){
            let goodId = -1;
            cartGoods.forEach((item, index) => {
                if (item.id_product == id_product) {
                    goodId = index;
                }
            });
            return goodId;
        },
    }
};

const goodsList = {
    name: 'goods-list',
    props: ['goods'],
    components: {
        goodsItem,
    },
    template: `
            <div class="goods-list" v-if="!isGoodsEmpty">
                <goods-item v-for="good in goods" :good="good" :key="good.id_product"></goods-item>
            </div>
            <div class="goods-not-found" v-else><h2>Нет данных</h2></div>
            `,
    computed: {
        isGoodsEmpty(){
            return this.goods.length === 0;
        },
    },
};

const cart = {
    name: 'cart',
    props: ['isVisibleCart'],
    data: () =>({
        cartGoods: cartGoods,
    }),
    template: `
    <transition name="fade">
    <div class="cart" v-if="isVisibleCart">
        <div class="cart-container">
            <span class="closer" @click="hideCart"></span>
            <table class="title-cart">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Кол-во</th>
                        <th></th>
                    </tr>
                    <tr class="cart-good" v-for="cartGood in cartGoods" :key="cartGood.id_product">
                        <td class="cart-name">{{ cartGood.product_name }}</td>
                        <td class="cart-price">{{ cartGood.price }}</td>
                        <td class="cart-count">{{ cartGood.count }}</td>
                        <td>
                            <span class="inc-good" @click="incCartGood(cartGood.id_product)">+</span>
                            <span class="dec-good" @click="decCartGood(cartGood.id_product)">-</span>
                        </td>
                    </tr>
                </thead>
                <tbody class="cart-items"></tbody>
            </table>
            <div class="block-button">
            <span class="cart-sum">Общая стоимость товаров: {{ cartSum }} ₽</span>
            <button class="cart-clean">Очистить корзину</button>
            </div>
        </div>
    </div>
    </transition>
    `,
    methods: {
        hideCart(){
            this.$emit('hide-cart');
        },
        incCartGood(idItem){
            this.cartGoods[this.findGoodItem(idItem)].count++;
        },
        decCartGood(idItem){
            const goodElem = this.findGoodItem(idItem);
            if (this.cartGoods[goodElem].count > 0) {
                this.cartGoods[goodElem].count--;
            }
            if (this.cartGoods[goodElem].count === 0){
                this.cartGoods.splice(goodElem, 1);
            }
        },
        findGoodItem(id_product){
            let goodId = -1;
            this.cartGoods.forEach((item, index) => {
                if (item.id_product == id_product) {
                    goodId = index;
                }
            });
            return goodId;
        },
    },
    computed:{
        cartSum(){
            let sum=0;
            this.cartGoods.forEach(elem => sum += elem.price * elem.count);
            return sum;
        },
    },
};

const queryNotFound = {
    name: 'query-not-found',
    props:['queryerror'],
    template: `
           <div class="query-not-found">
                <h3>Не удалось выполнить запрос к серверу</h3>
                <p>{{queryerror}}</p>
            </div>
    `,
};


const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        cartGoods: [],
        searchAllRegExp: /\w*/,
        filterElem: '',
        isVisibleCart: false,
        isQuerySuccess: false,
        queryError: '',
    },
    components: {
        searchForm,
        goodsList,
        cart,
        queryNotFound,
    },
    methods: {
        makeGetRequest(url) {
            return new Promise((resolve, reject) => {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new window.XMLHttpRequest();
                } else  {
                    xhr = new window.ActiveXObject("Microsoft.XMLHTTP")
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status !== 200) {
                            reject(xhr.responseText);
                        }
                        const body = JSON.parse(xhr.responseText);
                        resolve(body)
                    }
                };

                xhr.onerror = function (err) {
                    reject(err)
                };

                xhr.open('GET', url);
                xhr.send();
            });
        },
        async fetchGoods() {
            try {
                this.goods = await this.makeGetRequest(`${API_URL}/catalogData.json`);
                this.isQuerySuccess = true;
            } catch (event) {
                this.isQuerySuccess = false;
                this.queryerror = event.name + ":" + event.message;
                console.error(event);
            }
        },
        toggleCart(){
            this.isVisibleCart = !this.isVisibleCart;
        },
        filterGoods(elem){
            this.filterElem = elem;
         }
    },
    computed: {
        filteredGoods() {
            let filterRegExp;
            this.searchAllRegExp.lastIndex = 0;
            const regStars = /\*+/gi;
            const regPluses = /\++/gi;
            if (this.searchAllRegExp.test(this.filterElem) &&
                    !regStars.test(this.filterElem) &&
                    !regPluses.test(this.filterElem)) {
                        filterRegExp = new RegExp(`${this.filterElem}`, 'gi');
            } else {
                filterRegExp = this.searcAllRegExp;
            }
            return this.goods.filter(good => filterRegExp.test(good.product_name));
        }
    },
    mounted() {
        this.fetchGoods();
    }
});
