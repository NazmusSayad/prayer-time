import { useRef, useEffect } from 'react'
import css from './index.module.scss'
import Settings from './Settings'

const index = ({ setShowSettings }) => {
  const dialogRef = useRef()

  const hideSettings = () => {
    dialogRef.current.classList.add(css.close)
    dialogRef.current.onanimationend = () => {
      setShowSettings(false)
    }
  }

  useEffect(() => {
    const element = dialogRef.current
    element.close()
    element.showModal()
    return () => element.close()
  }, [])

  return (
    <dialog ref={dialogRef} className={css.Settings}>
      <div className={css.backdrop} onClick={hideSettings} />
      <div className={css.content}>
        <Settings close={hideSettings} />
      </div>
    </dialog>
  )
}

export default index
