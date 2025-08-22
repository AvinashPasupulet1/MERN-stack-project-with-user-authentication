import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const logout = () => { localStorage.removeItem('token'); navigate('/login') }

  return (
    <div className="container">
      <div className="card">
        <div className="row" style={{justifyContent:'space-between'}}>
          <h1>MERN Machine Test</h1>
          <div className="row">
            {token && <button onClick={logout}>Logout</button>}
          </div>
        </div>
        <div className="nav">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}
