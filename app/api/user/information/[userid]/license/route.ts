
import dbconnect from "@/lib/dbConnect";
import { Information } from "@/models/informationModel";
import { License } from "@/models/licenseModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { uploadPicture } from "@/utils/uploadPicture";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:any) {
    try {
        await dbconnect();
       const userId = params.userid;
       const licenseInformation  = await req.json();
       if(Object.keys(licenseInformation).length <6){
            return ShowError(400, "Please provide all the required information.");
       }
       if(!userId){
        return ShowError(400, "Not valid url.");
       }
       const existingLicense = await License.findOne({user_id: userId});
       if(existingLicense){
        return ShowError(400, "License already exists.");
       }
       const user = await User.findById(userId.toString());
       if(!user){
        return ShowError(400, "No user found");
       }
       if(!licenseInformation?.front || !licenseInformation?.back)
       {
        return ShowError(400, "Please provide both front and back image of license.");
       }
       if(!licenseInformation?.licenseno || !licenseInformation?.category || !licenseInformation?.issuedate || !licenseInformation?.expirydate || !licenseInformation?.office || !licenseInformation?.front || !licenseInformation?.back){
        return ShowError(400, "Please provide all the required informations.");
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
        const exists= await License.findOne({license_no: licenseInformation.licenseno});
        if(exists){
            return ShowError(400, "License already exists.");
        }
        const licenseData = {
                license_no: licenseInformation.licenseno,
                category: licenseInformation.category,
                license_date: licenseInformation.issuedate,
                expire_date: licenseInformation.expirydate,
                office: licenseInformation.office,
                image:{
                    front: licensePicFront.url,
                    back: licensePicBack.url
                }
        }  
    const licenseDoc = new License({
        user_id: userId,
        license: licenseData
    });
    await licenseDoc.save();
    user.license_id = licenseDoc._id;
    await user.save();
    return NextResponse.json({_id:licenseDoc._id,message:"License Information Saved Successfully"}, {status:200})
    }
     catch (error:any) {
       return ShowError(400, error?.message);
    }
}
export async function GET(req:NextRequest,{params}:any) {
    try {
        await dbconnect();
        const userId = params.userid;
        if(!userId){
            return ShowError(400, "Not valid url.");
        }
        const user = await User.findById(userId.toString());
        if(!user){
            return ShowError(400, "No user found");
        }
        const userDocuments = await License.findOne({user_id: user._id});
        if(!userDocuments){
            return ShowError(400, "No documents found. Please register license first.");
        }
        return NextResponse.json(userDocuments, {status:200});

    }catch (error:any) {
        return ShowError(400, error?.message);
    }
}

export async function PUT(req:NextRequest,{params}:any) {
    try {
        await dbconnect();
        const userId = params.userid;
        const licenseInformation  = await req.json();
        if(Object.keys(licenseInformation).length <6){
            return ShowError(400, "Please provide all the required information.");
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
            return ShowError(400, "Please provide both front and back image of license");
        }
        const licensePicFront = await uploadPicture(licenseInformation?.front, "license", user._id.toString() + "licensefront");
        const licensePicBack = await uploadPicture(licenseInformation?.back, "license", user._id.toString() + "licenseback");
        if(!licensePicFront?.url || !licensePicBack?.url){
            return ShowError(400, "Error uploading license image. Please try again.");
        }
        const licenseData = {
            license_no: licenseInformation.licenseno,
            category: licenseInformation.category,
            license_date: licenseInformation.issuedate,
            expire_date: licenseInformation.expirydate,
            office: licenseInformation.office,
            image:{
                front: licensePicFront.url,
                back: licensePicBack.url
            }
        }  
        const userDocuments = await License.findOneAndUpdate({user_id: user._id}, {
            license: licenseData
        });
        if(!userDocuments){
            return ShowError(400, "No documents found. Please register license first.");
        }
        await userDocuments.save();
        return NextResponse.json({message:"License Information updated Successfully"}, {status:200});
    }catch (error:any) {
        return ShowError(400, error?.message);
    }
}