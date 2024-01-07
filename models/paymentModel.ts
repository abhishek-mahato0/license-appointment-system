import mongoose, { mongo } from "mongoose"

export interface IPayment{
    id?:string,
    user_id:mongoose.Schema.Types.ObjectId,
    appointment_id:mongoose.Schema.Types.ObjectId,
    amount:number,
    payment_date:Date,
    payment_method:string,
    payment_status:string,
    payment_gateway:string
}

const paymentSchema = new mongoose.Schema<IPayment>({
    user_id:{ type:mongoose.Schema.Types.ObjectId,
        ref:'user'},
    appointment_id:{ type:mongoose.Schema.Types.ObjectId,
        ref:'appointment'},
    amount:{ type:Number, required:true },
    payment_date:{ type:Date, required:true },
    payment_method:{ type:String, required:true },
    payment_status:{ type:String, required:true },
    payment_gateway:{ type:String, required:true }
})