import { useState, useEffect } from 'react'
import { CheckCircle, Wallet, Ticket, Lock, Key } from 'lucide-react'
import payorioLogo from '../assets/fav.svg'

export default function PaymentGateway() {
  const [amount, setAmount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState('voucher') // 'voucher' or 'wallet' -> default is voucher
  const [step, setStep] = useState(1) // 1: form -> 2: OTP -> 3: TPIN -> 4: success
  
  const [voucherCode, setVoucherCode] = useState('')
  const [voucherTpin, setVoucherTpin] = useState('')
  
  const [walletNumber, setWalletNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [walletTpin, setWalletTpin] = useState('')
  
  const [loading, setLoading] = useState(false)
  const [redirectCountdown, setRedirectCountdown] = useState(5)
  const [transactionId, setTransactionId] = useState('')

  useEffect(() => {
    // Get amount from URL query params
    const params = new URLSearchParams(window.location.search)
    const amountParam = params.get('amount')
    if (amountParam) {
      setAmount(parseFloat(amountParam))
    }

    setTransactionId('PYR' + Date.now().toString().slice(-8))
  }, [])

  useEffect(() => {
    if (step === 4 && redirectCountdown > 0) {
      const timer = setTimeout(() => setRedirectCountdown(redirectCountdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (step === 4 && redirectCountdown === 0) {
      // Auto redirect to betzone with amount after success
      window.location.href = `https://betzone-demo.vercel.app?deposit=${amount}&method=Payorio`
      // window.location.href = `http://localhost:5173?deposit=${amount}&method=Payorio`
    }
  }, [step, redirectCountdown, amount])

  const handleVoucherSubmit = () => {
    if (!voucherCode || !voucherTpin || voucherTpin.length !== 6) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(4)
    }, 1500)
  }

  const handleWalletSubmit = () => {
    if (!walletNumber) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleOtpSubmit = () => {
    if (!otp || otp.length !== 6) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 1500)
  }

  const handleTpinSubmit = () => {
    if (!walletTpin || walletTpin.length !== 6) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(4)
    }, 2000)
  }

  const fmt = (n) => '₹' + n.toLocaleString('en-IN')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#f5f7fa 0%,#e4e8ec 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <div style={{
        background: 'white',
        borderRadius: 20,
        width: '100%',
        maxWidth: 480,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <img src={payorioLogo} alt="Payorio" style={{ width: 40, height: 40 }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#1f2937' }}>Payorio Gateway</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>Secure Payment Gateway</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          {/* Amount Display */}
          <div style={{
            background: '#31006A',
            borderRadius: 16,
            padding: '1.25rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Amount to Pay</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'white' }}>{fmt(amount)}</div>
          </div>

          {/* Payment Method Selection -> Only visible on step 1 */}
          {step === 1 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, display: 'block', marginBottom: 10 }}>Payment Method</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setPaymentMethod('voucher')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    // background: paymentMethod === 'voucher' ? '#31006A' : 'white',
                    border: paymentMethod === 'voucher' ? '2px solid #31006A' : '2px solid #ffffff',
                    borderRadius: 12,
                    color: paymentMethod === 'voucher' ? '#374151' : '#374151',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                >
                  <Ticket size={18} />
                  Voucher
                </button>
                <button
                  onClick={() => setPaymentMethod('wallet')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    // background: paymentMethod === 'wallet' ? '#31006A' : 'white',
                    border: paymentMethod === 'wallet' ? '2px solid #31006A' : '2px solid #ffffff',
                    borderRadius: 12,
                    color: paymentMethod === 'wallet' ? '#374151' : '#374151',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                >
                  <Wallet size={18} />
                  Wallet
                </button>
              </div>
            </div>
          )}

          {/* Voucher Form */}
          {step === 1 && paymentMethod === 'voucher' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, display: 'block', marginBottom: 8 }}>Voucher Code</label>
                <input
                  type="text"
                  value={voucherCode}
                  onChange={e => setVoucherCode(e.target.value.toUpperCase())}
                  placeholder="Enter voucher code"
                  style={{
                    width: '100%',
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: 10,
                    padding: '12px 14px',
                    fontSize: 14,
                    color: '#1f2937',
                    outline: 'none',
                    fontWeight: 500,
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, display: 'block', marginBottom: 8 }}>TPIN</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    value={voucherTpin}
                    onChange={e => setVoucherTpin(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit TPIN"
                    maxLength={6}
                    style={{
                      width: '100%',
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: 10,
                      padding: '12px 14px 12px 40px',
                      fontSize: 14,
                      color: '#1f2937',
                      outline: 'none',
                      fontWeight: 500,
                      letterSpacing: '2px'
                    }}
                  />
                  <Lock size={16} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <button
                onClick={handleVoucherSubmit}
                disabled={!voucherCode || !voucherTpin || voucherTpin.length !== 6 || loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: !voucherCode || !voucherTpin || voucherTpin.length !== 6 || loading ? '#d1d5db' : '#30006B',
                  border: 'none',
                  borderRadius: 10,
                  color: !voucherCode || !voucherTpin || voucherTpin.length !== 6 || loading ? '#6b7280' : 'white',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: !voucherCode || !voucherTpin || voucherTpin.length !== 6 || loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                  boxShadow: !voucherCode || !voucherTpin || voucherTpin.length !== 6 || loading ? 'none' : '0 8px 25px rgba(48, 0, 107, 0.25)',
                }}
              >
                {loading ? 'Processing...' : 'Pay with Voucher'}
              </button>
            </div>
          )}

          {/* Wallet Form */}
          {step === 1 && paymentMethod === 'wallet' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, display: 'block', marginBottom: 8 }}>Wallet Number</label>
                <input
                  type="text"
                  value={walletNumber}
                  onChange={e => setWalletNumber(e.target.value)}
                  placeholder="Enter wallet number"
                  style={{
                    width: '100%',
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: 10,
                    padding: '12px 14px',
                    fontSize: 14,
                    color: '#1f2937',
                    outline: 'none',
                    fontWeight: 500
                  }}
                />
              </div>

              <button
                onClick={handleWalletSubmit}
                disabled={!walletNumber || loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: !walletNumber || loading ? '#d1d5db' : '#30006B',
                  border: 'none',
                  borderRadius: 10,
                  color: !walletNumber || loading ? '#6b7280' : 'white',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: !walletNumber || loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                  boxShadow: !walletNumber || loading ? 'none' : '0 8px 25px rgba(48, 0, 107, 0.25)',
                }}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          )}

          {/* OTP Step */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, border: '2px solid #30006B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Key size={20} color="#30006B" />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1f2937' }}>Enter OTP</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Sent to {walletNumber}</div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, display: 'block', marginBottom: 8 }}>OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  style={{
                    width: '100%',
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: 10,
                    padding: '12px 14px',
                    fontSize: 18,
                    color: '#1f2937',
                    outline: 'none',
                    fontWeight: 700,
                    letterSpacing: '6px',
                    textAlign: 'center'
                  }}
                />
              </div>

              <button
                onClick={handleOtpSubmit}
                disabled={!otp || otp.length !== 6 || loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: !otp || otp.length !== 6 || loading ? '#d1d5db' : '#30006B',
                  border: 'none',
                  borderRadius: 10,
                  color: !otp || otp.length !== 6 || loading ? '#6b7280' : 'white',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: !otp || otp.length !== 6 || loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                  boxShadow: !otp || otp.length !== 6 || loading ? 'none' : '0 8px 25px rgba(48, 0, 107, 0.25)',
                }}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          )}

          {/* TPIN Step */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, border: '2px solid #30006B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={20} color="#30006B" />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1f2937' }}>Enter TPIN</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Complete your payment</div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, color: '#6b7280', fontWeight: 600, display: 'block', marginBottom: 8 }}>TPIN</label>
                <input
                  type="password"
                  value={walletTpin}
                  onChange={e => setWalletTpin(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit TPIN"
                  maxLength={6}
                  style={{
                    width: '100%',
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: 10,
                    padding: '12px 14px',
                    fontSize: 18,
                    color: '#1f2937',
                    outline: 'none',
                    fontWeight: 700,
                    letterSpacing: '6px',
                    textAlign: 'center'
                  }}
                />
              </div>

              <button
                onClick={handleTpinSubmit}
                disabled={!walletTpin || walletTpin.length !== 6 || loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: !walletTpin || walletTpin.length !== 6 || loading ? '#d1d5db' : '#30006B',
                  border: 'none',
                  borderRadius: 10,
                  color: !walletTpin || walletTpin.length !== 6 || loading ? '#6b7280' : 'white',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: !walletTpin || walletTpin.length !== 6 || loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s, color 0.2s',
                  boxShadow: !walletTpin || walletTpin.length !== 6 || loading ? 'none' : '0 8px 25px rgba(48, 0, 107, 0.25)',
                }}
              >
                {loading ? 'Processing Payment...' : 'Confirm Payment'}
              </button>
            </div>
          )}

          {/* Success Screen */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#22C55E,#16A34A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                boxShadow: '0 8px 32px rgba(34,197,94,0.3)'
              }}>
                <CheckCircle size={40} color="white" />
              </div>

              <div style={{ fontSize: 24, fontWeight: 800, color: '#1f2937', marginBottom: 8 }}>Payment Successful!</div>
              <div style={{ fontSize: 14, color: '#6b7280', marginBottom: '1.5rem' }}>
                {fmt(amount)} has been credited to your BetZone Balance via {paymentMethod === 'voucher' ? 'Payorio Vouchers' : 'Payorio Wallet'}.
              </div>

              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 12,
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Transaction ID</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#16a34a', fontFamily: 'monospace' }}>
                  {transactionId}
                </div>
              </div>

              <div style={{
                background: '#fef3c7',
                border: '1px solid #fde68a',
                borderRadius: 12,
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}>
                <div style={{ fontSize: 14, color: '#92400e', fontWeight: 600 }}>
                  Redirecting in {redirectCountdown} seconds...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>
            Secured by Payorio • 256-bit SSL encryption
          </div>
        </div>
      </div>
    </div>
  )
}
