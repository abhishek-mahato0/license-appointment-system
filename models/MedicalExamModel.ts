import mongoose from "mongoose";

export interface IMedicalSchema{
    _id: string,
    date:string,
    category:string,
    office:string,
    status:string,
    shift:string,
}
const medicalSchema = new mongoose.Schema<IMedicalSchema>({
    date:{ type:String, required:true},
    category:{ type:String, required:true},
    office:{ type:String, required:true},
    status:{ type:String, required:true},
    shift:{ type:String, required:true},

})

export const MedicalModal = mongoose.models.medical || mongoose.model<IMedicalSchema>(
    "medical", medicalSchema
);