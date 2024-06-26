import { apiinstance } from "@/services/Api";

export async function adminLogin(data:any) {
    try {
        const res = await apiinstance.post("/admin/login/", data);
        
        if(res.status === 200){
            return { data: res?.data?.user,
            success:true,
            message: res?.data?.message
        };
        }
        return { data: null, success:false, message: res?.data?.message};
    } catch (error: any) {
        return { data: null, success:false, message: error?.response?.data?.message};
    }

}