import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from 'bcrypt';

const createUserInDB = async (data: TUser) => {
    const hash = bcrypt.hashSync(data.password, 10);
    data.password = hash
    const result = await UserModel.create(data);

    return result
};

const getAllUsersFromDB = async () => {
    const result = await UserModel.find();
    return result
};

const getAllUsersByIdFromDB = async (id: string) => {
    const result = await UserModel.findById(id);
    return result
};

const updateUserRoleInDB = async (id: string) => {
    const result = await UserModel.findById(id);
    const newRole = result?.role === 'admin' ? 'user' : 'admin';
    const updatedData = await UserModel.findByIdAndUpdate(id, { role: newRole }, { new: true })

    return updatedData
};

const updateProfileInDB = async (id: string, payload: TUser) => {
    const result = await UserModel.findOneAndUpdate(
        { _id: id },
        { $set: payload },
        { new: true, upsert: true }
    );
    return result
};

export const userServices = {
    createUserInDB,
    getAllUsersFromDB,
    getAllUsersByIdFromDB,
    updateProfileInDB,
    updateUserRoleInDB
}