import css from './Header.module.scss'
import SettingsIcon from '$assets/icons/gear-solid.svg?component'
import ExpandIcon from '$assets/icons/expand-solid.svg?component'
import CompressIcon from '$assets/icons/compress-solid.svg?component'

const Header = ({ setShowSettings }) => {
  return (
    <div className="wrapper">
      <div className={css.Header}>
        <div className={css.fullScreen}>
          <button className={css.expand}>
            <ExpandIcon />
          </button>
          <button className={css.compress}>
            <CompressIcon />
          </button>
        </div>

        <button onClick={() => setShowSettings(true)}>
          <SettingsIcon />
        </button>
      </div>
    </div>
  )
}

export default Header
