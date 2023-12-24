import mongoose from "mongoose";

export interface ILicense{
    id?:string,
    license_no:string,
    category:Array<{}>,
    license_date:Date,
    expire_date:Date,
    office:string,
    province:number,
    image:{
        front:string,
        back:string

    }
}

export interface ICitizenship{
    id?:string,
    citizenship_no:string,
    citizenship_type:string,
    issue_date:Date,
    issue_district:string,
    province:number,
    image:{
        front:string,
        back:string

    }
}

export interface Information{   
    id?:string,
    first_name:string,
    middle_name:string,
    last_name:string,
    user_id:string,
    guardian_name:{ name:string, relation:string},
    DOB: Date,
    gender:string,
    blood_group:string,
    occupation:string,
    education:string,
    permanent_address: IAddress,
    temporary_address: IAddress,
}

export interface IAddress{
    province:number,
    district:string,
    municipality:string,
    ward_no:number,
    city:string,
    tole:string
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
    license?:Array<string>,
    citizenship?:string,
    information?:string,
    appointment?: Array<string>,
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
    forgotPasswordtoken:{
        type:String
    },
    license:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'license'
    }],
    citizenship:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'citizenship'
    },
    information:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'information'
    },
    appointment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'appointment'
    }],
    hasApplied:{
        type:Boolean,
        default:false
    }  
});

export const User =mongoose.models.user || mongoose.model('user', userSchema)