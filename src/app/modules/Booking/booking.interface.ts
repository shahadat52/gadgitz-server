import { Types } from 'mongoose';

type product = {
    product: string,
    quantity: number
}
export type TOrder = {
    customer: Types.ObjectId;
    products: [product];
    address: string;

}

