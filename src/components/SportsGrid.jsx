import { useState } from 'react'

const sports = [
  { emoji: '🏏', name: 'Cricket', count: '48 events', color: '#22C55E', sub: 'IPL • Test • T20' },
  { emoji: '⚽', name: 'Football', count: '186 events', color: '#3B82F6', sub: 'ISL • EPL • UCL' },
  { emoji: '🏒', name: 'Kabaddi', count: '22 events', color: '#FF6B00', sub: 'Pro Kabaddi League' },
  { emoji: '🎾', name: 'Tennis', count: '94 events', color: '#FFAB00', sub: 'ATP • WTA • ITF' },
  { emoji: '🏀', name: 'Basketball', count: '68 events', color: '#A855F7', sub: 'NBA • NBL' },
  { emoji: '🏑', name: 'Hockey', count: '18 events', color: '#06B6D4', sub: 'FIH • HIL' },
  { emoji: '🥊', name: 'Boxing', count: '12 events', color: '#EF4444', sub: 'WBA • WBC' },
  { emoji: '🏋️', name: 'Esports', count: '55 events', color: '#8B5CF6', sub: 'BGMI • VALORANT' },
  { emoji: '🏁', name: 'Formula 1', count: '8 events', color: '#F43F5E', sub: 'F1 2025 Season' },
]

export default function SportsGrid() {
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700 }}>🏆 All Sports</h2>
        <span style={{ fontSize: 12, color: '#64748B' }}>{sports.length} categories</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        {sports.map((sport, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${hovered === i ? `${sport.color}35` : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 14, padding: '1rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: 12,
              cursor: 'pointer', transition: 'all 0.2s',
              transform: hovered === i ? 'translateY(-2px)' : 'none'
            }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: `${sport.color}12`, border: `1px solid ${sport.color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              transform: hovered === i ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s'
            }}>{sport.emoji}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC', marginBottom: 1 }}>{sport.name}</div>
              <div style={{ fontSize: 10, color: sport.color, fontWeight: 600 }}>{sport.count}</div>
              <div style={{ fontSize: 10, color: '#475569', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sport.sub}</div>
            </div>
            <div style={{ marginLeft: 'auto', color: '#64748B', opacity: hovered === i ? 1 : 0, transition: 'opacity 0.2s', fontSize: 16 }}>→</div>
          </div>
        ))}
      </div>
    </div>
  )
}
