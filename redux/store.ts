import { configureStore } from '@reduxjs/toolkit'
import counterSliceReducer  from './slices/applynewSlice'

export const store = configureStore({
  reducer: {
    count: counterSliceReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch