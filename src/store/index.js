import { configureStore } from '@reduxjs/toolkit'
import { prayerReducers } from '$store/slice/prayer'

const store = configureStore({
  reducer: {
    prayer: prayerReducers,
  },
})

export default store
