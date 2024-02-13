import mongoose from "mongoose"

export interface IInformation{   
    id?:string,
    first_name:string,
    middle_name:string,
    last_name:string,
    user_id:mongoose.Schema.Types.ObjectId,
    email:string,
    phone:string,
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
    province:string,
    district:string,
    municipality:string,
    ward:number,
    city:string,
    tole:string
}

const informationSchema = new mongoose.Schema<IInformation>({
    first_name:{ type:String, required:true },
    middle_name:{ type:String, required:true },
    last_name:{ type:String, required:true },
    user_id:{ type:mongoose.Schema.Types.ObjectId,
        ref:'user'},
    guardian_name:{ name:{ type:String, required:true }, relation:{ type:String, required:true }},
    DOB: { type:Date, required:true },
    gender:{ type:String, required:true },
    email:{ type:String, required:true },
    phone:{ type:String, required:true },
    blood_group:{ type:String, required:true },
    occupation:{ type:String, required:true },
    education:{ type:String, required:true },
    permanent_address: {
        province:{ type:String, required:true },
        district:{ type:String, required:true },
        municipality:{ type:String, required:true },
        ward:{ type:Number, required:true },
        city:{ type:String, required:true },
        tole:{ type:String, required:true }
    },
    temporary_address: {
        province:{ type:String, required:true },
        district:{ type:String, required:true },
        municipality:{ type:String, required:true },
        ward:{ type:Number, required:true },
        city:{ type:String, required:true },
        tole:{ type:String, required:true }
    }    
})

export const Information = mongoose.models.information || mongoose.model<IInformation>('information', informationSchema)