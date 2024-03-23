import { configureStore } from '@reduxjs/toolkit'
import applySliceReducer  from './slices/applynewSlice'
import personalInformationSliceReducer from './slices/profileInformationSlice'
import publicDashboardSliceReducer from './slices/dashboardSlice'
import officeListSliceReducer from './slices/officeListSlice'
import userSliceReducer from './slices/userSlice'
import appointmentSliceReducer from './slices/appointmentSlice'
import newsListSliceReducer from './slices/newsSlice'

export const store = configureStore({
  reducer: {
    applynew: applySliceReducer,
    profileInformation: personalInformationSliceReducer,
    dashboard: publicDashboardSliceReducer,
    officeList: officeListSliceReducer,
    user: userSliceReducer,
    appointments: appointmentSliceReducer,
    news: newsListSliceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch