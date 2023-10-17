import mongoose from "mongoose";
export interface IUser{
    id?:string,
    name:string,
    email:string,
    password:string,
    isverifiedByEmail:boolean,
    role?:string,
    token?:string,
    forgotPasswordtoken:string
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
    forgotPasswordtoken:{
        type:String
    }
});

export const User =mongoose.models.user || mongoose.model('user', userSchema)