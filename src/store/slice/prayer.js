import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  date: new Date(),

  config: {
    madhab: 'hanafi',
    method: 'Karachi',
    cords: {
      latitude: '22.497924',
      longitude: '89.098102',
    },
  },

  prayerTimes: {
    main: {},
    extra: {},
  },
}

const prayer = createSlice({
  name: 'prayer',
  initialState,
  reducers: {
    root(state, { payload = {} }) {
      delete payload.config
      Object.assign(state, payload)
    },
  },
})

export const prayerReducers = prayer.reducer
export default prayer.actions

export const updatePrayer = function (dispatch, getStore) {
  const store = getStore()
  const currentDate = new Date()
  const payload = { date: currentDate }

  dispatch(prayer.actions.root(payload))
}
