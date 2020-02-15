<template>
        <div class="goods-item">
            <img src="https://via.placeholder.com/150" alt="img" class="goods-img">
            <h3 class="title goods-title">{{ good.product_name }}</h3>
            <p>{{ good.price }}₽</p>
            <button class="add-to-cart" @click="addGoodToCart(good)">В корзину</button>
        </div>
</template>
<script>
    export default {
        name: 'goods-item',
        props: ['good'],
        methods:{
            addGoodToCart(good) {
                this.$emit('add-cart', good);
            },
        }
    }
</script>