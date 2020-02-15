<template>
    <form class="search-form" @input.prevent="filterGoods">
        <input type="text" placeholder="Поиск товаров" class="goods-search" v-model.trim="searchLine">
    </form>
</template>
<script>
    export default {
        name: 'searchForm',
        data: () => ({
            searchLine: '',
        }),
        methods: {
            filterGoods(){
                this.$emit('filter-goods', this.searchLine);
            }
        },
    };
</script>
<style scooped>
.search-form {
    display: block;
    margin-top: 20px;
    margin-left: -280px;
}

.goods-search {
    width: 200px;
    height: 25px;
    font-size: 15px;
    padding:6px;
    border-radius: 10px;
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
	background-color:#ffffff;
	border: 2px solid #dcdcdc;
    color:#666666;
}

.goods-search:focus {
   outline:none;
}
</style>