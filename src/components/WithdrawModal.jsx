import { useState } from 'react'
import { X } from 'lucide-react'

const METHODS = [
  { id: 'upi', name: 'UPI', emoji: '⚡', gradient: 'linear-gradient(135deg,#FF6B00,#FF9500)', color: '#FF6B00' },
  { id: 'phonepe', name: 'PhonePe', emoji: '💜', gradient: 'linear-gradient(135deg,#6B21A8,#9333EA)', color: '#9333EA' },
  { id: 'gpay', name: 'Google Pay', emoji: '🟢', gradient: 'linear-gradient(135deg,#1A6B3C,#22C55E)', color: '#22C55E' },
  { id: 'bank', name: 'Bank Transfer', emoji: '🏦', gradient: 'linear-gradient(135deg,#374151,#6B7280)', color: '#9CA3AF' },
]
const QUICK = [500, 1000, 2000, 5000, 10000]
const fmt = (n) => '₹' + n.toLocaleString('en-IN')

export default function WithdrawModal({ onClose, onWithdraw, balance }) {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState(null)
  const amt = parseFloat(amount)
  const valid = amt >= 100 && amt <= balance && method

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(14px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#0A0E1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, width: 460, maxWidth: '96vw', overflow: 'hidden', boxShadow: '0 30px 90px rgba(0,0,0,0.7)' }}>

        {/* Header */}
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'linear-gradient(135deg,rgba(239,68,68,0.07),transparent)' }}>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800 }}>Withdraw Money</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>
              Available: <span style={{ color: '#22C55E', fontWeight: 700 }}>{fmt(balance)}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {/* Amount */}
          <label style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Amount (INR)</label>
          <div style={{ position: 'relative', marginBottom: amt > balance ? 6 : '1rem' }}>
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 20, color: '#EF4444', fontWeight: 800 }}>₹</span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount"
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1.5px solid ${amt > balance ? 'rgba(239,68,68,0.5)' : amt > 0 ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 12, padding: '14px 16px 14px 42px', fontSize: 22, color: '#F8FAFC', outline: 'none', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }} />
          </div>
          {amt > balance && <div style={{ fontSize: 12, color: '#EF4444', marginBottom: '1rem' }}>⚠️ Amount exceeds available balance</div>}

          {/* Quick */}
          <div style={{ display: 'flex', gap: 8, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {QUICK.filter(q => q <= balance || balance === 0).map(q => (
              <button key={q} onClick={() => setAmount(String(q))} style={{
                background: amt === q ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${amt === q ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 10, padding: '8px 14px', color: amt === q ? '#FCA5A5' : '#94A3B8',
                fontSize: 13, fontWeight: 700, cursor: 'pointer', fontVariantNumeric: 'tabular-nums'
              }}>{fmt(q)}</button>
            ))}
            {balance > 0 && (
              <button onClick={() => setAmount(String(balance))} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '8px 14px', color: '#94A3B8', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Max</button>
            )}
          </div>

          {/* Methods */}
          <label style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Send To</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.5rem' }}>
            {METHODS.map(m => (
              <div key={m.id} onClick={() => setMethod(m.name)} style={{
                background: method === m.name ? m.gradient : 'rgba(255,255,255,0.04)',
                border: `2px solid ${method === m.name ? m.color : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 12, padding: '12px 14px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.2s'
              }}>
                <span style={{ fontSize: 20 }}>{m.emoji}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: method === m.name ? 'white' : '#F8FAFC' }}>{m.name}</span>
              </div>
            ))}
          </div>

          <button onClick={() => valid && onWithdraw(amt, method)} disabled={!valid} style={{
            width: '100%', padding: '15px',
            background: valid ? 'linear-gradient(135deg,#EF4444,#DC2626)' : 'rgba(255,255,255,0.05)',
            border: 'none', borderRadius: 14, color: valid ? 'white' : '#475569',
            fontSize: 16, fontWeight: 800, cursor: valid ? 'pointer' : 'not-allowed',
            boxShadow: valid ? '0 6px 24px rgba(239,68,68,0.3)' : 'none', transition: 'all 0.2s'
          }}>
            {balance === 0 ? '⚠ No balance to withdraw' : !valid ? 'Enter amount & select method' : `Withdraw ${fmt(amt)} →`}
          </button>
        </div>
      </div>
    </div>
  )
}
