const goods = [
    { title: "Робот-пылесос Xiaomi", price: 20000, img: 'https://via.placeholder.com/150' },
    { title: "Смартфон Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/150' },
    { title: "Стиральная машина Hotpoint", price: 32000, img: 'https://via.placeholder.com/150' },
    { title: "Умные часы Apple watch", price: 26000, img: 'https://via.placeholder.com/150' },
    { title: "Умный дом от Fibaro", price: 155000, img: 'https://via.placeholder.com/150' },
    { title: "Умный Холодильник Bork", price: 50000, img: 'https://via.placeholder.com/150' },
    { title: "Робот-пылесос Xiaomi", price: 20000, img: 'https://via.placeholder.com/150' },
    { title: "Смартфон Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/150' },
    { title: "Стиральная машина Hotpoint", price: 32000, img: 'https://via.placeholder.com/150' },
    { title: "Умные часы Apple watch", price: 26000, img: 'https://via.placeholder.com/150' },
    { title: "Умный дом от Fibaro", price: 155000, img: 'https://via.placeholder.com/150' },
    { title: "Умный Холодильник Bork", price: 50000, img: 'https://via.placeholder.com/150' },
];

const renderGoodsItem = (title, price, img = '') => {
    return `<div class="goods-item">
        <img src="${img}" alt="alt">
        <h3>${title}</h3>
        <p>${price}</p>
    </div>`
};

const renderGoodsList = (list, container) => {
    const goodsList = list.map(good => renderGoodsItem(good.title, good.price, good.img));
    document.querySelector(container).innerHTML = goodsList.join(''); // Объединяем элементы массива
};

renderGoodsList(goods, '.goods-list');
