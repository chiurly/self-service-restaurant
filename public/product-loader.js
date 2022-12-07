function onProductClick(productDiv, productName) {
    if (productDiv.className == 'product-selected') {
        productDiv.className = 'product';
    } else {
        productDiv.className = 'product-selected';
    }
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
        image.addEventListener('click', function() { onProductClick(productDiv, productName) } );
        productDiv.appendChild(image);
        productListDiv.appendChild(productDiv);
    }
}

loadProducts();
