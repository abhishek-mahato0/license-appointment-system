
import { Information } from "@/models/informationModel";
import { License } from "@/models/licenseModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { uploadPicture } from "@/utils/uploadPicture";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:any) {
    try {
       const userId = params.userid;
       const { licenseInformation} = await req.json();
       if(!licenseInformation){
            return ShowError(400, "Please provide all the required information");
       }
       if(!userId){
        return ShowError(400, "Not valid url.");
       }
       const user = await User.findById(userId.toString());
       if(!user){
        return ShowError(400, "No user found");
       }
       if(!licenseInformation?.front || !licenseInformation?.back)
       {
        return ShowError(400, "Please provide both front and back image of citizenship");
       }
       if(!licenseInformation?.license_no || !licenseInformation?.category || !licenseInformation?.licensedate || !licenseInformation?.expiredate || !licenseInformation?.office || !licenseInformation?.province || !licenseInformation?.front || !licenseInformation?.back){
        return ShowError(400, "Please provide all the required information");
       }
        if(!licenseInformation?.front || !licenseInformation?.back)
        {
            return ShowError(400, "Please provide both front and back image of license");
        }
        const licensePicFront = await uploadPicture(licenseInformation?.front, "license", user._id.toString() + "licensefront");
        const licensePicBack = await uploadPicture(licenseInformation?.back, "license", user._id.toString() + "licenseback");
        if(!licensePicFront?.url || !licensePicBack?.url){
            return ShowError(400, "Error uploading license image. Please try again.");
        }

        const userDocuments = await License.findOne({user_id: user._id});
        if(userDocuments){
            return ShowError(400, "Document already exists.");
        }
        const licenseData = {
                license_no: licenseInformation.licenseno,
                category: licenseInformation.category,
                license_date: licenseInformation.licensedate,
                expire_date: licenseInformation.expiredate,
                office: licenseInformation.office,
                image:{
                    front: licensePicFront.url,
                    back: licensePicBack.url
                }
        }  
    const licenseDoc = new License({
        user_id: user._id,
        license: licenseData
    });
    await licenseDoc.save();
    user.license_id = licenseDoc._id;
    await user.save();
    return NextResponse.json({_id:licenseDoc._id,message:"License Information Saved Successfully"}, {status:200})
    }
     catch (error:any) {
        console.log(error?.message)
    }
}
export async function GET(req:NextRequest,{params}:any) {
    try {
        const userId = params.userid;
        if(!userId){
            return ShowError(400, "Not valid url.");
        }
        const user = await User.findById(userId.toString());
        if(!user){
            return NextResponse.json({found:false, cat:""}, {status:400});
        }
        const userDocuments = await License.findOne({user_id: user._id});
        if(!userDocuments){
            return NextResponse.json({found:false, cat:""}, {status:400});
        }
        return NextResponse.json(userDocuments, {status:200});

    }catch (error:any) {
        return ShowError(400, error?.message);
    }
}