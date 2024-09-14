import mongoose, { Schema } from 'mongoose'
import { TService } from './service.interface';

const serviceSchema = new Schema<TService>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    features: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const ServiceModel = mongoose.model('Product', serviceSchema);

