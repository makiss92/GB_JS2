<template>
    <form class="search-form" @input.prevent="filterGoods">
        <input type="text" placeholder="Поиск товаров" class="goods-search" v-model.trim="searchLine">
    </form>
</template>
<script>
    export default {
        name: 'SearchForm',
        data: () => ({
            searchLine: '',
        }),
        methods: {
            filterGoods(){
                this.$emit('filter-goods', this.searchLine);
            }
        },
    }
</script>