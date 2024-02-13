import mongoose from "mongoose"

export interface ICategory{
    category:string, 
    date:Date
}
export interface ILicense{
    _id?:string,
    license_no:string,
    category:Array<ICategory>,
    license_date:Date,
    expire_date:Date,
    office:string,
    province:number,
    image:{
        front:string,
        back:string

    }
}

export interface IDocument{
    _id?:string,
    user_id:mongoose.Schema.Types.ObjectId,
    license:ILicense,
}

const licenseSchema = new mongoose.Schema<IDocument>({
    user_id:{ type:mongoose.Schema.Types.ObjectId,
        ref:'user'},
    license:{
        license_no:{ type:String, required:true },
        category:{ type:Array, required:true  },
        license_date:{ type:Date , required:true },
        expire_date:{ type:Date, required:true },
        office:{ type:String, required:true  },
        image:{
            front:{ type:String, required:true  },
            back:{ type:String, required:true  }
        }
    },
})

export const License = mongoose.models.license || mongoose.model<IDocument>('license', licenseSchema )