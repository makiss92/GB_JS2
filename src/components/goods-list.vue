<template>
        <div class="goods-list" v-if="!isGoodsEmpty">
            <goods-item v-for="good in goods" :good="good" :key="good.id_product" @add-cart="addCart"></goods-item>
        </div>
        <div class="goods-not-found" v-else><h2>Нет товаров</h2></div>
</template>
<script>
    import goodsItem from './goods-item.vue';
    export default {
        name: 'good-list',
        components:{
            goodsItem,
        },
        props: ['goods'],
        methods: {
            addCart(good) {
                this.$emit('add-cart', good);
            }
        },
        computed: {
            isGoodsEmpty() {
                return this.goods.length === 0;
            }
        }
    };
</script>
<style scoped>
.goods-list {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.goods-not-found, .query-not-found {
    padding: 30px 0px;
    width: 100%;
    text-align: center;
    color:#666666;
    font-size: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>