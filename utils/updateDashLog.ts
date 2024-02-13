import { IDashboardSchema } from "@/models/dashboardModel";

export async function increaseOccupancy(category:string, date:string,office:string, type:string, forType:string, appointment:IDashboardSchema){
    if(type==="medical" && forType==="morning"){
        appointment.medical.morning.remaining = Number(appointment.medical.morning.remaining) + 1;
    } else if( type==="medical" && forType==="evening"){
        appointment.medical.morning.remaining = Number(appointment.medical.morning.remaining) + 1;
    } else if( type==="medical" && forType==="afternoon"){
        appointment.medical.afternoon.remaining = Number(appointment.medical.afternoon.remaining) + 1;
    }else if( type==="written" && forType==="evening"){
        appointment.written.evening.remaining = Number(appointment.written.evening.remaining) + 1;
    }else if( type==="written" && forType==="afternoon"){
        appointment.written.afternoon.remaining = Number(appointment.written.afternoon.remaining) + 1;
    }else if( type==="written" && forType==="morning"){
        appointment.written.morning.remaining = Number(appointment.written.morning.remaining) + 1;
    }
    else if( type==="trial" && forType==="evening"){
        appointment.trial.evening.remaining = Number(appointment.trial.evening.remaining) + 1;
    }else if( type==="trial" && forType==="afternoon"){
        appointment.trial.afternoon.remaining = Number(appointment.trial.afternoon.remaining) + 1;
    }else {
        appointment.trial.morning.remaining = Number(appointment.trial.morning.remaining) + 1;
    }
    return true;
}

export async function decreaseOccupancy(category:string, date:string,office:string, type:string, forType:string, appointment:IDashboardSchema){

}