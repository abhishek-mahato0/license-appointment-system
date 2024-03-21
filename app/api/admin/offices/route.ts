import dbconnect from "@/lib/dbConnect";
import { checkAdmins } from "@/lib/userAuth";
import { OfficeModel } from "@/models/OfficeModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await dbconnect();
       
        // if(!loggedUser){
        //     return ShowError(401, "Unauthorized. Login Again.");
        // }
        const params = req.nextUrl.searchParams;
        const query:any ={}
        if(params.get("province")){
            query["province"] = params.get("province");
        }
        if(params.get("district")){
            query["district"] = params.get("district");
        }
        // if(loggedUser.role === "admin" || loggedUser.role === "editor"){
        //     query["_id"] = loggedUser?.office;
        // }

        const officeList = await OfficeModel.find(query);
        return NextResponse.json(officeList,{ status: 200 });
    } catch (error: any) {
        return ShowError(500, error.message);
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        console.log(loggedUser)
        if(!loggedUser){
            return ShowError(401, "Unauthorized. Login Again.");
        }else if(loggedUser?.role !== "admin" && loggedUser?.role !== "superadmin"){
            return ShowError(401, "Unauthorized. Login Again.");
        }
        const { name, province, address, district } = await req.json();
        if (!name || !province || !address || !district) {
            return ShowError(400, "Invalid request. Missing fields");
        }
        const exists = await OfficeModel.findOne({
            name
        })
        if (exists) {
            return ShowError(400, "Office already exists");
        }
        const office = await OfficeModel.create({ name, province, address, district, createdBy: loggedUser._id});
        return NextResponse.json(office, { status: 201 });
    } catch (error: any) {
        return ShowError(500, error.message);
    }
}

export async function PUT(req: NextRequest) {
    try {
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        if(!loggedUser || loggedUser.role !== "superadmin" && loggedUser.role !== "admin"){
            return ShowError(401, "Unauthorized. Login Again.");
        }
        const { id, content } = await req.json();
        const office = await OfficeModel.findByIdAndUpdate(id, content, { new: true });
        if (!office) {
            return ShowError(400, "No office found");
        }
        return NextResponse.json(office, { status: 200 });
    }
    catch (error: any) {
        return ShowError(500, error.message);
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbconnect();
        const loggedUser = await checkAdmins(req);
        if(!loggedUser || loggedUser.role !== "superadmin"){
            return ShowError(401, "Unauthorized. Login Again.");
        }
        const id = req.nextUrl.searchParams.get("id");
        if(!id) return ShowError(400, "Invalid request. Missing id");
        const office = await OfficeModel.findByIdAndDelete(id);
        if (!office) {
            return ShowError(400, "No office found");
        }
        return NextResponse.json(office, { status: 200 });
    }
    catch (error: any) {
        return ShowError(500, error.message);
    }
}