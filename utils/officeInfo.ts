import { apiinstance } from "@/services/Api"

export async function getOfficeById(id:String){
    try {
        const res = await apiinstance.get(`/admin/offices/${id}`);
        if(res.status===200){
            return {
                success:true,
                data:res.data,
                error:null
            }
        }
        return {
            success:false,
            error:res?.data?.message || "Some error occured",
            data:null
        }
    } catch (error:any) {
        return {
            success:false,
            error:error?.response?.data?.message,
            data:null
        }
    }
}


export async function getAllOffices(){
    try {
        const res = await apiinstance.get("/admin/offices");
        if(res.status===200){
            return {
                success:true,
                data:res.data,
                error:null
            }
        }
        return {
            success:false,
            error:res?.data?.message || "Some error occured",
            data:null
        }
        
    } catch (error:any) {
        return{
            success:false,
            error:error?.response?.data?.message,
            data:null
        }
    }
}