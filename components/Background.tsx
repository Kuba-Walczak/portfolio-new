export default function Background() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-black"
      aria-hidden="true"
    >
      {/* Top Left Glow */}
      <div
        className="absolute rounded-full opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
          width: '800px',
          height: '800px',
          top: '-20%',
          left: '5%',
        }}
      />
      
      {/* Top Right Glow */}
      <div
        className="absolute rounded-full opacity-35 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, transparent 70%)',
          width: '1700px',
          height: '1700px',
          top: '10%',
          right: '10%',
        }}
      />
      
      {/* Center Left Glow */}
      <div
        className="absolute rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)',
          width: '900px',
          height: '900px',
          top: '35%',
          left: '-5%',
        }}
      />
      
      {/* Bottom Right Glow */}
      <div
        className="absolute rounded-full opacity-38 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, transparent 70%)',
          width: '750px',
          height: '750px',
          bottom: '5%',
          right: '5%',
        }}
      />
      
      {/* Bottom Center Glow */}
      <div
        className="absolute rounded-full opacity-32 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
          width: '1850px',
          height: '1850px',
          bottom: '-25%',
          left: '0%',
          transform: 'translateX(-50%)',
        }}
      />
      
      {/* Center Right Glow */}
      <div
        className="absolute rounded-full opacity-35 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)',
          width: '650px',
          height: '650px',
          top: '55%',
          right: '20%',
        }}
      />
    </div>
  )
}
