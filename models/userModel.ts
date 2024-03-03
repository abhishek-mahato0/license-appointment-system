import mongoose from "mongoose";

export interface UAppointment{
    id:mongoose.Schema.Types.ObjectId,
    status:string,
}
export interface IUser{
    _id?:string,
    name:string,
    email:string,
    password:string,
    isverifiedByEmail:boolean,
    documentVerified?:{
        status:string,
        message:string
    },
    phone:string,
    role?:string,
    token?:string,
    forgotPasswordtoken:string
    citizenship_id?:string,
    license_id?:string,
    information_id?:string,
    appointment?: Array<UAppointment>,
    hasApplied:boolean, 
    avatar?:string
    hasFailed?:string,
}
const userSchema =new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isverifiedByEmail:{
        type:Boolean,
        default:false
    },
    avatar:{ type:String, required:true},
    role:{
        type:String,
        required:true,
        default:'public'
    },
    token:{
        type:String,
    },
    forgotPasswordtoken:{},
    citizenship_id:{ type: String , required:true, default:'none'},
    license_id: { type:String, required:true, default:'none'},
    information_id:{ type:String, required:true, default:'none'},
    appointment:
    [
    {
        id:{ type:mongoose.Schema.Types.ObjectId, ref:"appointment", required:true},
        status:{ type:String, required:true, default:'pending'}
    }
    ],
    hasFailed:{
        type:String,
        default:"none",
        required:true
    },
    hasApplied:{
        type:Boolean,
        default:false
    },
    documentVerified:{
        status:{
            type:String,
            default:"pending"
        },
        message:{
            type:String,
            default:''
        }
    },
});

export const User = mongoose.models.user || mongoose.model('user', userSchema)