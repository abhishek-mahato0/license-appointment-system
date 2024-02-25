import mongoose from "mongoose";

export interface IAdministrator {
    _id?: string;
    name:string;
    username: string;
    password?: string;
    role: string;
    province: number;
    office: Array< mongoose.Schema.Types.ObjectId>;
    forgetPasswordToken?: string;
    createdBy:mongoose.Schema.Types.ObjectId
}

const schema = new mongoose.Schema<IAdministrator>({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'superadmin',"editor"]},
    province: { type: Number, required: true },
    office:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"office",
        required: true
        }
    ],
    forgetPasswordToken: { type: String, required: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "administrator" }
})

export const Administrator = mongoose.models.administrator || mongoose.model<IAdministrator>("administrator", schema);