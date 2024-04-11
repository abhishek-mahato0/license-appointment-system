import mongoose from "mongoose"

export type IRenew={
    _id?: string,
    tracking_id: string,
    license_no: string,
    province: number,
    office: mongoose.Schema.Types.ObjectId;
    date: Date,
    status:string,
}

const renewSchema = new mongoose.Schema<IRenew>({
    tracking_id:{ type:String, required:true},
    license_no:{ type:String, required:true},
    province:{ type:Number, required:true},
    office:{ type:mongoose.Schema.Types.ObjectId, required:true},
    status:{ type:String, default:"pending", enum:["pending", "passed", "failed"]},
    date:{ type:Date, default:Date.now()},
    
})

export const RenewModel = mongoose.models.renew || mongoose.model<IRenew>("renew", renewSchema)