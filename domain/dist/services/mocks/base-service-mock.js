"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseServiceMock = void 0;
class BaseServiceMock {
    items;
    constructor(initialItems = []) {
        this.items = initialItems;
    }
    async findAll() {
        return { success: true, data: this.items };
    }
    async findById(id) {
        const item = this.items.find(i => i.id === id);
        if (!item)
            return { success: false, error: "Not found" };
        return { success: true, data: item };
    }
    async create(payload) {
        const newItem = { id: crypto.randomUUID(), ...payload };
        this.items.push(newItem);
        return { success: true, data: newItem };
    }
    async editOne(id, payload) {
        const index = this.items.findIndex(i => i.id === id);
        if (index === -1)
            return { success: false, error: "Not found" };
        const updateItem = { ...this.items[index], ...payload };
        this.items[index] = updateItem;
        return { success: true, data: this.items[index] };
    }
    async deleteOne(id) {
        const index = this.items.findIndex(i => i.id === id);
        if (index === -1)
            return { success: false, error: "Not found" };
        const [deleted] = this.items.splice(index, 1);
        return { success: true, data: undefined };
    }
}
exports.BaseServiceMock = BaseServiceMock;
//# sourceMappingURL=base-service-mock.js.map