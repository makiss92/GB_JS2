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
        methods: {
            addGoodToCart(good) {
                this.$emit('add-cart', good);
            },
        }
    };
</script>
<style>
@-webkit-keyframes pulse {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
    50% {
      -webkit-transform: scale3d(1.05, 1.05, 1.05);
      transform: scale3d(1.05, 1.05, 1.05);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
}

.goods-item {
    margin-right: 9px;
    margin-left: 9px;
    flex-wrap: wrap;
    width: 160px;
    padding: 8px;
    border-radius: 10px;
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
	background-color:#ffffff;
	border: 2px solid #dcdcdc;
    color:#666666;
    margin-bottom: 20px;
}

.goods-item:hover {
    -webkit-animation-name: pulse;
    animation-name: pulse;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
	background:linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
	background-color:#f6f6f6;
}

.goods-item img {
    padding: 5px;
}

.goods-item h3 {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-align: center;
}

.goods-item p {
    margin-bottom: 1px;
    font-family:Arial;
    text-align: right;
    color: crimson;
    font-weight: bold;
}

.add-to-cart {
    width: 70px;
    height: 20px;
    margin-right: 20px;
    margin-top: 15px;
	border-radius:5px;
	display:inline-block;
	cursor:pointer;
	font-family:Arial;
	font-size: 10px;
	font-weight:bold;
	text-decoration:none;
    box-sizing: border-box;
    background: transparent;
    border: 2px solid #dcdcdc;
    color:#666666;
    transition: background 0.5s ease-in-out, color 0.5s ease-in-out;
}

.add-to-cart:hover {
    background:linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
    background-color:#666666;
    color: white;
}
.add-to-cart:active {
	position:relative;
	top: 2px;
}

.add-to-cart:focus {
	outline: none;
}
</style>