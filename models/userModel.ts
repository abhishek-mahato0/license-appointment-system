import mongoose from "mongoose";

export interface UAppointment{
    id:string,
    status:string,
}
export interface IUser{
    id?:string,
    name:string,
    email:string,
    password:string,
    isverifiedByEmail:boolean,
    role?:string,
    token?:string,
    forgotPasswordtoken:string
    citizenship_id?:string,
    license_id?:string,
    information_id?:string,
    appointment?: Array<UAppointment>,
    hasApplied:boolean, 
    avatar?:string

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
    isverifiedByEmail:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        required:true,
        default:'public'
    },
    token:{
        type:String,
    },
    forgotPasswordtoken:{},
    citizenship_id:{ type: String, required:true, default:'none'},
    license_id: { type:String, required:true, default:'none'},
    information_id:{ type:String, required:true, default:'none'},
    appointment:
    [
    {
        id:{ type:String, required:true},
        status:{ type:String, required:true, default:'pending'}
    }
    ],
    hasApplied:{
        type:Boolean,
        default:false
    } 
});

export const User =mongoose.models.user || mongoose.model('user', userSchema)