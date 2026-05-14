import { useState } from 'react'

const matches = [
  { id: 1, sport: '🏏', league: 'IPL 2025', home: 'CSK', away: 'Mumbai Indians', homeScore: '186/4', awayScore: '42/2', time: "19.2 ov", status: 'LIVE', h: '1.35', a: '3.10' },
  { id: 2, sport: '⚽', league: 'ISL — Indian Super League', home: 'Mumbai City', away: 'Bengaluru FC', homeScore: 1, awayScore: 1, time: "74'", status: 'LIVE', h: '2.40', d: '3.10', a: '2.90' },
  { id: 3, sport: '🎾', league: 'ATP India Open', home: 'Nagal', away: 'Ramkumar', homeScore: '6-4, 3', awayScore: '0, 5', time: 'Set 3', status: 'LIVE', h: '1.60', a: '2.30' },
  { id: 4, sport: '🏏', league: 'IPL 2025', home: 'RCB', away: 'Kolkata KR', homeScore: 'Yet to bat', awayScore: '—', time: '7:30 PM', status: 'UPCOMING', h: '2.10', a: '1.75' },
]

export default function LiveMatches() {
  const [selected, setSelected] = useState(null)
  const live = matches.filter(m => m.status === 'LIVE')
  const upcoming = matches.filter(m => m.status === 'UPCOMING')

  return (
    <div style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF4444', boxShadow: '0 0 8px #FF4444', display: 'block' }} />
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700 }}>Live & Upcoming</h2>
          <span style={{ background: 'rgba(255,68,68,0.12)', color: '#FF6B6B', border: '1px solid rgba(255,68,68,0.25)', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{live.length} LIVE</span>
        </div>
        <button style={{ background: 'none', border: 'none', color: '#FF6B00', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>See All →</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
        {matches.map(m => (
          <div key={m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}
            style={{
              background: selected === m.id ? 'rgba(255,107,0,0.07)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${selected === m.id ? 'rgba(255,107,0,0.3)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 14, padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.2s'
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: '#64748B', fontWeight: 500 }}>{m.sport} {m.league}</span>
              <span style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                background: m.status === 'LIVE' ? 'rgba(255,68,68,0.12)' : 'rgba(255,171,0,0.1)',
                color: m.status === 'LIVE' ? '#FF6B6B' : '#FFAB00',
                border: `1px solid ${m.status === 'LIVE' ? 'rgba(255,68,68,0.25)' : 'rgba(255,171,0,0.2)'}`
              }}>
                {m.status === 'LIVE' && <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF4444', display: 'block' }} />}
                {m.status === 'LIVE' ? m.time : m.time}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC' }}>{m.home}</div>
              <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 800, color: '#22C55E', fontVariantNumeric: 'tabular-nums' }}>
                {m.homeScore} — {m.awayScore}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC', textAlign: 'right' }}>{m.away}</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[{ l: '1', v: m.h }, ...(m.d ? [{ l: 'X', v: m.d }] : []), { l: '2', v: m.a }].map((odd, i) => (
                <button key={i} style={{
                  flex: 1, background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.2)',
                  borderRadius: 8, padding: '7px 0', cursor: 'pointer', transition: 'all 0.15s'
                }}>
                  <div style={{ fontSize: 9, color: '#64748B', fontWeight: 500, marginBottom: 1 }}>{odd.l}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#FF9500' }}>{odd.v}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
