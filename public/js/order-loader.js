async function getOrders() {
    const response = await fetch('/api/orders/incomplete');
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
            products += ', '
        } else {
            products += ' '
        }
    }

    return products;
}

function completeOrder(orderObject) {
    const jsonString = JSON.stringify({ 
        dateCreated: orderObject.dateCreated,
        dateCompleted: new Date().toISOString(),
        products: orderObject.products
    });

    let xhr = new XMLHttpRequest();
    xhr.open("PATCH", '/api/orders/' + orderObject._id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonString);
}

async function addOrderToList(orderObject) {
    const orderListHtmlElement = document.body.querySelector('.order-list');

    let orderTitle = await getProductsStringFromIdArray(orderObject.products);
    let listElement = document.createElement('li');
    listElement.textContent = orderTitle;
    
    let completeButton = document.createElement('button');
    completeButton.innerText = 'Baigtas';
    listElement.appendChild(completeButton);

    orderListHtmlElement.appendChild(listElement);

    completeButton.addEventListener('click', function() { 
        listElement.remove();
        completeOrder(orderObject);
    })
}

async function addOrderToPendingList(orderObject) {
    const orderListHtmlElement = document.body.querySelector('.pending-order-list');

    let orderTitle = await getProductsStringFromIdArray(orderObject.products);
    let listElement = document.createElement('li');
    listElement.textContent = orderTitle;
    
    let toDoButton = document.createElement('button');
    toDoButton.innerText = 'Vykdyti';
    listElement.appendChild(toDoButton);

    orderListHtmlElement.appendChild(listElement);

    toDoButton.addEventListener('click', function() { 
        listElement.remove();
        addOrderToList(orderObject);
    })
}

async function loadOrders() {
    const orders = await getOrders();
    const orderListHtmlElement = document.body.querySelector('.order-list');

    for (const index in orders) {
        addOrderToPendingList(orders[index]);
    }
}

loadOrders();