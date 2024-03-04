
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state

type Tappointments={
    appointments:Array<any>,
    pendingAppointment:any
}
const initialState:Tappointments = 
    {
        appointments:[],
        pendingAppointment:null
    }

export const appointmentSlice = createSlice({
  name: 'appointmentSlice',
  initialState,
  reducers: {
    setAppointment:(state,action)=>{
      state.appointments=action.payload
    },
    setPendingAppointment:(state)=>{
        const app = state.appointments.filter((app:any)=>app?.status==="pending")[0]
        state.pendingAppointment=app
    }
  },
})

export const { setAppointment,setPendingAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer