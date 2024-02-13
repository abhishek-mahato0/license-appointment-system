// import { Document } from "@/models/citizenshipModel";
// import { Information } from "@/models/informationModel";
// import { User } from "@/models/userModel";
// import ShowError from "@/utils/ShowError";
// import { uploadPicture } from "@/utils/uploadPicture";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req:NextRequest,{params}:any) {
//     try {
//        const userId = params.userid;
//        const { personalInformation, addressInformation, citizenshipInformation, licenseInformation} = await req.json();
//        if(!personalInformation || !addressInformation || !citizenshipInformation){
//             return ShowError(400, "Please provide all the required information");
//        }
//        if(!userId){
//         return ShowError(400, "Not valid url.");
//        }
//        const user = await User.findById(userId.toString());
//        if(!user){
//         return ShowError(400, "No user found");
//        }
//        if(!citizenshipInformation?.front || !citizenshipInformation?.back)
//        {
//         return ShowError(400, "Please provide both front and back image of citizenship");
//        }
//        const citizenshipPicFront = await uploadPicture(citizenshipInformation?.front, "citizenship", user._id.toString() + "citizenshipfront");
//          const citizenshipPicBack = await uploadPicture(citizenshipInformation?.back, "citizenship", user._id.toString() + "citizenshipback");
//         if(!citizenshipPicFront?.url || !citizenshipPicBack?.url){
//             return ShowError(400, "Error uploading citizenship image. Please try again.");
//         }

//        const informationData = {
//         first_name: personalInformation?.firstName,
//         middle_name: personalInformation?.middlename,
//         last_name: personalInformation?.lastname,
//         user_id: user._id,
//         guardian_name: {name: personalInformation.guardiansname, relation: personalInformation.guardiansrelation},
//         DOB: personalInformation.dob,
//         gender: personalInformation.gender,
//         blood_group: personalInformation.bloodgroup,
//         occupation: personalInformation.occupation,
//         education: personalInformation.education,
//         permanent_address: {
//             province: addressInformation.permanentAddress?.province,
//             district: addressInformation.permanentAddress?.district,
//             municipality: addressInformation.permanentAddress?.municipality,
//             ward: addressInformation.permanentAddress?.ward,
//             city: addressInformation.permanentAddress?.city,
//             tole: addressInformation.permanentAddress?.tole
//         },
//         temporary_address: {
//             province: addressInformation.temporaryaddress?.province,
//             district: addressInformation.temporaryaddress?.district,
//             municipality: addressInformation.temporaryaddress?.municipality,
//             ward: addressInformation.temporaryaddress?.ward,
//             city: addressInformation.temporaryaddress?.city,
//             tole: addressInformation.temporaryaddress?.tole
//         },
//        };
//        let documentData;
//        if(licenseInformation?.license_no || licenseInformation?.category || licenseInformation?.licensedate || licenseInformation?.expiredate || licenseInformation?.office || licenseInformation?.province || licenseInformation?.front || licenseInformation?.back){
//         if(!licenseInformation?.front || !licenseInformation?.back)
//         {
//             return ShowError(400, "Please provide both front and back image of license");
//         }
//         const licensePicFront = await uploadPicture(licenseInformation?.front, "license", user._id.toString() + "licensefront");
//         const licensePicBack = await uploadPicture(licenseInformation?.back, "license", user._id.toString() + "licenseback");
//         if(!licensePicFront?.url || !licensePicBack?.url){
//             return ShowError(400, "Error uploading license image. Please try again.");
//         }
//         documentData = {
//             user_id: user._id,
//             license:{
//                 license_no: licenseInformation.licenseno,
//                 category: licenseInformation.category,
//                 license_date: licenseInformation.licensedate,
//                 expire_date: licenseInformation.expiredate,
//                 office: licenseInformation.office,
//                 image:{
//                     front: licensePicFront.url,
//                     back: licensePicBack.url
//                 }
//             },
//             citizenship:{
//                 citizenship_no: citizenshipInformation.citizenshipno,
//                 citizenship_type: citizenshipInformation.citizenshiptype,
//                 issue_date: citizenshipInformation.citizenshipissuedate,
//                 issue_district: citizenshipInformation.citizenshipissuedistrict,
//                 image:{
//                     front: citizenshipPicFront.url,
//                     back: citizenshipPicBack.url
//                 }
//            }
//         }
//        }else{
//         documentData = {
//             user_id: user._id,
//             citizenship:{
//                 citizenship_no: citizenshipInformation.citizenshipno,
//                 citizenship_type: citizenshipInformation.citizenshiptype,
//                 issue_date: citizenshipInformation.issuedate,
//                 issue_district: citizenshipInformation.issuedistrict,
//                 province: citizenshipInformation.province,
//                 image:{
//                     front: citizenshipPicFront.url,
//                     back: citizenshipPicBack.url
//                 }
//            }
//         }
//        }
      

//     const information= new Information(informationData);
//     const document= new Document(documentData);
//     console.log(information, document)
//     await information.save();
//     await document.save();
//     user.information = information._id;
//     user.document = document._id;
//     await user.save();
//     return NextResponse.json({message:"Information Saved Successfully"}, {status:200})
//     } catch (error:any) {
//         console.log(error?.message)
//     }
    
// }