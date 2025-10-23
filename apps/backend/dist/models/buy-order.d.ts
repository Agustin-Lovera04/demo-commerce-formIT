import mongoose from "mongoose";
export declare const OrderModel: mongoose.Model<{
    cartId: string;
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }> & {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }>;
    total: number;
    createdAt: NativeDate;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    cartId: string;
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }> & {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }>;
    total: number;
    createdAt: NativeDate;
}, {}, mongoose.DefaultSchemaOptions> & {
    cartId: string;
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }> & {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }>;
    total: number;
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    cartId: string;
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }> & {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }>;
    total: number;
    createdAt: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    cartId: string;
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }> & {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }>;
    total: number;
    createdAt: NativeDate;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    cartId: string;
    products: mongoose.Types.DocumentArray<{
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }> & {
        product: string;
        quantity: number;
        price: number;
        subtotal: number;
    }>;
    total: number;
    createdAt: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=buy-order.d.ts.map