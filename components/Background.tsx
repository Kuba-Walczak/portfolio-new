import { useApp } from '@/contexts/AppContext'

export default function Background() {
  const { setHeroVideoGlowRef } = useApp()
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(circle 96vmax at 105% -18%, rgba(91, 33, 182, 0.24) 0%, transparent 70%),
          radial-gradient(circle 96vmax at -5% -5%, rgba(76, 29, 149, 0.24) 0%, transparent 70%),
          radial-gradient(circle 96vmax at 92% 10%, rgba(67, 20, 120, 0.24) 0%, transparent 70%),
          radial-gradient(circle 75vmax at -5% 38%, rgba(59, 7, 100, 0.10) 0%, transparent 70%),
          radial-gradient(circle 100vmax at 25% 105%, rgba(49, 16, 92, 0.22) 0%, transparent 80%),
          radial-gradient(circle 100vmax at 108% 105%, rgba(38, 12, 68, 0.22) 0%, transparent 80%),
          radial-gradient(circle 69vmax at 98% 56%, rgba(107, 33, 168, 0.12) 0%, transparent 70%),
          radial-gradient(circle 100vmax at 50% 50%, rgba(16, 6, 35, 0.35) 0%, transparent 100%),
          black
        `,
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <p
          className="absolute uppercase font-bold whitespace-nowrap"
          style={{
            top: '-5%',
            left: '6%',
            fontSize: 'clamp(2.8rem, 40vmax, 128rem)',
            color: 'rgba(255, 255, 255, 0.03)',
            mixBlendMode: 'soft-light',
            fontFamily: 'var(--font-wdxl-lubrifont-sc)'
          }}
        >
          未
        </p>
        <p
          className="absolute uppercase font-bold whitespace-nowrap"
          style={{
            top: '22%',
            left: '65%',
            fontSize: 'clamp(2.8rem, 40vmax, 128rem)',
            color: 'rgba(255, 255, 255, 0.03)',
            mixBlendMode: 'soft-light',
            fontFamily: 'var(--font-wdxl-lubrifont-sc)'
          }}
        >
          未
        </p>
        <p
          className="absolute uppercase font-bold whitespace-nowrap"
          style={{
            top: '55%',
            left: '5%',
            fontSize: 'clamp(2.8rem, 40vmax, 128rem)',
            color: 'rgba(212, 87, 250, 0.5)',
            mixBlendMode: 'soft-light',
            fontFamily: 'var(--font-wdxl-lubrifont-sc)'
          }}
        >
          来
        </p>
      </div>
      <div
        ref={setHeroVideoGlowRef}
        className="absolute rounded-full opacity-0"
        style={{
          width: '200vw',
          height: '200vw',
          top: 0,
          right: 0,
          transform: 'translate(50%, -50%)',
        }}
      />
    </div>
  )
}
