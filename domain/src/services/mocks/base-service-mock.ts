import { Entity, Response } from "../../utils/index";

export class BaseServiceMock<TEntity extends Entity> {
  protected items: TEntity[];

  constructor(initialItems: TEntity[] = []) {
    this.items = initialItems;
  }

  async findAll(): Promise<Response<TEntity[]>> {
    return { success: true, data: this.items };
  }

  async findById(id: string): Promise<Response<TEntity>> {
    const item = this.items.find(i => i.id === id);
    if (!item) return { success: false, error: "Not found" };
    return { success: true, data: item };
  }

  async create(payload: Omit<TEntity, "id">): Promise<Response<TEntity>> {
    const newItem = { id: crypto.randomUUID(), ...payload } as TEntity;
    this.items.push(newItem);
    return { success: true, data: newItem };
  }

  async editOne(id: string, payload: Partial<TEntity>): Promise<Response<TEntity>> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return { success: false, error: "Not found" };

    const updateItem: TEntity = { ...this.items[index], ...payload } as TEntity 
    this.items[index] = updateItem 
    return { success: true, data: this.items[index] };
  }

  async deleteOne(id: string): Promise<Response<void>> {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return { success: false, error: "Not found" };

    const [deleted] = this.items.splice(index, 1);
    return { success: true, data:  undefined};
  }
}