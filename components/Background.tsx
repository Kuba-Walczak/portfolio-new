import { useApp } from '@/contexts/AppContext'

export default function Background() {
  const { setHeroVideoGlowRef } = useApp()
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
      aria-hidden="true"
      // style={{
      //   background: `
      //     radial-gradient(circle 500px at 20% -8%, rgba(59, 130, 246, 0.24) 0%, transparent 70%),
      //     radial-gradient(circle 850px at 105% -18%, rgba(50, 51, 234, 0.35) 0%, transparent 70%),
      //     radial-gradient(circle 850px at -5% -5%, rgba(50, 51, 234, 0.35) 0%, transparent 70%),
      //     radial-gradient(circle 850px at 92% 10%, rgba(147, 51, 234, 0.35) 0%, transparent 70%),
      //     radial-gradient(circle 450px at -5% 38%, rgba(99, 102, 241, 0.15) 0%, transparent 70%),
      //     radial-gradient(circle 925px at 25% 105%, rgba(255, 0, 0, 0.32) 0%, transparent 80%),
      //     radial-gradient(circle 925px at 108% 105%, rgba(127, 90, 187, 0.32) 0%, transparent 80%),
      //     radial-gradient(circle 325px at 98% 56%, rgba(168, 85, 247, 0.175) 0%, transparent 70%)
      //   `,
      // }}
    >
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
