import { BrowserRouter as Router, Routes } from 'react-router-dom'
import PublicRoutes from './publicRoutes'
import PrivateRoutes from './privateRoutes'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {PublicRoutes}
        {PrivateRoutes}
      </Routes>
    </Router>
  )
}

export default AppRouter