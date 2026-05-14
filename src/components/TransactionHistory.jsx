import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

export default function TransactionHistory({ transactions }) {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700 }}>📋 Transaction History</h2>
        {transactions.length > 0 && <span style={{ fontSize: 12, color: '#64748B' }}>{transactions.length} records</span>}
      </div>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }}>
        {transactions.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>📂</div>
            <div style={{ color: '#64748B', fontSize: 15, fontWeight: 500 }}>No transactions yet</div>
            <div style={{ color: '#475569', fontSize: 13, marginTop: 5 }}>Add money via UPI to get started on BETZONE</div>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                {['Type', 'Method', 'Amount (INR)', 'Bonus', 'Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={tx.id} style={{ borderBottom: i < transactions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                        background: tx.type === 'deposit' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {tx.type === 'deposit' ? <ArrowUpRight size={15} color="#22C55E" /> : <ArrowDownRight size={15} color="#EF4444" />}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC', textTransform: 'capitalize' }}>{tx.type}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      background: 'rgba(255,107,0,0.1)', color: '#FF9500',
                      border: '1px solid rgba(255,107,0,0.2)', borderRadius: 6,
                      padding: '3px 10px', fontSize: 12, fontWeight: 700
                    }}>{tx.method}</span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 16, fontWeight: 800, color: tx.type === 'deposit' ? '#22C55E' : '#EF4444', fontVariantNumeric: 'tabular-nums' }}>
                    {tx.type === 'deposit' ? '+' : '-'}{fmt(tx.amount)}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: tx.bonus > 0 ? '#A855F7' : '#475569' }}>
                    {tx.bonus > 0 ? `+${fmt(tx.bonus)} 🎁` : '—'}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontSize: 13, color: '#94A3B8' }}>{tx.date}</div>
                    <div style={{ fontSize: 11, color: '#475569' }}>{tx.time}</div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      background: 'rgba(34,197,94,0.08)', color: '#22C55E',
                      border: '1px solid rgba(34,197,94,0.2)', borderRadius: 6,
                      padding: '4px 10px', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, width: 'fit-content'
                    }}>✓ Success</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
