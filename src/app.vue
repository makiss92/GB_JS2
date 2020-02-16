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
    import searchForm from './components/search-form.vue';
    import goodsList from './components/goods-list.vue';
    import cart from './components/cart.vue';

    const cartGoods = [];

    export default {
        name: 'app',
        components: {
            searchForm,
            goodsList,
            cart,
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
            let goodElem = this.findGoodItem(good.id_product);
            if ( goodElem >= 0) {
                cartGoods[goodElem].count++;
            } else {
                const cartItem = Object.assign({}, good, {count: 1});
                cartGoods.push(cartItem);
            }
            await this.makePostRequest('/api/addCart', JSON.stringify(cartGoods));
        },
        async removeGoodInCart(good){
            const goodElem = this.findGoodItem(good.id_product);
              if (cartGoods[goodElem].count > 1) {
                  cartGoods[goodElem].count--;
              }else{
                  cartGoods.splice(goodElem, 1);
              };
                await this.makePostRequest('/api/removeCart', JSON.stringify(cartGoods));
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
            cartGoods.push(...cartData);
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
<style scoped>
html, body {
    margin: 5px;
    padding: 5px;
    background-color:#f6f6f6;
}

header, footer {
    max-width: 1200px;
    min-height: 71px;
    margin: 0 auto;
    border-radius: 10px;
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
	background-color:#ffffff;
	border: 2px solid #dcdcdc;
	color:#666666;
}

.header-container, .footer-container {
    margin-top: -5px;
    display: flex;
    justify-content: space-between;
    height: 50px;
}

.logo {
    display: inline-block;
    padding-left: 15px;
    padding-right: 220px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.cart-button {
    width: 120px;
    height: 40px;
    margin-right: 20px;
    margin-top: 20px;
	border-radius:5px;
	display:inline-block;
	cursor:pointer;
	font-family:Arial;
	font-size: 15px;
	font-weight:bold;
	text-decoration:none;
    box-sizing: border-box;
    background: transparent;
    border: 2px solid #dcdcdc;
    color:#666666;
    transition: background 0.5s ease-in-out, color 0.5s ease-in-out;
}

.cart-button:hover {
	background:linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
    background-color:#666666;
    color: white;
}

.cart-button:active {
    position:relative;
	top: 2px;
}

.cart-button:focus {
	/* position:relative; */
	top: -2;
	outline: none;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.footer-down {
    margin-bottom: 5px;
    width: 100%;
    text-align: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>