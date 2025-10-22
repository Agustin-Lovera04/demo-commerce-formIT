import { Entity, Response } from "../../utils/index";
export declare class BaseServiceMock<TEntity extends Entity> {
    protected items: TEntity[];
    constructor(initialItems?: TEntity[]);
    findAll(): Promise<Response<TEntity[]>>;
    findById(id: string): Promise<Response<TEntity>>;
    create(payload: Omit<TEntity, "id">): Promise<Response<TEntity>>;
    editOne(id: string, payload: Partial<TEntity>): Promise<Response<TEntity>>;
    deleteOne(id: string): Promise<Response<void>>;
}
//# sourceMappingURL=base-service-mock.d.ts.map