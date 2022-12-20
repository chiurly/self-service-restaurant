const CHECK_TIME = 10000; // miliseconds

let currentTime = new Date();
let currentOrder = 1;

async function getOrders() {
    const response = await fetch('/api/orders');
    const orders = await response.json();
    return orders;
}

function notifyOrder() {
    let orderListElement = document.body.querySelector('.ready-orders');
    let listElement = document.createElement('ol');
    listElement.textContent = currentOrder;
    orderListElement.insertBefore(listElement, orderListElement.firstChild);
    currentOrder++;
}

async function checkForNewOrders() {
    const orders = await getOrders();
    const completedOrders = orders.filter(order => order.dateCompleted != null);
    const newOrders = completedOrders.filter(completedOrder => new Date(completedOrder.dateCompleted) >= currentTime);

    for (order in newOrders) {
        notifyOrder();
    }

    currentTime = new Date();
}

setInterval(checkForNewOrders, CHECK_TIME);