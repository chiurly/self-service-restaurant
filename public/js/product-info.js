async function getProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    return products;
}

function createProductInfo(product) {
    let orderListElement = document.body.querySelector('.product-list');
    
    let productParent = document.createElement('ol');
    productParent.textContent = product.name;
    orderListElement.append(productParent);

    let propertyElements = document.createElement('ul')
    productParent.append(propertyElements);

    for (index in product) {
        if (!index.includes('_')) {
            let property = document.createElement('li');
            property.textContent = index + ': ' + product[index];
            propertyElements.append(property);
        }
    }
}

async function showProducts() {
    const products = await getProducts();

    for (index in products) {
        createProductInfo(products[index]);
    }
}

showProducts();