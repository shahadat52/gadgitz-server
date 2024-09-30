import mongoose, { Schema } from "mongoose";
import { TOrder } from "./booking.interface";


const productSchema = new mongoose.Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
}, { _id: false });
const OrderSchema: Schema = new Schema<TOrder>({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [productSchema],
    address: { type: String, required: true },
}, {
    timestamps: true,
});

export const OrderModel = mongoose.model('Order', OrderSchema);