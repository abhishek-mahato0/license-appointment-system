import { configureStore } from '@reduxjs/toolkit'
import applySliceReducer  from './slices/applynewSlice'
import personalInformationSliceReducer from './slices/profileInformationSlice'
import publicDashboardSliceReducer from './slices/dashboardSlice'

export const store = configureStore({
  reducer: {
    applynew: applySliceReducer,
    profileInformation: personalInformationSliceReducer,
    dashboard: publicDashboardSliceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch