import mongoose from "mongoose"

export interface ICitizenship{
    _id?:string,
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

export interface IDocument{
    _id?:string,
    user_id:mongoose.Schema.Types.ObjectId,
    citizenship:ICitizenship,
}

const citizenshipSchema = new mongoose.Schema<IDocument>({
    user_id:{ type:mongoose.Schema.Types.ObjectId,
        ref:'user'},
    citizenship:{
        citizenship_no:{ type:String, required:true },
        citizenship_type:{ type:String, required:true },
        issue_date:{ type:Date, required:true },
        issue_district:{ type:String, required:true },
        image:{
            front:{ type:String, required:true },
            back:{ type:String, required:true }
        }
    }
})

export const Citizenship = mongoose.models.citizenship || mongoose.model<IDocument>('citizenship', citizenshipSchema )