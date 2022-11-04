import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import css from './InitialApp.module.scss'

const Home = () => {
  return (
    <div>
      <p className={css.paragraph}>This is home page...</p>

      <Link className={css.link} to="/about">
        About
      </Link>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <p className={css.paragraph}>This is about page...</p>

      <Link className={css.link} to="/">
        Home
      </Link>
    </div>
  )
}

const Error = () => {
  return (
    <div>
      <p className={css.paragraph}>This is isn't created yet...</p>

      <Link className={css.link} to="/">
        Home
      </Link>
      <Link className={css.link} to="/about">
        About
      </Link>
    </div>
  )
}

const InitialApp = () => {
  return (
    <>
      <h1 className={css.heading}>Hello world!</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/404" element={<Error />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<Navigate to="404" />} />
        </Routes>

        <Link className={`${css.link} ${css.random}`} to={'/random'}>
          Random
        </Link>
      </BrowserRouter>
    </>
  )
}

export default InitialApp
