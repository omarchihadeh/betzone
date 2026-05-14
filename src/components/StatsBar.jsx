import { TrendingUp, ArrowUpRight, Wallet, Gift } from 'lucide-react'

const StatCard = ({ label, value, icon, color, sub }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 16, padding: '1.25rem 1.5rem', flex: 1,
    display: 'flex', alignItems: 'center', gap: '1rem'
  }}>
    <div style={{
      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
      background: `${color}15`, border: `1px solid ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <span style={{ color }}>{icon}</span>
    </div>
    <div>
      <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#475569', marginTop: 3 }}>{sub}</div>}
    </div>
  </div>
)

const fmt = (n) => '₹' + n.toLocaleString('en-IN')

export default function StatsBar({ balance, totalDeposits, txCount, bonus }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
      <StatCard label="Total Deposits" value={fmt(totalDeposits)} icon={<ArrowUpRight size={20} />} color="#22C55E" sub="All time" />
      <StatCard label="Transactions" value={txCount} icon={<TrendingUp size={20} />} color="#3B82F6" sub={txCount > 0 ? 'Completed' : 'No activity yet'} />
      <StatCard label="Wallet Balance" value={fmt(balance)} icon={<Wallet size={20} />} color="#FF6B00" sub="Available to bet" />
      <StatCard label="Bonus Earned" value={fmt(bonus)} icon={<Gift size={20} />} color="#A855F7" sub={bonus > 0 ? '🎉 Credited!' : 'Deposit ₹1,000+'} />
    </div>
  )
}
