async function getOrders() {
    const response = await fetch('/api/orders');
    const orders = await response.json();
    return orders;
}

async function getProductsStringFromIdArray(idArray) {
    let products = '';

    for (const index in idArray) {
        const id = idArray[index];
        const response = await fetch('/api/products/' + id);
        const product = await response.json();
        products += product.name;
        
        if (index != idArray.length - 1) {
            products += ", "
        }
    }

    return products;
}

async function loadOrders() {
    const orders = await getOrders();
    const orderListHtmlElement = document.body.querySelector('.order-list');

    for (const index in orders) {
        let orderId = orders[index]._id;
        let orderTitle = await getProductsStringFromIdArray(orders[index].products);
        let listElement = document.createElement('li');
        listElement.textContent = orderTitle;
        orderListHtmlElement.appendChild(listElement);
    }
}

loadOrders();