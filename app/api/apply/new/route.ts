import { Appointment } from "@/models/appointmentsModel";
import { Citizenship } from "@/models/citizenshipModel";
import { Information } from "@/models/informationModel";
import { License } from "@/models/licenseModel";
import { UAppointment, User } from "@/models/userModel";
import ShowError from "@/utils/ShowError";
import { convertDate } from "@/utils/convertDate";
import { NextRequest, NextResponse } from "next/server";
import { switchType } from "../countoccupancy/route";
import { DashboardLog, IDashboardSchema } from "@/models/dashboardModel";
import { increaseOccupancy } from "@/utils/updateDashLog";
import { MedicalModal } from "@/models/MedicalExamModel";
import { TrailModal } from "@/models/TrialExamModel";
import { WrittenModal } from "@/models/WrittenExamModel";
import { checkLogin } from "@/lib/userAuth";
import dbconnect from "@/lib/dbConnect";

async function checkIfFailedForThreeTimes(id: string, category: string) {
    try {
        const user = await User.findById(id).populate({
            path: "appointment",
            model: Appointment,
            match: { category: category, status: "failed" }
        });
        if (user?.appointment.length >= 3) {
            return true;
        }
        return false;
    } catch (error: any) {
        return false;
    }
}

async function checkType(userId: string) {
    const license = await License.findOne({ user_Id: userId });
    if (!license) return 'new';
    return 'add';
}

async function checkCitizenship(userId: string) {
    const exists = await Citizenship.findOne({ user_id: userId });
    if (exists) {
        return true
    }
    return false
}
async function checkLicense(userId: string) {
    const exists = await License.findOne({ user_id: userId });
    if (exists) {
        return true
    }
    return false
}
async function checkInformation(userId: string) {
    const exists = await Information.findOne({ user_id: userId });
    if (exists) {
        return true
    }
    return false
}

async function updateDashLog(category: string, date: string, office: string, type: string, forType: string) {
    try {

        const dashlogForMedical = await DashboardLog.findOne({
            category: category,
            date: date,
            office: office
        })
        if (!dashlogForMedical) {
            const createdLog = await new DashboardLog<IDashboardSchema>({
                category: category,
                office,
                date,
                medical: {
                    morning: {
                        remaining: type === "medical" && forType === "morning" ? 1 : 0,
                        completed: 0,
                        passed: 0,
                        failed: 0
                    },
                    evening: {
                        remaining: type === "medical" && forType === "evening" ? 1 : 0,
                        completed: 0,
                        passed: 0,
                        failed: 0
                    },
                    afternoon: {
                        remaining: type === "medical" && forType === "afternoon" ? 1 : 0,
                        completed: 0,
                        passed: 0,
                        failed: 0
                    }

                },
                trial: {
                    morning: {
                        remaining: type === "trial" && forType === "morning" ? 1 : 0,
                        completed: 0,
                        passed: 0,
                        failed: 0
                    },
                    evening: {
                        remaining: type === "trial" && forType === "evening" ? 1 : 0,
                        completed: 0,
                        passed: 0,
                        failed: 0
                    },
                    afternoon: {
                        remaining: type === "trial" && forType === "afternoon" ? 1 : 0,
                        completed: 0,
                        passed: 0,
                        failed: 0
                    }
                },
                written: {
                    morning: {
                        remaining: type === "written" && forType === "morning" ? 1 : 0,
                        completed: 0,
                        passed: 0,
                        failed: 0
                    },
                    evening: {
                        remaining: type === "written" && forType === "evening" ? 1 : 0,
                        completed: 0,
                        passed: 0,
                        failed: 0
                    },
                    afternoon: {
                        remaining: type === "written" && forType === "afternoon" ? 1 : 0,
                        completed: 0,
                        passed: 0,
                        failed: 0
                    }
                }

            })
            await createdLog.save()
            return true;
        } else {
            if (await increaseOccupancy(category, date, office, type, forType, dashlogForMedical)) {
                await dashlogForMedical.save();
                return true;
            }
            return false;
        }
    } catch (error) {
        return false;
    }
}
export async function POST(req: NextRequest) {
    try {
        await dbconnect();
        const isLogged = await checkLogin(req)
        if (!isLogged) return ShowError(400, 'Please login to continue');
        const { userId, selectedCat, selectedProv, selectedOffice, medicalExamination, writtenExamination, trialExamination } = await req.json();
        if (!isLogged?._id) return ShowError(400, 'User not found');
        if (!selectedCat || !selectedProv || !selectedOffice || !medicalExamination.date || !writtenExamination.date || !trialExamination.date || !medicalExamination.shift || !writtenExamination.shift || !trialExamination.shift) return ShowError(400, 'Please fill all the fields')

        if (writtenExamination.date === medicalExamination.date || writtenExamination.date === trialExamination.date || medicalExamination.date === trialExamination.date) return ShowError(400, 'Please select different dates for each examination')
        if (!writtenExamination.date > medicalExamination.date || !trialExamination.date > writtenExamination.date) return ShowError(400, 'Please select correct dates for each examination')

        const user = await User.findById(isLogged._id)
        if (!user) return ShowError(400, 'User not found');

        if (user?.documentVerified?.status !== "verified") return ShowError(400, 'Your document is not verified.');

        // if(user.appointment.some((item:UAppointment)=> item.status==="pending")) return ShowError(400, 'User already has an appointment');
        if (user.hasApplied) return ShowError(400, 'User already has an appointment');

        if (await checkCitizenship(isLogged?._id) === false) return ShowError(400, 'User has not uploaded citizenship');

        // if(await checkLicense(userId)===false) return ShowError(400, 'User has not uploaded license');
        if (await checkInformation(isLogged._id) === false) return ShowError(400, 'User has not filled information form');
        //check iof the person has failed for three times in any appointment
        if (await checkIfFailedForThreeTimes(isLogged._id, selectedCat)) return ShowError(400, 'User has already failed for three times');
        //check if the user has applied after failing.
        const medical = await new MedicalModal({
            tracking_id: isLogged?.phone,
            user_id: isLogged._id,
            category: selectedCat,
            office: selectedOffice,
            date: medicalExamination.date,
            status: (user.hasFailed === "written" || user?.hasFailed === "trial") ? "passed"
                : "pending",
            shift: medicalExamination.shift
        })
        await medical.save();
        const trial = await new TrailModal({
            tracking_id: isLogged?.phone,
            user_id: isLogged._id,
            category: selectedCat,
            office: selectedOffice,
            date: trialExamination.date,
            status: "pending",
            shift: trialExamination.shift
        })
        await trial.save();
        const written = await new WrittenModal({
            tracking_id: isLogged?.phone,
            user_id: isLogged._id,
            category: selectedCat,
            office: selectedOffice,
            date: writtenExamination.date,
            status: (user.hasFailed === "trial") ? "passed"
                : "pending",
            shift: writtenExamination.shift
        })
        await written.save();


        const appointment = await new Appointment({
            tracking_id: isLogged?.phone,
            user_id: isLogged._id,
            category: selectedCat,
            type: await checkType(isLogged?._id),
            bookDate: convertDate(new Date()),
            office: selectedOffice,
            province: selectedProv,
            biometric: user?.hasFailed === "none" ? "pending" : "passed",
            medical: medical._id,
            written: written._id,
            trial: trial._id
        }).save()
        user.appointment.push({ id: appointment._id, status: 'pending' })
        user.hasApplied = true
        await user.save();
        return NextResponse.json({ message: 'Appointment created successfully' }, { status: 201 })

    } catch (error: any) {
        return ShowError(400, error.message)
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { app_id, type, data } = await req.json();
        if (!app_id) return ShowError(400, 'Provide appointment id.');
        if (!type || !data.id) return ShowError(400, 'Please fill all the fields')

        const appointment = await Appointment.findById(app_id);
        if (!appointment) return ShowError(400, 'Appointment not found');
        if (type === 'medical') {
            appointment.medical.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())[0].map((ele: any) =>
                ele.status === 'pending' && ele.date === data.date && { ele: data })
        } else if (type === 'written') {
            appointment.written.map((ele: any) => ele.id === data.id ? { ele: data } : ele)
        }
        else {
            appointment.trial.map((ele: any) => ele.id === data.id ? { ele: data } : ele)
        }
    } catch (error: any) {
        return ShowError(400, error.message)
    }
}

