import mongoose from "mongoose";

export interface IAppointment{
    _id?:string,
    category:string,
    bookDate:Date,
    type:string,
    office:string,
    province:number,
    status:string,
    payment:mongoose.Schema.Types.ObjectId,
    biometric: string,
    medical: mongoose.Schema.Types.ObjectId,
    trial: mongoose.Schema.Types.ObjectId,
    written: mongoose.Schema.Types.ObjectId,
    tracking_id:string;
    user_id:mongoose.Schema.Types.ObjectId;
}

const appointmentSchema = new mongoose.Schema<IAppointment>({
    user_id:{ type:mongoose.Schema.Types.ObjectId, ref:"user", required:true },
    tracking_id:{ type:String, required:true },
    category:{ type:String, required:true },
    bookDate:{ type:Date, required:true },
    type:{ type:String, required:true },
    office:{ type:String, required:true },
    province:{ type:Number, required:true },
    status:{ type:String, required:true, default:'pending' },
    payment:{ type:mongoose.Schema.Types.ObjectId},
    biometric:{type:String, required:true, default:"pending"},
    medical:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"medical",
        default:''
    
    },
    trial:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"trial",
        default:''
    
    },
    written:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"written",
        default:''
    }
})

export const Appointment = mongoose.models.appointment || mongoose.model<IAppointment>('appointment', appointmentSchema) 