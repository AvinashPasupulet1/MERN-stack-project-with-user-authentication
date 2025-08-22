import { useEffect, useState } from 'react'
import api from '../api'

export default function Agents() {
  const [agents, setAgents] = useState([])
  const [form, setForm] = useState({ name:'', email:'', mobile:'', password:'' })
  const [msg, setMsg] = useState('')

  const load = async () => {
    const { data } = await api.get('/agents')
    setAgents(data)
  }
  useEffect(() => { load() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      await api.post('/agents', form)
      setForm({ name:'', email:'', mobile:'', password:'' })
      setMsg('Agent created')
      load()
    } catch (err) {
      setMsg(err.response?.data?.error || 'Failed to add agent')
    }
  }

  return (
    <div className="card">
      <h2>Agents</h2>
      <form onSubmit={submit} className="row" style={{flexDirection:'column', gap:10}}>
        <label>Name</label>
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <label>Email</label>
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <label>Mobile (+country code)</label>
        <input value={form.mobile} onChange={e=>setForm({...form, mobile:e.target.value})} placeholder="+91..." />
        <label>Password</label>
        <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        {msg && <div className="small">{msg}</div>}
        <button type="submit">Add Agent</button>
      </form>

      <h3 style={{marginTop:16}}>All Agents</h3>
      <table className="table">
        <thead><tr><th>Name</th><th>Email</th><th>Mobile</th></tr></thead>
        <tbody>
          {agents.map(a => <tr key={a.id}><td>{a.name}</td><td>{a.email}</td><td>{a.mobile}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}
