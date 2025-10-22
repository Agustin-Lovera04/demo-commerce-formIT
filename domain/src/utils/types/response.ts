export type Response<TEntity> = { success: true, data: TEntity} | { success: false, error: string }
