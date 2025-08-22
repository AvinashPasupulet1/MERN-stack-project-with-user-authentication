import { useEffect, useState } from 'react'
import api from '../api'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [msg, setMsg] = useState('')

  const fetchAssignments = async () => {
    const { data } = await api.get('/upload/assignments')
    setAssignments(data)
  }
  useEffect(() => { fetchAssignments() }, [])

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    if (!file) return setMsg('Please choose a file')
    const formData = new FormData()
    formData.append('file', file)
    try {
      const { data } = await api.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      setAssignments(data)
      setMsg('Uploaded and distributed successfully')
    } catch (err) {
      setMsg(err.response?.data?.error || 'Upload failed')
    }
  }

  return (
    <div className="card">
      <h2>Upload & Distribute</h2>
      <form onSubmit={submit} className="row" style={{alignItems:'flex-start'}}>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={e=>setFile(e.target.files?.[0] || null)} />
        <button type="submit">Upload</button>
      </form>
      {msg && <div className="small" style={{marginTop:8}}>{msg}</div>}

      <h3 style={{marginTop:16}}>Assignments</h3>
      {assignments.map(a => (
        <div key={a.agent.id} className="card">
          <div><strong>{a.agent.name}</strong> — {a.agent.email} — {a.agent.mobile}</div>
          <table className="table">
            <thead><tr><th>FirstName</th><th>Phone</th><th>Notes</th></tr></thead>
            <tbody>
              {a.items.map((it, idx) => (
                <tr key={idx}><td>{it.FirstName}</td><td>{it.Phone}</td><td>{it.Notes}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
