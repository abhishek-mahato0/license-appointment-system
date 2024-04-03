import { apiinstance } from "@/services/Api";

export async function getTotalCounts(){
    try {
        const res = await apiinstance.get(`/admin/dashboard/total`);
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