import mongoose from "mongoose";

export interface IMedicalSchema{
    _id: string,
    date:string,
    category:string,
    office:string,
    status:string,
    shift:string,
    user_id:mongoose.Schema.Types.ObjectId,
    tracking_id:string
}
const medicalSchema = new mongoose.Schema<IMedicalSchema>({
    tracking_id:{ type:String, required:true },
    user_id:{ type:mongoose.Schema.Types.ObjectId, ref:"user", required:true },
    date:{ type:String, required:true},
    category:{ type:String, required:true},
    office:{ type:String, required:true},
    status:{ type:String, required:true, enum:['pending','failed','passed', 'rescheduled']},
    shift:{ type:String, required:true},

})

export const MedicalModal = mongoose.models.medical || mongoose.model<IMedicalSchema>(
    "medical", medicalSchema
);