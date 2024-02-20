import { apiinstance } from "@/services/Api"

export const fetchDashboardCounts = async (category?:string, office?:string, date?:string) => {
    try {
        const res = await apiinstance.get(`/user/dashboard?${category?`category=${category}`:""}&${office?`office=${office}`:""}&${date?`date=${date}`:""}`);
        if(res.status===200){
            return {
                data: res.data,
                success: true
            }
        }  
        return {
            data: null,
            success: false, 
            message: res?.data?.message || "Error occured"
        }
    } catch (error:any) {
        return {
            data: null,
            success: false,
            message: error?.response?.data?.message
        }
    }
}

export async function fetchDashboardTrialData(category?:string, office?:string, date?:string){
    try {
        const res = await apiinstance.get(`/admin/documents/trial?${category?`category=${category}`:""}&${office?`office=${office}`:""}&${date?`date=${date}`:""}`);
        if(res.status===200){
            return {
                data: res.data,
                success: true
            }
        }  
        return {
            data: null,
            success: false, 
            message: res?.data?.message || "Error occured"
        }
    } catch (error:any) {
        return {
            data: null,
            success: false,
            message: error?.response?.data?.message
        }
    }
}

export async function fetchDashboardWrittenData(category?:string, office?:string, date?:string){
    try {
        const res = await apiinstance.get(`/admin/documents/written?${category?`category=${category}`:""}&${office?`office=${office}`:""}&${date?`date=${date}`:""}`);
        if(res.status===200){
            return {
                data: res.data,
                success: true
            }
        }  
        return {
            data: null,
            success: false, 
            message: res?.data?.message || "Error occured"
        }
    } catch (error:any) {
        return {
            data: null,
            success: false,
            message: error?.response?.data?.message
        }
    }
}

export async function fetchDashboardMedicalData(category?:string, office?:string, date?:string){
    try {
        const res = await apiinstance.get(`/admin/documents/medical?${category?`category=${category}`:""}&${office?`office=${office}`:""}&${date?`date=${date}`:""} `);
        if(res.status===200){
            return {
                data: res.data,
                success: true
            }
        }  
        return {
            data: null,
            success: false, 
            message: res?.data?.message || "Error occured"
        }
    } catch (error:any) {
        return {
            data: null,
            success: false,
            message: error?.response?.data?.message
        }
    }
}