import { createSlice } from "@reduxjs/toolkit"

type PersionalInformation={
    firstName?:string,
    middleName?:string,
    lastName?:string,
    email?:string,
    phone?:string,
    dob?:Date,
    gender?:string,
    bloodGroup?:string,
    guardiansname?:string,
    guardiansrelation?:string,
    documentStatus?:{}
}
type Addressess={
    province?:string,
    district?:string,
    municipality?:string,
    ward?:string,
    tole?:string,
    city?:string,
}
type AddressInformation={
    permanentAddress:Addressess,
    temporaryAddress:Addressess,
}

type educationInformation={
    education:string,
    occupation:string,
}

type ProfileInformation={
    personalInformation:PersionalInformation,
    addressInformation:AddressInformation,
    educationInformation:educationInformation | {},
    citizenshipInformation:{},
    licenseInformation:{},
}


const initialState: ProfileInformation={
    personalInformation:{},
    addressInformation:{
        permanentAddress:{
            province:"",
            district:"",
            municipality:"",
            ward:"",
            tole:"",
            city:""

        },
        temporaryAddress:{
            province:"",
            district:"",
            municipality:"",
            ward:"",
            tole:"",
            city:""
        },
    },
    educationInformation:{},
    citizenshipInformation:{},
    licenseInformation:{},
}
export const profileInformationSlice = createSlice({
    name:'profileInformation',
    initialState,
    reducers:{
        setPersonalInformation:(state,action)=>{
            state.personalInformation=action.payload
        },
        setAddressInformation:(state,action)=>{
            state.addressInformation=action.payload
        },
        setEducationInformation:(state,action)=>{
            state.educationInformation=action.payload
        },
        setCitizenshipInformation:(state,action)=>{
            state.citizenshipInformation=action.payload
        },
        setLicenseInformation:(state,action)=>{
            state.licenseInformation=action.payload
        }
    }
})

export const {setPersonalInformation,setAddressInformation,setEducationInformation,setCitizenshipInformation,setLicenseInformation}=profileInformationSlice.actions;
export default profileInformationSlice.reducer;