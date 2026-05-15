import { useState, useEffect } from 'react'
import { IS_PAYMENT } from './utils/constants'
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
import PaymentGateway from './components/PaymentGateway'

export default function App() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('betzone_balance')
    return saved ? parseFloat(saved) : 0
  })
  const [totalDeposits, setTotalDeposits] = useState(() => {
    const saved = localStorage.getItem('betzone_totalDeposits')
    return saved ? parseFloat(saved) : 0
  })
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('betzone_transactions')
    return saved ? JSON.parse(saved) : []
  })
  const [bonus, setBonus] = useState(() => {
    const saved = localStorage.getItem('betzone_bonus')
    return saved ? parseFloat(saved) : 0
  })
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [activeNav, setActiveNav] = useState('sports')

  useEffect(() => {
    localStorage.setItem('betzone_balance', balance.toString())
  }, [balance])

  useEffect(() => {
    localStorage.setItem('betzone_totalDeposits', totalDeposits.toString())
  }, [totalDeposits])

  useEffect(() => {
    localStorage.setItem('betzone_transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('betzone_bonus', bonus.toString())
  }, [bonus])

  // Handle deposit from payment gateway redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const depositAmount = params.get('deposit')
    const depositMethod = params.get('method')
    
    if (depositAmount && depositMethod) {
      const amount = parseFloat(depositAmount)
      const bonusAmt = amount >= 1000 ? Math.round(amount * 0.05) : 0
      
      setBalance(b => b + amount)
      setTotalDeposits(d => d + amount)
      setBonus(bns => bns + bonusAmt)
      setTransactions(txs => [{
        id: Date.now(), type: 'deposit', amount, method: depositMethod, bonus: bonusAmt,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      }, ...txs])
      
      window.history.replaceState({}, document.title, window.location.pathname)
      
      setToast({ msg: `₹${amount.toLocaleString('en-IN')} added via ${depositMethod}!`, type: 'success' })
      setTimeout(() => setToast(null), 3500)
    }
  }, [])

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

  // If in payment mode -> render PaymentGateway
  if (IS_PAYMENT) {
    return <PaymentGateway />
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
