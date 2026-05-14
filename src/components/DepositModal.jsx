import { useState } from 'react'
import { X, CheckCircle, Info } from 'lucide-react'

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', emoji: '⚡', gradient: 'linear-gradient(135deg,#FF6B00,#FF9500)', color: '#FF6B00', sub: 'Google Pay, PhonePe, Paytm', recommended: true },
  { id: 'phonepe', name: 'PhonePe', emoji: '💜', gradient: 'linear-gradient(135deg,#6B21A8,#9333EA)', color: '#9333EA', sub: 'Direct transfer' },
  { id: 'gpay', name: 'Google Pay', emoji: '🟢', gradient: 'linear-gradient(135deg,#1A6B3C,#22C55E)', color: '#22C55E', sub: 'Instant via UPI' },
  { id: 'paytm', name: 'Paytm', emoji: '🔵', gradient: 'linear-gradient(135deg,#0057A8,#0080FF)', color: '#3B82F6', sub: 'Paytm Wallet / UPI' },
  { id: 'netbanking', name: 'Net Banking', emoji: '🏦', gradient: 'linear-gradient(135deg,#374151,#6B7280)', color: '#9CA3AF', sub: 'All Indian banks' },
]

const QUICK = [500, 1000, 2000, 5000, 10000, 25000]

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

export default function DepositModal({ onClose, onDeposit }) {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState(null)
  const [step, setStep] = useState(1)
  const amt = parseFloat(amount)
  const canProceed = amt >= 100 && method
  const bonusAmt = amt >= 1000 ? Math.round(amt * 0.05) : 0

  function handleProceed() {
    if (!canProceed) return
    if (step === 1) { setStep(2); return }
    onDeposit(amt, method)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(14px)'
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: '#0A0E1A', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24, width: 520, maxWidth: '96vw', overflow: 'hidden',
        boxShadow: '0 30px 90px rgba(0,0,0,0.7)',
        animation: 'slideUp 0.25s ease'
      }}>
        <style>{`@keyframes slideUp { from { transform: translateY(24px); opacity:0 } to { transform:translateY(0);opacity:1 } }`}</style>

        {/* Header */}
        <div style={{
          padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          background: 'linear-gradient(135deg,rgba(255,107,0,0.08),transparent)'
        }}>
          <div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800 }}>
              {step === 1 ? 'Add Money' : 'Review & Confirm'}
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>
              {step === 1 ? 'Minimum ₹100 • Instant credit' : `${fmt(amt)} via ${method}`}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {[1, 2].map(s => (
                <div key={s} style={{ width: s === step ? 22 : 8, height: 4, borderRadius: 4, background: s <= step ? '#FF6B00' : 'rgba(255,255,255,0.1)', transition: 'all 0.3s' }} />
              ))}
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {step === 1 ? (
          <div style={{ padding: '1.5rem' }}>
            {/* Amount */}
            <label style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Deposit Amount</label>
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 20, color: '#FF6B00', fontWeight: 800 }}>₹</span>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount"
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${amt > 0 ? 'rgba(255,107,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 12, padding: '14px 80px 14px 42px', fontSize: 22, color: '#F8FAFC',
                  outline: 'none', fontWeight: 800, transition: 'border-color 0.2s', fontVariantNumeric: 'tabular-nums'
                }} />
              {bonusAmt > 0 && (
                <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, background: 'rgba(168,85,247,0.15)', color: '#C084FC', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 6, padding: '3px 10px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  +{fmt(bonusAmt)} bonus!
                </span>
              )}
            </div>

            {/* Info */}
            {amt > 0 && amt < 100 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#EF4444', marginBottom: '1rem' }}>
                <Info size={12} /> Minimum deposit is ₹100
              </div>
            )}

            {/* Quick amounts */}
            <label style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Quick Select</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: '1.25rem' }}>
              {QUICK.map(q => (
                <button key={q} onClick={() => setAmount(String(q))} style={{
                  background: amt === q ? 'rgba(255,107,0,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${amt === q ? 'rgba(255,107,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 10, padding: '10px', color: amt === q ? '#FF9500' : '#94A3B8',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', fontVariantNumeric: 'tabular-nums'
                }}>{fmt(q)}</button>
              ))}
            </div>

            {/* Payment methods */}
            <label style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Payment Method</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.5rem' }}>
              {PAYMENT_METHODS.map(pm => (
                <div key={pm.id} onClick={() => setMethod(pm.name)} style={{ position: 'relative' }}>
                  {pm.recommended && <div style={{ position: 'absolute', top: -8, right: -8, zIndex: 1, background: '#FF6B00', color: 'white', fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: 8, letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>⚡ FASTEST</div>}
                  <div style={{
                    background: method === pm.name ? pm.gradient : 'rgba(255,255,255,0.04)',
                    border: `2px solid ${method === pm.name ? pm.color : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 14, padding: '13px', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                    transition: 'all 0.2s', transform: method === pm.name ? 'scale(1.02)' : 'scale(1)'
                  }}>
                    <span style={{ fontSize: 22 }}>{pm.emoji}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: method === pm.name ? 'white' : '#F8FAFC' }}>{pm.name}</span>
                    <span style={{ fontSize: 10, color: method === pm.name ? 'rgba(255,255,255,0.7)' : '#64748B', textAlign: 'center' }}>{pm.sub}</span>
                    {method === pm.name && <CheckCircle size={14} color="white" />}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleProceed} disabled={!canProceed} style={{
              width: '100%', padding: '15px',
              background: canProceed ? 'linear-gradient(135deg,#FF6B00,#FF9500)' : 'rgba(255,255,255,0.05)',
              border: 'none', borderRadius: 14, color: canProceed ? 'white' : '#475569',
              fontSize: 16, fontWeight: 800, cursor: canProceed ? 'pointer' : 'not-allowed',
              boxShadow: canProceed ? '0 6px 24px rgba(255,107,0,0.35)' : 'none', transition: 'all 0.2s'
            }}>
              {!amount || amt < 100 ? 'Enter Amount ₹100+' : !method ? 'Select Payment Method' : `Review Deposit of ${fmt(amt)} →`}
            </button>
          </div>
        ) : (
          <div style={{ padding: '1.5rem' }}>
            <div style={{
              background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)',
              borderRadius: 18, padding: '2rem', marginBottom: '1.25rem', textAlign: 'center'
            }}>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 6 }}>You're depositing</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 44, fontWeight: 800, color: '#22C55E', fontVariantNumeric: 'tabular-nums' }}>{fmt(amt)}</div>
              <div style={{ marginTop: 8, fontSize: 14, color: '#64748B' }}>via <strong style={{ color: '#F8FAFC' }}>{method}</strong></div>
              {bonusAmt > 0 && (
                <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: 10, padding: '8px 16px' }}>
                  <span>🎁</span>
                  <span style={{ fontSize: 13, color: '#C084FC', fontWeight: 700 }}>+{fmt(bonusAmt)} bonus will be credited instantly!</span>
                </div>
              )}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: '1rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Amount', val: fmt(amt) },
                { label: 'Payment Method', val: method },
                { label: 'Processing Time', val: 'Instant' },
                { label: 'Transaction Fee', val: 'Free' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ fontSize: 13, color: '#64748B' }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC' }}>{row.val}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: '13px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#94A3B8', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
              <button onClick={handleProceed} style={{ flex: 2, padding: '13px', background: 'linear-gradient(135deg,#22C55E,#16A34A)', border: 'none', borderRadius: 12, color: 'white', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 20px rgba(34,197,94,0.3)' }}>
                ✓ Confirm & Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
