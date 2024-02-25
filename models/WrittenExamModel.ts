import mongoose from "mongoose";
export interface IWrittenSchema{
    _id: string,
    date:string,
    category:string,
    office:string,
    status:string,
    shift:string,
    user_id:mongoose.Schema.Types.ObjectId,
    tracking_id:string
}
const WrittenSchema = new mongoose.Schema<IWrittenSchema>({
    tracking_id:{ type:String, required:true },
    user_id:{ type:mongoose.Schema.Types.ObjectId, ref:"user", required:true },
    date:{ type:String, required:true},
    category:{ type:String, required:true},
    office:{ type:String, required:true},
    status:{ type:String, required:true},
    shift:{ type:String, required:true}
})

export const WrittenModal = mongoose.models.written || mongoose.model<IWrittenSchema>(
    "written", WrittenSchema
);