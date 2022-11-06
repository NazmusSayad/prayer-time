import { configureStore } from '@reduxjs/toolkit'
import { prayerReducers } from '$store/slice/prayer'

const store = configureStore({
  reducer: {
    prayer: prayerReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['prayer/updateDate', 'prayer/updatePrayer'],
        ignoredPaths: ['prayer.date', 'prayer.prayerTimes'],
      },
    }),
})

export default store
