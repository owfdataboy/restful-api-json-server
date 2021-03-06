const { date } = require("faker");
const faker = require("faker");
const fs = require("fs");
// set locale to use Vietnamese
faker.locale = "vi";

const generateCategories = (n) => {
    const categoryList = [];

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        categoryList.push(category);
    });

    return categoryList;
};

const generateProducts = (categoryList, n) => {
    const productList = [];

    categoryList.forEach((category) => {
        Array.from(new Array(n)).forEach(() => {
            const product = {
                id: faker.datatype.uuid(),
                categoryId: category.id,
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: `${faker.image.imageUrl(
                    400,
                    400
                )}?random=${Math.round(Math.random() * 1000)}`,
            };

            productList.push(product);
        });
    });

    return productList;
};

// generate data
(() => {
    const categoryList = generateCategories(6);
    const productList = generateProducts(categoryList, 10);
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Giai Vi",
        },
    };

    fs.writeFile("./db.json", JSON.stringify(db), () => {
        console.log("Generate successfully");
    });
})();
