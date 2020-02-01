const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        isVisibleCart: false,
        searchLine: '',
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
                            const noData = document.querySelector('.goods-list');
                            noData.style = (`justify-content: center;
                                             font-size: 25px;
                                             color: #666666;
                                             margin-bottom: 15px;`);
                            noData.innerText = `Нет данных`;
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
        clickHandler(e) {
            e.preventDefault();
            this.filterGoods();
        },
        async fetchGoods() {
            try {
                this.goods = await this.makeGetRequest(`${API_URL}/catalogData.json`)
                this.filteredGoods = [...this.goods];
            } catch (event) {
                console.error(event);
            }
        },
        toggleCart(){
            this.isVisibleCart = !this.isVisibleCart;
        },
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter((good) => {
                return regexp.test(good.product_name);
            });
        }
    },
    computed: {
        isGoodsEmpty(){
           return this.filteredGoods.length === 0;
        },
    },
    mounted() {
        this.fetchGoods();
    }
});
