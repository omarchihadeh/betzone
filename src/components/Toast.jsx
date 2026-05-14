import { useEffect, useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

export default function Toast({ msg, type }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 10) }, [])
  const isSuccess = type === 'success'
  return (
    <div style={{
      position: 'fixed', top: 88, right: 24, zIndex: 300,
      background: '#0D1120', border: `1px solid ${isSuccess ? 'rgba(0,245,160,0.3)' : 'rgba(255,107,107,0.3)'}`,
      borderRadius: 14, padding: '14px 20px',
      display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${isSuccess ? 'rgba(0,245,160,0.05)' : 'rgba(255,107,107,0.05)'}`,
      transform: visible ? 'translateX(0)' : 'translateX(120%)',
      transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      maxWidth: 360, backdropFilter: 'blur(20px)'
    }}>
      {isSuccess
        ? <CheckCircle size={18} color="#00F5A0" />
        : <XCircle size={18} color="#FF6B6B" />}
      <span style={{ fontSize: 14, fontWeight: 500, color: '#F8FAFC' }}>{msg}</span>
    </div>
  )
}
