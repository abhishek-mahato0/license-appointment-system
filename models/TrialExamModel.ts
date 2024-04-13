import mongoose from "mongoose";

export interface ITrailSchema{
    _id: string,
    date:string,
    category:string,
    office:string,
    status:string,
    shift:string,
    user_id:mongoose.Schema.Types.ObjectId,
    tracking_id:string
}
const TrailSchema = new mongoose.Schema<ITrailSchema>({
    date:{ type:String, required:true},
    category:{ type:String, required:true},
    office:{ type:String, required:true},
    status:{ type:String, required:true},
    shift:{ type:String, required:true},
    user_id:{ type:mongoose.Schema.Types.ObjectId, ref:"user", required:true },
    tracking_id:{ type:String, required:true }

})

export const TrailModal = mongoose.models.trail || mongoose.model<ITrailSchema>(
    "trial", TrailSchema
);