import { apiinstance } from "@/services/Api";

export async function getInfo(currentUser: string){
    const res= await apiinstance.get('/users/me', {})
}