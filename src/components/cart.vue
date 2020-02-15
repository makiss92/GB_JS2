<template>
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
                            <span class="inc-good" @click="incCartGood(cartGood)"><i class="fa fa-plus" aria-hidden="true"></i></span>
                            <span class="dec-good" @click="decCartGood(cartGood)"><i class="fa fa-minus" aria-hidden="true"></i></span>
                        </td>
                    </tr>
                </thead>
                <tbody class="cart-items"></tbody>
            </table>
            <div class="cart-sum block-button">Общая стоимость товаров: {{ cartSum }}₽</div>
        </div>
    </div>
    </transition>
</template>
<script>
    export default {
    name: 'cart',
    props: ['isVisibleCart'],
    data: () =>({
            cartGoods: [],
        }),
    methods: {
        hideCart() {
            this.$emit('hide-cart');
        },
        incCartGood(good){
            this.$emit('increment-cart', good);
        },
        decCartGood(good){
            this.$emit('decrement-cart', good);
        },
    },
    computed: {
            cartSum() {
            let sum = 0;
            for (const good of this.cartGoods) {
                if (good.price) {
                    sum += good.price;
                }
            }
                return sum;
            },
        },
    mounted() {},
    };
</script>
<style scoped>
.cart {
    position: absolute;
    top: 150px;
    left: 30%;
    z-index: 10;
    height: 250px;
    overflow: hidden;
}

.cart-container {
    right: -20px;
    top: 100px;
    overflow: hidden;
    background-color: black;
    min-width: 600px;
    min-height: 300px;
    border-radius: 10px;
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
	background-color:#ffffff;
	border: 2px solid #dcdcdc;
    color:#666666;
  }

.closer {
	width: 40px;
	height: 40px;
	display: block;
	position: absolute;
	right: 5px;
	top: 5px;
	background: url('../img/cross.png') no-repeat;
	cursor: pointer;
}

.closer:hover {
	-webkit-transform: rotate(90deg);
	-moz-transform: rotate(90deg);
	-o-transform: rotate(90deg);
	-ms-transform: rotate(90deg);
	transform: rotate(90deg);
}

.title-cart thead {
    font-size: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.title-cart th {
    padding-top: 15px;
    width: 200px;
}

.cart-good td {
    padding: 10px 70px
}

.inc-good, .dec-good {
    padding-right: 5px;
    font-size: 25px;
    cursor: pointer;
}

.block-button {
    text-align: right;
    margin-top: 15px;
    margin-bottom: 10px;
    padding-right: 15px;
    padding-left: 15px;
    font-weight: bold;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>