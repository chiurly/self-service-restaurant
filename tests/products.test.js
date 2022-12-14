const http = require('http');

async function getRequest(path) {
    return new Promise(function(resolve, reject) {
        http.get('http://localhost:3000' + path, function(response) {
            let str = ''
            
            response.on('data', function(chunk) {
                str += chunk;
            });
            
            response.on('end', function() {
                resolve(str);
            });
        });
    });
}

test('database returns product list', async () => {
    const response = await getRequest('/api/products');
    const productList = JSON.parse(response);
    expect(productList).toBeDefined();
    expect(productList.length).toBeGreaterThan(0);
});

test('all products in product list have necessary properties', async () => {
    const response = await getRequest('/api/products');
    const productList = JSON.parse(response);

    for (const index in productList) {
        const object = productList[index]
        expect(object).toHaveProperty('name');
        expect(object.name).toBeDefined();

        expect(object).toHaveProperty('type');
        expect(object.type).toBeDefined();

        expect(object).toHaveProperty('price');
        expect(object.price).toBeDefined();
        expect(object.price).toBeGreaterThan(0);

        expect(object).toHaveProperty('image');
        expect(object.image).toBeDefined();
        expect(object.image).not.toEqual('shopping-cart');
    }
});
