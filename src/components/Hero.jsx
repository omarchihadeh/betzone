import { ArrowRight, Shield, Zap, Trophy, Star } from 'lucide-react'

export default function Hero({ onDeposit, onWithdraw }) {
  return (
    <div style={{ padding: '2.5rem 0 2rem', position: 'relative', zIndex: 1 }}>

      {/* Top badge row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.25)', borderRadius: 20, padding: '5px 14px' }}>
          <Trophy size={12} color="#FF6B00" />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#FF6B00', letterSpacing: '0.5px' }}>IPL 2025 LIVE BETTING</span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 20, padding: '5px 14px' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E', display: 'inline-block' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#22C55E' }}>247 Live Events</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '3rem' }}>
        {/* Left */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(34px,4.5vw,54px)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-1.5px', marginBottom: '1rem' }}>
            <span style={{ color: '#F8FAFC' }}>Bet Smart,<br />Win Big </span>
            <span style={{ background: 'linear-gradient(135deg,#FF6B00,#FFAB00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>in India</span>
          </h1>
          <p style={{ color: '#64748B', fontSize: 15, lineHeight: 1.75, marginBottom: '1.75rem', maxWidth: 430 }}>
            India's most trusted sports betting platform. Instant deposits & withdrawals via UPI, PhonePe, GPay and more. 100% legal, 100% secure.
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: '1.75rem' }}>
            <button onClick={onDeposit} style={{
              background: 'linear-gradient(135deg,#FF6B00,#FF9500)', color: 'white',
              border: 'none', borderRadius: 12, padding: '13px 28px',
              fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 6px 24px rgba(255,107,0,0.4)', cursor: 'pointer', transition: 'transform 0.15s'
            }}>
              Start Betting <ArrowRight size={16} />
            </button>
            <button onClick={onWithdraw} style={{
              background: 'rgba(255,255,255,0.05)', color: '#94A3B8',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '13px 24px',
              fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s'
            }}>Withdraw Funds</button>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { icon: <Zap size={13} />, text: 'UPI Instant' },
              { icon: <Shield size={13} />, text: 'SSL Secured' },
              { icon: <Star size={13} />, text: '4.8★ Rated' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B' }}>
                <span style={{ color: '#FF6B00' }}>{f.icon}</span>{f.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right: IPL Odds Card */}
        <div style={{
          width: 290, flexShrink: 0,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20, padding: '1.25rem', backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: 11, color: '#64748B', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>🏏 IPL 2025 Odds</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#FF4444', fontWeight: 600 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF4444', display: 'block', boxShadow: '0 0 5px #FF4444' }} />
              LIVE
            </span>
          </div>
          {[
            { t1: 'CSK', t2: 'MI', o1: '1.75', o2: '2.10', score: '186/4 (18)', status: '19th over' },
            { t1: 'RCB', t2: 'KKR', o1: '2.30', o2: '1.65', score: 'Yet to bat', status: 'Toss done' },
            { t1: 'DC', t2: 'SRH', o1: '1.90', o2: '1.95', score: 'Starts 7:30 PM', status: 'Today' },
          ].map((m, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? '0.85rem' : 0, paddingBottom: i < 2 ? '0.85rem' : 0, borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>{m.t1} vs {m.t2}</span>
                <span style={{ fontSize: 10, color: '#64748B' }}>{m.status}</span>
              </div>
              <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 6 }}>{m.score}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[{ l: m.t1, v: m.o1 }, { l: m.t2, v: m.o2 }].map((odd, j) => (
                  <button key={j} style={{
                    flex: 1, background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)',
                    borderRadius: 8, padding: '7px 0', cursor: 'pointer', transition: 'all 0.15s'
                  }}>
                    <div style={{ fontSize: 9, color: '#94A3B8', marginBottom: 1 }}>{odd.l}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#FF9500' }}>{odd.v}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
