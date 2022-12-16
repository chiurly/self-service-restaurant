let selectedProductArray = [];

function getTotalCost() {
    let sum = 0;

    for (index in selectedProductArray) {
        const productObject =  selectedProductArray[index];
        sum += productObject.price;
    }

    return sum;
}

function updatePriceText() {
    const priceText = document.body.querySelector(".checkout-button");
    priceText.innerHTML = getTotalCost() + " € Apmokėti";
}

function onProductClick(productDiv, productObject) {
    if (productDiv.className == 'product-selected') {
        productDiv.className = 'product';
        const index = selectedProductArray.indexOf(productObject);

        if (index > -1) {
            selectedProductArray.splice(index, 1);
        }
    } else {
        productDiv.className = 'product-selected';
        selectedProductArray.push(productObject);
    }

    updatePriceText();
}

async function loadProducts() {
    const response = await fetch('/api/products');
    const productList = await response.json();
    const productListDiv = document.body.querySelector(".product-list");
    
    for (const index in productList) {
        const productObject = productList[index]
        const productName = productObject.name;
        const imageName = productObject.image;
        const productPrice = productObject.price;

        let productDiv = document.createElement('div');
        productDiv.className = 'product';

        let image = document.createElement('img');
        image.alt = productName;
        image.src = './img/' + imageName + '.png';
        image.style.maxWidth = '256px';
        image.style.maxHeight = '256px';
        image.setAttribute('draggable', false);
        image.style.userSelect = 'none';

        let title = document.createElement('p')
        title.textContent = productName + ' ' + productPrice + ' €';
        
        productDiv.addEventListener('click', function() { onProductClick(productDiv, productObject) } );
        productDiv.appendChild(image);
        productDiv.appendChild(title);
        productListDiv.appendChild(productDiv);
    }
}

loadProducts();
updatePriceText();
