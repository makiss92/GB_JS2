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
        name: 'Cart',
        props: ['isVisibleCart'],
        data: () =>({
            cartGoods: this.cartGoods,
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
    /* mounted() {
        const cardGoods = [];
        // this.cartGoods = LocalStorage.getItem('cartGoods');
        }, */
    };
</script>
