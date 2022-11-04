import { useEffect } from 'react'

export const useOnMount = callback => {
  useEffect(() => callback(), [])
}

export const useOnMountAsync = (callback, cleanUp) => {
  useEffect(() => {
    callback()
    return cleanUp
  }, [])
}

export const useOnUnmount = callback => {
  useEffect(() => callback, [])
}
