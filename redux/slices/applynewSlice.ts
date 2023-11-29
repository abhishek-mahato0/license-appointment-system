import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
type Barstate={
  active:number,
  completed:Array<number>
}
interface ApplyState {
  barState:Barstate
  selectedCat:string | null,
  isTermsAgreed:boolean
  selectedOffice: string| null,
  selectedProv:string | null,
  selectedDate: string | null,
  selectedTime: string | null
}


const initialState: ApplyState = {
  barState:{
    active:1,
    completed:[]
  },
  isTermsAgreed:false,
  selectedCat:null,
  selectedOffice:null,
  selectedDate:null,
  selectedProv:null,
  selectedTime:null
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
    setSelectedDate:(state,action)=>{
      state.selectedDate=action.payload
    },
    setSelectedProv:(state,action)=>{
      state.selectedProv=action.payload
    },
    setSelectedOffice:(state,action)=>{
      state.selectedOffice=action.payload
    },
    setSelectedTime:(state,action)=>{
      state.selectedTime=action.payload
    }
  },
})

export const {setBarstate,setSelectedCat,setIsAgreed,setSelectedDate,setSelectedOffice, setSelectedProv,setSelectedTime } = counterSlice.actions

export default counterSlice.reducer