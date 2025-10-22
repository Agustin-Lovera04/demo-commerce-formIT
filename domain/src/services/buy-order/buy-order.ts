import { ICart } from "../../entities";
import { IOrder } from "../../entities/order";
import { Service, Response } from "../../utils";

export interface BuyOrderService extends Service<IOrder>{
   genBuyOrder:(cart:ICart)=>Promise<Response<IOrder>>
}