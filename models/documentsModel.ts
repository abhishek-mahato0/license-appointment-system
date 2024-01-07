import mongoose from "mongoose"

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

export interface IDocument{
    id?:string,
    user_id:mongoose.Schema.Types.ObjectId,
    license:ILicense,
    citizenship:ICitizenship,
}

const documentSchema = new mongoose.Schema<IDocument>({
    user_id:{ type:mongoose.Schema.Types.ObjectId,
        ref:'user'},
    license:{
        license_no:{ type:String, required:true },
        category:{ type:Array, required:true },
        license_date:{ type:Date, required:true },
        expire_date:{ type:Date, required:true },
        office:{ type:String, required:true },
        province:{ type:Number, required:true },
        image:{
            front:{ type:String, required:true },
            back:{ type:String, required:true }
        }
    },
    citizenship:{
        citizenship_no:{ type:String, required:true },
        citizenship_type:{ type:String, required:true },
        issue_date:{ type:Date, required:true },
        issue_district:{ type:String, required:true },
        province:{ type:Number, required:true },
        image:{
            front:{ type:String, required:true },
            back:{ type:String, required:true }
        }
    }
})

export const Document = mongoose.models.document || mongoose.model<IDocument>('document', documentSchema)