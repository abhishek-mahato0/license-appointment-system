import { apiinstance } from "@/services/Api"

export const fetchUserPersonalInformation = async (userId:string) => {
    try{
        const res = await apiinstance.get(`/user/information/${userId}/personal`);
        if(res.status === 200){
            return {
                success:true,
                data:res.data
            }
        }
        return {
            success:false,
            message:res.data.message
        }
    }
    catch(error:any){
        return {
            success:false,
            message:error?.response.message
        }
    }
}

export const fetchUserCitizenshipInformation = async (userId:string) => {
    try{
        const res = await apiinstance.get(`/user/information/${userId}/citizenship`);
        if(res.status === 200){
            return {
                success:true,
                data:res.data,
                message:"Successfull"
            }
        }
        return {
            success:false,
            data:null,
            message:res.data.message
        }
    }
    catch(error:any){
        return {
            success:false,
            data:null,
            message:error?.response.message
        }
    }
}

export const fetchUserLicenseInformation= async (userId:string) => {
    try{
        const res = await apiinstance.get(`/user/information/${userId}/license`);
        if(res.status === 200){
            return {
                success:true,
                data:res.data,
                message:"Successfull"
            }
        }
        return {
            success:false,
            data:null,
            message:res.data.message
        }
    }
    catch(error:any){
        return {
            success:false,
            data:null,
            message:error?.response.message
        }
    }
}