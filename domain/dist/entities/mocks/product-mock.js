"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productMock = productMock;
const faker_1 = require("@faker-js/faker");
function productMock(data) {
    return {
        id: crypto.randomUUID(),
        title: faker_1.faker.commerce.product(),
        price: faker_1.faker.number.int({ max: 10000, min: 5000 }),
        stock: true,
        ...data,
    };
}
//# sourceMappingURL=product-mock.js.map