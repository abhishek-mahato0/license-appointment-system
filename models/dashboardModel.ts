import mongoose from "mongoose";

export interface IApp{
    morning:{
        completed:Number,
        remaining:Number,
        passed:Number,
        failed:Number
    },
    evening:{
        completed:Number,
        remaining:Number,
        passed:Number,
        failed:Number
    },
    afternoon:{
        completed:Number,
        remaining:Number,
        passed:Number,
        failed:Number
    },
}
export interface IDashboardSchema{
    _id?:string,
    date:string,
    category:string,
    office:string,
    medical:IApp,
    written:IApp,
    trial:IApp
}
const dashboardSchema= new mongoose.Schema<IDashboardSchema>({
    date:{type: String, required:true},
    category:{ type:String, required:true},
    office: { type:String, required:true},
    medical:{ type:Object, required:true},
    written:{ type:Object, required:true},
    trial:{ type:Object, required:true}

})

export const DashboardLog = mongoose.models.dashboardlog || mongoose.model<IDashboardSchema>(
    "dashboardlog", dashboardSchema
)