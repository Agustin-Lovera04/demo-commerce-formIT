import mongoose from "mongoose";
import { IProduct } from "../../../../domain/dist";
export declare const ProductModel: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct, {}, {}> & IProduct & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=products-model.d.ts.map