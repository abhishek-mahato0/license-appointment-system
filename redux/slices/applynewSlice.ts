import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
type Barstate={
  active:number,
  completed:Array<number>
}

interface ExamineeSelected{
  shift:string,
  count:number
}
interface ApplyState {
  barState:Barstate
  selectedCat:string | null,
  isTermsAgreed:boolean
  selectedOffice: string| null,
  selectedProv:string | null,
  medicalExamination:Array<ExamineeSelected> | null,
  writtenExamination:Array<ExamineeSelected> | null,
  trialExamination:Array<ExamineeSelected> | null,
}


const initialState: ApplyState = {
  barState:{
    active:1,
    completed:[]
  },
  isTermsAgreed:false,
  selectedCat:null,
  selectedOffice:null,
  selectedProv:null,
  medicalExamination:null,
  writtenExamination:null,
  trialExamination:null
}

export const counterSlice = createSlice({
  name: 'applynew',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBarstate:(state,action)=>{
      state.barState=action.payload
    },
    setIsAgreed:(state,action)=>{
      state.isTermsAgreed=action.payload
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSelectedCat:(state,action)=>{
      state.selectedCat=action.payload
    },
    setSelectedProv:(state,action)=>{
      state.selectedProv=action.payload
    },
    setSelectedOffice:(state,action)=>{
      state.selectedOffice=action.payload
    },
    setMedicalInfo:(state,action)=>{
      state.medicalExamination=action.payload
    },
    setWrittenInfo:(state,action)=>{
      state.writtenExamination=action.payload
    },
    setTrialInfo:(state,action)=>{
      state.trialExamination=action.payload
    },
  },
})

export const {setBarstate,setSelectedCat,setIsAgreed,setSelectedOffice, setSelectedProv, setWrittenInfo, setMedicalInfo, setTrialInfo } = counterSlice.actions

export default counterSlice.reducer