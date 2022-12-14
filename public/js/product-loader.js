let selectedProductArray = [];

function updatePriceText() {
    const priceText = document.body.querySelector(".checkout-button");
    priceText.innerHTML = selectedProductArray.length + " Apmokėti";
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

    updatePriceText();
}

async function loadProducts() {
    const response = await fetch('/api/products');
    const productList = await response.json();
    const productListDiv = document.body.querySelector(".product-list");

    console.log(productList);

    for (const index in productList) {
        const productName = productList[index].name;
        const imageName = productList[index].image;

        let productDiv = document.createElement('div');
        productDiv.className = 'product';

        let image = document.createElement('img');
        image.alt = productName;
        image.src = './img/' + imageName + '.png';
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
