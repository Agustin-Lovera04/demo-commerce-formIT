import { IProduct } from "../../entities";
import { Response } from "../../utils/index";
import { ProductsService } from "../products/products-service";
import { BaseServiceMock } from "./base-service-mock";

export class ProductsServiceMock extends BaseServiceMock<IProduct> implements ProductsService {
    constructor(initialProducts: IProduct[] = []) {
        super(initialProducts)
    }

    async validFields(payload: object): Promise<Response<boolean>> {
        try {
            const validFields = ['id', 'title', 'price', 'stock'];

            for (const key in payload) {
                if (!validFields.includes(key)) {
                    return { success: false, error: 'Invalid fields' };
                }

                const value = (payload as any)[key];

                switch (key) {
                    case 'id':
                    case 'title':
                        if (typeof value !== 'string') {
                            return { success: false, error: `Invalid type for ${key}, expected string` };
                        }
                        break;
                    case 'price':
                        if (typeof value !== 'number' || isNaN(value)) {
                            return { success: false, error: 'Invalid type for price, expected number' };
                        }
                        break;
                    case 'stock':
                        if (typeof value !== 'boolean') {
                            return { success: false, error: 'Invalid type for stock, expected boolean' };
                        }
                        break;
                }
            }

            return { success: true, data: true };
        } catch (error) {
            return { success: false, error: 'Unexpected error while validating fields' };
        }
    }

    async findProductByTitle (title: string):  Promise<Response<boolean>> {
        try {
            const findProduct = this.items.find(p => p.title == title)
            if(!findProduct){
                return {success: true, data: false}
            }
            return {success: true, data:  true}
        } catch (error) {   
            return {success: false, error: 'Unexpected error while find product by title'}
        }
    }

}