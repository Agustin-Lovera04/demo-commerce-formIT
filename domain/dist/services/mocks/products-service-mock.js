"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsServiceMock = void 0;
const base_service_mock_1 = require("./base-service-mock");
class ProductsServiceMock extends base_service_mock_1.BaseServiceMock {
    constructor(initialProducts = []) {
        super(initialProducts);
    }
    async validFields(payload) {
        try {
            const validFields = ['id', 'title', 'price', 'stock'];
            for (const key in payload) {
                if (!validFields.includes(key)) {
                    return { success: false, error: 'Invalid fields' };
                }
                const value = payload[key];
                switch (key) {
                    case 'id':
                    case 'title':
                        if (typeof value !== 'string') {
                            return { success: false, error: `Invalid type for ${key}, expected string` };
                        }
                        break;
                    case 'price':
                        if (typeof value !== 'number' || isNaN(value)) {
                            return { success: false, error: 'Invalid type for price, expected number' };
                        }
                        break;
                    case 'stock':
                        if (typeof value !== 'boolean') {
                            return { success: false, error: 'Invalid type for stock, expected boolean' };
                        }
                        break;
                }
            }
            return { success: true, data: true };
        }
        catch (error) {
            return { success: false, error: 'Unexpected error while validating fields' };
        }
    }
    async findProductByTitle(title) {
        try {
            const findProduct = this.items.find(p => p.title == title);
            if (!findProduct) {
                return { success: true, data: false };
            }
            return { success: true, data: true };
        }
        catch (error) {
            return { success: false, error: 'Unexpected error while find product by title' };
        }
    }
}
exports.ProductsServiceMock = ProductsServiceMock;
//# sourceMappingURL=products-service-mock.js.map