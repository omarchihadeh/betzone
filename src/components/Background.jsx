export default function Background() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      {/* Blobs */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91,79,255,0.12) 0%, transparent 65%)'
      }} />
      <div style={{
        position: 'absolute', top: '30%', right: '-15%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,245,160,0.07) 0%, transparent 65%)'
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '30%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 65%)'
      }} />
    </div>
  )
}
