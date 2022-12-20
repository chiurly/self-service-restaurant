let currentTime = new Date();
let currentOrder = 1;

async function getOrders() {
    const response = await fetch('/api/orders');
    const orders = await response.json();
    return orders;
}

async function checkNewOrders() {
    const orders = await getOrders();
    const completedOrders = orders.filter(order => order.dateCompleted != null);
    console.log(completedOrders);
}