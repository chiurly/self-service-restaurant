async function loadProducts() {
    const response = await fetch('/products');
    const data = await response.json();
    const productList = data.products;
    const htmlList = document.body.querySelector(".list");

    for (const index in productList) {
        const productName = productList[index];
        let listItem = document.createElement('li');
        listItem.textContent = productName;
        htmlList.appendChild(listItem)
    }
}

loadProducts();