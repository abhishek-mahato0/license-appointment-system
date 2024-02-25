import mongoose from "mongoose"

export type IOffice={
    _id?: string,
    name: string,
    address: string,
    province: number,
    district: number,
    createdBy: mongoose.Schema.Types.ObjectId;
}

const officeSchema = new mongoose.Schema<IOffice>({
    name:{ type:String, required:true},
    address:{ type:String, required:true},
    province:{ type:Number, required:true},
    district:{ type:Number, required:true},
    createdBy:{ type:mongoose.Schema.Types.ObjectId, ref:"administrator", required:true}
})

export const OfficeModel = mongoose.models.office || mongoose.model<IOffice>("office", officeSchema)