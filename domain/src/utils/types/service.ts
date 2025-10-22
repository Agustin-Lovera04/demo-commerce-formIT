import { Entity } from "./entity";
import { Response } from "./response";


export interface Service<TEntity extends Entity> {
    findAll: () => Promise<Response<TEntity[]>>,
    findById:(id: string) => Promise<Response<TEntity>>
    editOne: (id:string, payload: Partial<TEntity>) => Promise<Response<TEntity>>
    create: (payload: Omit<TEntity, 'id'>) => Promise<Response<TEntity>>
    deleteOne: (id: string) => Promise<Response<TEntity>>
}


