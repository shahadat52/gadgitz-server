import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";


const VehicleType = {
    Car: 'car',
    Truck: 'truck',
    SUV: 'SUV',
    Van: 'van',
    Motorcycle: 'motorcycle',
    Bus: 'bus',
    ElectricVehicle: 'electricVehicle',
    HybridVehicle: 'hybridVehicle',
    Bicycle: 'bicycle',
    Tractor: 'tractor'
}
const BookingSchema: Schema = new Schema<TBooking>({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    slot: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
    vehicleType: { type: String, enum: Object.values(VehicleType), required: true },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

export const BookingModel = mongoose.model('Booking', BookingSchema);