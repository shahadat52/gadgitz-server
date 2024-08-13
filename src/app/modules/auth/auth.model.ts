import mongoose from "mongoose";
import { TUser } from "./auth.interface";
const Schema = mongoose.Schema;

const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const UserModel = mongoose.model('User', userSchema);
