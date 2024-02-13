import mongoose from "mongoose";

interface ITrailSchema{
    _id: string,
    date:string,
    category:string,
    office:string,
    status:string,
    shift:string,
}
const TrailSchema = new mongoose.Schema<ITrailSchema>({
    date:{ type:String, required:true},
    category:{ type:String, required:true},
    office:{ type:String, required:true},
    status:{ type:String, required:true},
    shift:{ type:String, required:true}

})

export const TrailModal = mongoose.models.trail || mongoose.model<ITrailSchema>(
    "trail", TrailSchema
);