import mongoose, { Document } from "mongoose";
export interface IProduct extends Document {
    title: string;
    price: number;
    stock: boolean;
}
export declare const ProductModel: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct, {}, {}> & IProduct & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=products-model.d.ts.map