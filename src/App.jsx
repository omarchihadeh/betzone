import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import LiveMatches from './components/LiveMatches'
import SportsGrid from './components/SportsGrid'
import TransactionHistory from './components/TransactionHistory'
import DepositModal from './components/DepositModal'
import WithdrawModal from './components/WithdrawModal'
import Background from './components/Background'
import Toast from './components/Toast'

export default function App() {
  const [balance, setBalance] = useState(0)
  const [totalDeposits, setTotalDeposits] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [bonus, setBonus] = useState(0)
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [activeNav, setActiveNav] = useState('sports')

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  function handleDeposit(amount, method) {
    const bonusAmt = amount >= 1000 ? Math.round(amount * 0.05) : 0
    setBalance(b => b + amount)
    setTotalDeposits(d => d + amount)
    setBonus(bns => bns + bonusAmt)
    setTransactions(txs => [{
      id: Date.now(), type: 'deposit', amount, method, bonus: bonusAmt,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    }, ...txs])
    setDepositOpen(false)
    showToast(`₹${amount.toLocaleString('en-IN')} added via ${method}!`)
  }

  function handleWithdraw(amount, method) {
    if (amount > balance) { showToast('Insufficient balance!', 'error'); return }
    setBalance(b => b - amount)
    setTransactions(txs => [{
      id: Date.now(), type: 'withdraw', amount, method, bonus: 0,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    }, ...txs])
    setWithdrawOpen(false)
    showToast(`₹${amount.toLocaleString('en-IN')} withdrawn via ${method}!`)
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Background />
      <Navbar balance={balance} onDeposit={() => setDepositOpen(true)} onWithdraw={() => setWithdrawOpen(true)} activeNav={activeNav} setActiveNav={setActiveNav} />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 5rem', position: 'relative', zIndex: 1 }}>
        <Hero onDeposit={() => setDepositOpen(true)} onWithdraw={() => setWithdrawOpen(true)} />
        <StatsBar balance={balance} totalDeposits={totalDeposits} txCount={transactions.length} bonus={bonus} />
        <LiveMatches />
        <SportsGrid />
        <TransactionHistory transactions={transactions} />
      </main>
      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', color: '#475569', fontSize: 12, position: 'relative', zIndex: 1 }}>
        🔒 Secured & Powered by <span style={{ color: '#FF6B00', fontWeight: 700 }}>BETZONE</span> · RBI Compliant · 18+ Only · Gamble Responsibly · <span style={{ color: '#64748B' }}>Helpline: 1800-XXX-XXXX</span>
      </div>
      {depositOpen && <DepositModal onClose={() => setDepositOpen(false)} onDeposit={handleDeposit} />}
      {withdrawOpen && <WithdrawModal onClose={() => setWithdrawOpen(false)} onWithdraw={handleWithdraw} balance={balance} />}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  )
}
