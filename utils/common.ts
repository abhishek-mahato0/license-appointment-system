import { districtList } from "@/components/data/DistrictList";
import { municipalityList } from "@/components/data/MunicipalityList";
import { provinces } from "@/components/data/ProvinceList";

export function getDistrictName(id:string | number){
    try {
        if(!id) return "Unknown District Code";
        const district = districtList.find((d) => d?.value.toString() === id.toString());
        return district?.label || "Unknown District Code"; 
    } catch (error) {
        return "Unknown District Code";
    }
}

export function getProvinceName(id:string | number){
    try {
        if(!id) return "Unknown Province Code";
        const province = provinces.find((d) => d?.value.toString() === id.toString());
        return province?.label || "Unknown Province Code"; 
    } catch (error) {
        return "Unknown Province Code";
    }
}

export const getmuniciplityName = (id:string | number) => {
    try {
        if(!id) return "Unknown Municipality Code";
        const municipality = municipalityList.find((d) => d?.value.toString() === id.toString());
        return municipality?.label || "Unknown Municipality Code"; 
    } catch (error) {
        return "Unknown Municipality Code";
    }
}

export function generateOTP(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }