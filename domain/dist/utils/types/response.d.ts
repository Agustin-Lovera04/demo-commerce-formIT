export type Response<TEntity> = {
    success: true;
    data: TEntity;
} | {
    success: false;
    error: string;
};
//# sourceMappingURL=response.d.ts.map