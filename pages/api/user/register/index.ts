import dbconnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import multiparty from 'multiparty';

export default async function POST(req:NextApiRequest, res:NextApiResponse){
    await dbconnect(res);
    try {
        // const form = new multiparty.Form();
        // form.parse(req, async function(err, fields, files) {
        //  if(err){
        //     console.log("error",err)
        //  }
        //  const {name,email} = fields;
        //  console.log(name)
        // });
        res.status(200).json({message:"Worksd"})
        
    } catch (error:any) {
        res.status(400).json({error:error?.message})
    }

}

export const config = {
    api: {
      bodyParser: false
    },
};