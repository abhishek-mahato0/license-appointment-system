import { OfficeModel } from "@/models/OfficeModel";
import ShowError from "@/utils/ShowError";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const officeList = await OfficeModel.find();
        return NextResponse.json(officeList,{ status: 200 });
    } catch (error: any) {
        return ShowError(500, error.message);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, province, address, district } = await req.json();
        if (!name || !province || !address || !district) {
            return ShowError(400, "Invalid request. Missing fields");
        }
        const office = await OfficeModel.create({ name, province, address, district });
        return NextResponse.json(office, { status: 200 });
    } catch (error: any) {
        return ShowError(500, error.message);
    }
}

export async function PUT(req: NextRequest) {
    try {
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