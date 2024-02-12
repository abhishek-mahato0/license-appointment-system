import dbconnect from "@/lib/dbConnect";
import { Information } from "@/models/informationModel";
import { User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:any) {
    try {
        await dbconnect();
       const userId = params.userid;
       const { personalInformation, addressInformation} = await req.json();
       if(!personalInformation || !addressInformation){
            return ShowError(400, "Please provide all the required information");
       }
       if(!userId){
        return ShowError(400, "Not valid url.");
       }
       const user = await User.findById(userId.toString());
       if(!user){
        return ShowError(400, "No user found");
       }
       const informationData = {
        first_name: personalInformation?.firstName,
        middle_name: personalInformation?.middlename,
        last_name: personalInformation?.lastname,
        user_id: user._id,
        guardian_name: {name: personalInformation.guardiansname, relation: personalInformation.guardiansrelation},
        DOB: personalInformation.dob,
        gender: personalInformation.gender,
        blood_group: personalInformation.bloodgroup,
        occupation: personalInformation.occupation,
        education: personalInformation.education,
        permanent_address: {
            province: addressInformation.permanentAddress?.province,
            district: addressInformation.permanentAddress?.district,
            municipality: addressInformation.permanentAddress?.municipality,
            ward: addressInformation.permanentAddress?.ward,
            city: addressInformation.permanentAddress?.city,
            tole: addressInformation.permanentAddress?.tole
        },
        temporary_address: {
            province: addressInformation.temporaryaddress?.province,
            district: addressInformation.temporaryaddress?.district,
            municipality: addressInformation.temporaryaddress?.municipality,
            ward: addressInformation.temporaryaddress?.ward,
            city: addressInformation.temporaryaddress?.city,
            tole: addressInformation.temporaryaddress?.tole
        },
       };
    const information= new Information(informationData);
   await information.save();
    user.information_id = information._id;
    await user.save();
    return NextResponse.json({message:"Personal Information saved Successfully"}, {status:200})
    } catch (error:any) {
        console.log(error)
        return ShowError(500, error.message);
    }
    
}

export async function GET(req:NextRequest,{params}:any) {
    try {
        await dbconnect();
        const userId = params.userid;
        if(!userId){
            return ShowError(400, "Not valid url.");
        }
        const user  = await User.findById(userId);
        if(!user){
            return ShowError(400, "No user found");
        }
        const information = await Information.findOne({user_id:  userId});
        if(!information){
            return ShowError(400, "No information found.");
        }
        return NextResponse.json(information, {status:200});
    }
    catch (error:any) {
        return ShowError(500, error.message);
    }
}