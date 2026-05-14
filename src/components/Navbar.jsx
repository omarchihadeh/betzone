import { useState } from 'react'
import { Wallet, TrendingUp, Gift, ChevronDown, Flame } from 'lucide-react'

export default function Navbar({ balance, onDeposit, onWithdraw, activeNav, setActiveNav }) {
  const navItems = [
    { id: 'sports', label: 'Sports', icon: <TrendingUp size={14} /> },
    { id: 'live', label: 'Live', icon: <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4444', display: 'inline-block', boxShadow: '0 0 6px #FF4444' }} /> },
    { id: 'ipl', label: 'IPL 2025', icon: <Flame size={14} color="#FF6B00" /> },
    { id: 'promotions', label: 'Offers', icon: <Gift size={14} /> },
  ]
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(7,10,19,0.92)', backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '0 2rem', height: 66,
      display: 'flex', alignItems: 'center', gap: '1.5rem'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'linear-gradient(135deg, #FF6B00, #FF9500)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, boxShadow: '0 4px 16px rgba(255,107,0,0.35)'
        }}>🎯</div>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1, color: '#F8FAFC' }}>
            BET<span style={{ color: '#FF6B00' }}>ZONE</span>
          </div>
          <div style={{ fontSize: 9, color: '#64748B', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>India's #1 Platform</div>
        </div>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '2px' }}>
        {navItems.map(item => (
          <button key={item.id}
            onClick={() => setActiveNav(item.id)}
            style={{
              color: activeNav === item.id ? '#F8FAFC' : '#64748B',
              background: activeNav === item.id ? 'rgba(255,255,255,0.07)' : 'transparent',
              border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer',
              padding: '7px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.15s'
            }}>
            {item.icon}{item.label}
          </button>
        ))}
      </div>

      {/* Right side */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Balance */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: '7px 16px', display: 'flex', alignItems: 'center', gap: 10
        }}>
          <Wallet size={14} color="#64748B" />
          <div>
            <div style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: '0.5px' }}>BALANCE</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#22C55E', fontVariantNumeric: 'tabular-nums' }}>
              ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <button onClick={onDeposit} style={{
          background: 'linear-gradient(135deg, #FF6B00, #FF9500)',
          color: 'white', border: 'none', borderRadius: 10,
          padding: '9px 20px', fontSize: 14, fontWeight: 700,
          boxShadow: '0 4px 16px rgba(255,107,0,0.3)', transition: 'transform 0.15s, opacity 0.15s'
        }}>+ Add Money</button>

        <button onClick={onWithdraw} style={{
          background: 'rgba(255,255,255,0.04)', color: '#94A3B8',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10,
          padding: '9px 18px', fontSize: 14, fontWeight: 600, transition: 'all 0.15s'
        }}>Withdraw</button>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, padding: '6px 12px', cursor: 'pointer'
        }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#FF6B00,#FF9500)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: 'white' }}>R</div>
          <span style={{ fontSize: 13, color: '#94A3B8', fontWeight: 500 }}>Rahul</span>
          <ChevronDown size={12} color="#64748B" />
        </div>
      </div>
    </nav>
  )
}
