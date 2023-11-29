import { configureStore } from '@reduxjs/toolkit'
import applySliceReducer  from './slices/applynewSlice'

export const store = configureStore({
  reducer: {
    applynew: applySliceReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch