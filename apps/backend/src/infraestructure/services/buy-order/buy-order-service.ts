import { ICart, IOrder, Response, BuyOrderService } from '../../../../../../domain/dist';
import { OrderModel } from '../../../models/buy-order';

function mapOrder(order: any): IOrder {
  return {
    id: order._id.toString(),
    products: order.products,
    total: order.total,
  };
}

export class BuyOrderServiceReal implements BuyOrderService {
  
  async genBuyOrder(cart: ICart): Promise<Response<IOrder>> {
    try {
      const orderData = {
        cartId: cart.id,
        products: cart.products,
        total: cart.total
      };
      const savedOrder = await OrderModel.create(orderData);
      return { success: true, data: mapOrder(savedOrder) };

    } catch (error: any) {
      return { 
        success: false, 
        error: "Error generating order" 
      };
    }
  }

  async findAll(): Promise<Response<IOrder[]>> {
    try {
      const orders = await OrderModel.find().lean();
      return { success: true, data: orders.map(mapOrder) };
    } catch (error) {
      return { success: false, error: "Error fetching orders" };
    }
  }

  async findById(id: string): Promise<Response<IOrder>> {
    try {
      const order = await OrderModel.findById(id).lean();
      if (!order) return { success: false, error: "Order not found" };
      return { success: true, data: mapOrder(order) };
    } catch (error) {
      return { success: false, error: "Error fetching order" };
    }
  }

  async create(payload: Omit<IOrder, "id">): Promise<Response<IOrder>> {
    try {
      const order = await OrderModel.create(payload);
      return { success: true, data: mapOrder(order) };
    } catch (error) {
      return { success: false, error: "Error creating order" };
    }
  }

  async editOne(id: string, payload: Partial<IOrder>): Promise<Response<IOrder>> {
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        id, 
        payload, 
        { new: true }
      ).lean();
      
      if (!updatedOrder) return { success: false, error: "Order not found" };
      return { success: true, data: mapOrder(updatedOrder) };
    } catch (error) {
      return { success: false, error: "Error updating order" };
    }
  }

  async deleteOne(id: string): Promise<Response<void>> {
    try {
      const deletedOrder = await OrderModel.findByIdAndDelete(id).lean();
      if (!deletedOrder) return { success: false, error: "Order not found" };
      return { success: true, data: undefined };
    } catch (error) {
      return { success: false, error: "Error deleting order" };
    }
  }
}