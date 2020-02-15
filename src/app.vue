<template>
    <div id="app">
        <header>
            <div class="header-container">
                <h1 class="logo">Online Store</h1>
                <search-form @filter-goods="filterGoods"></search-form>
                <button class="cart-button" @click="toggleCart">Корзина</button>
            </div>
        </header>
        <main>
            <div class="container">
                <goods-list :goods="filteredGoods" v-if="isQuerySuccess" @add-cart="addGoodToCart"></goods-list>
                <div class="query-not-found" v-else>Запрос не выполнен</div>
                <cart :is-visible-cart="isVisibleCart" @hide-cart="toggleCart" @increment-cart="addGoodToCart" @decrement-cart="removeGoodInCart"></cart>
            </div>
        </main>
        <footer>
            <div class="footer-container"></div>
            <div class="footer-down">&copy; Все права защищены</div>
        </footer>
    </div>
</template>
<script>
    import SearchForm from './components/search-form.vue';
    import GoodsList from './components/goods-list.vue';
    import Cart from './components/cart.vue';
    import LocalStorage from './services/storage.services.js';

    const cartGoods = [];

    export default {
        name: 'app',
        components: {
            SearchForm,
            GoodsList,
            Cart,
        },
        data() {
            return {
                goods: [],
                searchAllRegExp: /\w*/,
                filterElem: '',
                isVisibleCart: false,
                isQuerySuccess: false,
                queryError: '',
            }
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
        makePostRequest(url, data){
            return new Promise((resolve, reject) => {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new window.XMLHttpRequest();
                } else {
                    xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        resolve(xhr.responseText);
                    }
                };
                xhr.open('POST', url);
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xhr.send(data);
            });
        },
       async addGoodToCart(good) {
            this.cartGoods = LocalStorage.getItem('cartGoods');
            console.log(cartGoods);
            let goodElem = this.findGoodItem(good.id_product);
            if ( goodElem >= 0){
                cartGoods[goodElem].count++;
            } else {
                const cartItem = Object.assign({}, good, {count: 1});
                cartGoods.push(cartItem);
            }
            await this.makePostRequest('/api/addCart', JSON.stringify(cartGoods));
            LocalStorage.setItem('cartGoods', this.cartGoods);
        },
        async removeGoodInCart(good){
            const goodElem = this.findGoodItem(good.id_product);
            this.cartGoods = LocalStorage.getItem('cartGoods');
              if (cartGoods[goodElem].count > 1) {
                  cartGoods[goodElem].count--;
              }else{
                  cartGoods.splice(goodElem, 1);
              };
                await this.makePostRequest('/api/removeCart', JSON.stringify(cartGoods));
                LocalStorage.setItem('cartGoods', this.cartGoods);
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
        toggleCart(){
            this.isVisibleCart = !this.isVisibleCart;
        },
        filterGoods(elem){
            this.filterElem = elem;
         }
    },
    async mounted() {
        Promise.all([this.makeGetRequest(`/api/goods`),
            this.makeGetRequest(`/api/cart`)
        ]).then(([catalogData, cartData])=> {
            this.goods = catalogData;
            LocalStorage.setItem('cartGoods', cartData);
           // cartGoods.push(...cartData);
            this.isQuerySuccess = true;
        }).catch((event) => {
            this.isQuerySuccess = false;
            this.queryError = event.name + ":" + event.message;
            console.error(event);
        });
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
                filterRegExp = this.searchAllRegExp;
            }
                return this.goods.filter(good => filterRegExp.test(good.product_name));
        }
    }
}
</script>