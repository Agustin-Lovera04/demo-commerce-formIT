import { ProductModel } from "../../../models/products-model";
import { ProductsService, IProduct, Response } from "../../../../../../domain/dist/index.js";

function mapProduct(product: any): IProduct {
    return {
        id: product._id?.toString(),
        title: product.title,
        price: product.price,
        stock: product.stock,
    };
}

export class ProductsServiceReal implements ProductsService {

    async findAll(): Promise<Response<IProduct[]>> {
        try {
            const products = await ProductModel.find().lean();
            const mappedProducts = products.map(mapProduct);
            return { success: true, data: mappedProducts };
        } catch (error) {
            return { success: false, error: "Error fetching product" };
        }
    }

    async findById(id: string): Promise<Response<IProduct>> {
        try {
            const product = await ProductModel.findById(id).lean();
            if (!product) return { success: false, error: "Product not found" };
            const mappedProduct = mapProduct(product);
            return { success: true, data: mappedProduct };
        } catch (error) {
            return { success: false, error: "Error fetching product" };
        }
    }

    async create(dataUser: Omit<IProduct, "id">): Promise<Response<IProduct>> {
        try {
            const newUser = await ProductModel.create(dataUser);
            const mappedProduct = mapProduct(newUser);
            return { success: true, data: mappedProduct };
        } catch (error) {
            return { success: false, error: "Error creating product" };
        }
    }
    async editOne(id: string, payload: Partial<IProduct>): Promise<Response<IProduct>> {
        try {
            const { id: _, ...updateData } = payload;

            const updatedProduct = await ProductModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            ).lean();

            if (!updatedProduct) return { success: false, error: "Product not found" };
            return { success: true, data: mapProduct(updatedProduct) };
        } catch (error) {
            return { success: false, error: "Error editing product" };
        }
    }
    async deleteOne(id: string): Promise<Response<void>> {
        try {
            const deleted = await ProductModel.findByIdAndDelete(id).lean();
            if (!deleted) return { success: false, error: "Product not found" };
            return { success: true, data: undefined };
        } catch (error) {
            return { success: false, error: "Error deleting product" };
        }
    }

    async validFields(payload: object): Promise<Response<boolean>> {
        try {
            const validFields = ['id', 'title', 'price', 'stock'];

            for (const key in payload) {
                if (!validFields.includes(key)) {
                    return { success: false, error: `Invalid field: ${key}` };
                }

                const value = (payload as any)[key];

                switch (key) {
                    case 'id':
                    case 'title':
                        if (typeof value !== 'string' || value.trim() === '') {
                            return { success: false, error: 'Invalid title, expected non-empty string' };
                        }
                        break;
                    case 'price':
                        if (typeof value !== 'number' || isNaN(value)) {
                            return { success: false, error: 'Invalid price, expected a number' };
                        }
                        break;
                    case 'stock':
                        if (typeof value !== 'boolean') {
                            return { success: false, error: 'Invalid stock, expected boolean' };
                        }
                        break;
                }
            }

            return { success: true, data: true };
        } catch (error) {
            return { success: false, error: 'Unexpected error while validating fields' };
        }
    }

    async findProductByTitle(title: string): Promise<Response<boolean>> {
        try {
            const product = await ProductModel.findOne({ title }).lean();

            if (!product) {
                return { success: true, data: false };
            }

            return { success: true, data: true };
        } catch (error) {
            return { success: false, error: 'Unexpected error while finding product by title' };
        }
    }
}