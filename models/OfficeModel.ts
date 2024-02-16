import mongoose from "mongoose"

type IOffice={
    _id?: string,
    name: string,
    address: string,
    province: number,
    district: number,
}

const officeSchema = new mongoose.Schema<IOffice>({
    name:{ type:String, required:true},
    address:{ type:String, required:true},
    province:{ type:Number, required:true},
    district:{ type:Number, required:true},
})

export const OfficeModel = mongoose.models.office || mongoose.model<IOffice>("office", officeSchema)