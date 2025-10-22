import mongoose from "mongoose";
export declare const CartModel: mongoose.Model<{
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }> & {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }>;
    total: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }> & {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }>;
    total: number;
}, {}, mongoose.DefaultSchemaOptions> & {
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }> & {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }>;
    total: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }> & {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }>;
    total: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }> & {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }>;
    total: number;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }> & {
        product: string;
        quantity: number;
        price?: number | null;
        subtotal?: number | null;
    }>;
    total: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=cart-model.d.ts.map