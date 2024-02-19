import mongoose from "mongoose";

interface Administrator {
    _id?: string;
    username: string;
    password: string;
    role: string;
    province: number;
    office: Array< mongoose.Schema.Types.ObjectId>;
}

const schema = new mongoose.Schema<Administrator>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'superadmin',"editor"]},
    province: { type: Number, required: true },
    office:{
        type:[ mongoose.Schema.Types.ObjectId],
        ref:"office",
        required: true
    }
})

export const Administrator = mongoose.models.administrator || mongoose.model<Administrator>("administrator", schema);