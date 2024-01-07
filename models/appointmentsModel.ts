import mongoose from "mongoose";

export interface IAppointment{
    _id?:string,
    category:string,
    bookDate:Date,
    type:string,
    office:string,
    province:number,
    stautes:string,
    payment:mongoose.Schema.Types.ObjectId,
    biometric: Array<{}>,
    medical: Array<{}>,
    trial: Array<{}>,
    written: Array<{}>,
}

const appointmentSchema = new mongoose.Schema<IAppointment>({
    category:{ type:String, required:true },
    bookDate:{ type:Date, required:true },
    type:{ type:String, required:true },
    office:{ type:String, required:true },
    province:{ type:Number, required:true },
    stautes:{ type:String, required:true },
    payment:{ type:mongoose.Schema.Types.ObjectId,
        ref:'payment'},
    biometric:[],
    medical:[],
    trial:[],
    written:[]

})

export const Appointment = mongoose.models.appointment || mongoose.model<IAppointment>('appointment', appointmentSchema) 