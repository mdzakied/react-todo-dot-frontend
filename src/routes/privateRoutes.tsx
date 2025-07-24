import { Route } from 'react-router-dom'
import TodoPage from '@/modules/todo/pages/TodoPage'
import ProtectedRoute from './ProtectedRoute'

const PrivateRoutes = (
  <>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <TodoPage />
        </ProtectedRoute>
      }
    />
  </>
)

export default PrivateRoutes
