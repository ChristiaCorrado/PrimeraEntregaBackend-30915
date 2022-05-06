const { default: faker } = require("@faker-js/faker");




class randomMocker {

    constructor(amount) {
        this.amount = amount;
    }
    
    generateRandomProducts() {
        const randomProducts = [];
        
        for (let i = 0; i < this.amount; i++) {
            const randomProduct = {
                id: faker.datatype.uuid(),
                timestamp: faker.datatype.datetime(),
                title: faker.vehicle.vehicle(),
                price: faker.datatype.number({min: 1000, max: 10000}),
                description: faker.lorem.sentence(5),
                code: faker.datatype.hexadecimal(),
                image: faker.image.imageUrl(400,600,'car', true),
                stock: faker.datatype.number({min: 10, max:100})
            }
            randomProducts.push(randomProduct);        
        }
        console.log(randomProducts);
    
        return randomProducts;
    }
}

module.exports = randomMocker