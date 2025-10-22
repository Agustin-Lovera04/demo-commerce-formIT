"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCartTotals = calculateCartTotals;
function calculateCartTotals(products) {
    const updatedProducts = products.map(p => ({
        ...p,
        subtotal: p.quantity * p.price
    }));
    const total = updatedProducts.reduce((sum, p) => sum + p.subtotal, 0);
    return { products: updatedProducts, total };
}
//# sourceMappingURL=calculateTotalsCart.js.map