import { NextApiResponse } from "next";

export default function ShowError(res:NextApiResponse, status:number, message:string){
    res.status(status).json({error:message})
}