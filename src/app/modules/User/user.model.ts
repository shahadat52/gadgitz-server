import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";

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
        required: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    address: {
        type: String,
        required: false,
        default: ''
    }
}, {
    timestamps: true
});

export const UserModel = mongoose.model('User', userSchema);