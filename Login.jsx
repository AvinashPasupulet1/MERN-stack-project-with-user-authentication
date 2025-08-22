import { useState } from 'react'
import api from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      window.location.href = '/'
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={submit} className="row" style={{flexDirection:'column', gap:12}}>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com" />
        <label>Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" type="password" />
        {error && <div className="small" style={{color:'#b91c1c'}}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
