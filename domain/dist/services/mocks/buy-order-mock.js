"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyOrderServiceMock = void 0;
const base_service_mock_1 = require("./base-service-mock");
class BuyOrderServiceMock extends base_service_mock_1.BaseServiceMock {
    async genBuyOrder(cart) {
        const { id, ...cartOrderFields } = cart;
        const order = {
            id: 'Id orden',
            ...cartOrderFields
        };
        return { success: true, data: order };
    }
}
exports.BuyOrderServiceMock = BuyOrderServiceMock;
//# sourceMappingURL=buy-order-mock.js.map