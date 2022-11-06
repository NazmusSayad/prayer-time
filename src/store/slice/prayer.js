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
    raw: {},
    list: [],
  },

  currentPrayer: undefined,
  nextPrayer: undefined,
}

const prayer = createSlice({
  name: 'prayer',
  initialState,
  reducers: {
    updateDate(state, { payload }) {
      state.date = payload
    },
    updatePrayer(state, { payload }) {
      state.prayerTimes = payload
    },
    updateCurrentNext(state, { payload }) {
      state.currentPrayer = payload.current
      state.nextPrayer = payload.next
    },

    updateMethod(state, { payload }) {
      state.config.method = payload
    },
    updateMadhab(state, { payload }) {
      state.config.madhab = payload
    },
    updateCords(state, { payload }) {
      state.config.cords = payload
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
