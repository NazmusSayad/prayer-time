import { useState, useEffect } from 'react'

const useDate = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const startClock = () => {
    setCurrentDate(new Date())
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const ms = new Date().getMilliseconds()
      if (!Math.floor(ms / 100)) {
        clearInterval(interval)
        startClock()
        setInterval(startClock, 1000)
      }
    }, 10)
    return () => clearInterval(interval)
  }, [])

  return currentDate
}
export default useDate
