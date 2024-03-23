import mongoose from "mongoose";

export type INews={
    _id?: string,
    title: string,
    description: string,
    img: string,
    category: string,
    createdBy: string;
    date: Date;
}

const newsSchema = new mongoose.Schema<INews>({
    title:{ type:String, required:true},
    description:{ type:String, required:true},
    img:{ type:String},
    category:{ type:String, required:true, default:"General"},
    createdBy:{ type:String, required:true},
    date:{ type:Date, default:Date.now()}
})

export const NewsModel = mongoose.models.news || mongoose.model<INews>("news", newsSchema);