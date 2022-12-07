let selectedProductArray = [];

function updateShoppingCartDisplay() {
    const priceDiv = document.body.querySelector(".price");
    priceDiv.innerHTML = selectedProductArray.length;
}

function onProductClick(productDiv, productName) {
    if (productDiv.className == 'product-selected') {
        productDiv.className = 'product';
        const index = selectedProductArray.indexOf(productName);

        if (index > -1) {
            selectedProductArray.splice(index, 1);
        }
    } else {
        productDiv.className = 'product-selected';
        selectedProductArray.push(productName);
    }

    updateShoppingCartDisplay();
}

async function loadProducts() {
    const response = await fetch('/products');
    const data = await response.json();
    const productList = data.products;
    const productListDiv = document.body.querySelector(".product-list");

    for (const index in productList) {
        const productName = productList[index];
        let productDiv = document.createElement('div');
        productDiv.className = 'product';
        let image = document.createElement('img');
        image.alt = productName;
        image.src = '/images/' + productName + '.png';
        image.style.maxWidth = '256px';
        image.style.maxHeight = '256px';
        image.setAttribute('draggable', false);
        image.style.userSelect = 'none';
        productDiv.addEventListener('click', function() { onProductClick(productDiv, productName) } );
        productDiv.appendChild(image);
        productListDiv.appendChild(productDiv);
    }
}

loadProducts();
