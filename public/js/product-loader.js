let selectedProductArray = [];

function getTotalCost() {
    let sum = 0;

    for (index in selectedProductArray) {
        const productObject =  selectedProductArray[index];
        sum += productObject.price;
    }

    return sum;
}

function getIdArrayFromSelectedObjects() {
    let idArray = [];

    for (index in selectedProductArray) {
        const productObject =  selectedProductArray[index];
        idArray.push(productObject._id);
    }

    return idArray;
}

function updatePriceText() {
    const priceText = document.body.querySelector(".checkout-button");
    priceText.innerHTML = getTotalCost() + " € Apmokėti";
}

function sendOrder() {
    const jsonString = JSON.stringify({ products: getIdArrayFromSelectedObjects() })
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/orders', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonString);
}

function resetToDefaultState() {
    const productListDiv = document.body.querySelector(".product-list");
    const productDivs = productListDiv.children;

    for (const index in productDivs) {
        productDivs[index].className = 'product';
    }
    
    selectedProductArray = [];
    updatePriceText();
}

function removeProduct(selectedProductDiv, productObject) {
    selectedProductDiv.remove();
    const index = selectedProductArray.indexOf(productObject);

    if (index > -1) {
        selectedProductArray.splice(index, 1);
    }

    updatePriceText();
}

function addProduct(productObject) {
    const selectedProductsDiv = document.body.querySelector('.selected-products');
    let removeButton = document.createElement('button');
    removeButton.innerText = 'x';    
    
    let addedProductDiv = document.createElement('div');
    addedProductDiv.innerText = productObject.name + ' ' + productObject.price + ' € ';
    addedProductDiv.appendChild(removeButton);
    
    selectedProductsDiv.appendChild(addedProductDiv);
    selectedProductArray.push(productObject);
    
    updatePriceText();

    removeButton.addEventListener('click', function() {
        removeProduct(addedProductDiv, productObject) 
    });
}

function onProductClick(productDiv, productObject) {
    addProduct(productObject);
}

function onCheckoutClick() {
    sendOrder();
    resetToDefaultState();
}

async function loadProducts() {
    const response = await fetch('/api/products');
    const productList = await response.json();
    const productListDiv = document.body.querySelector('.product-list');
    
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

function enableCheckoutButton() {
    const checkOutButton = document.body.querySelector('.checkout');
    checkOutButton.addEventListener('click', onCheckoutClick );
}

loadProducts();
updatePriceText();
enableCheckoutButton();
