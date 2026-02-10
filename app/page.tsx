import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects/index'
import About from '@/components/About'
import SectionHeader from '@/components/SectionHeader'
import Background from '@/components/Background'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  const projectsStartTop = 'calc(50vh + min(50vh, calc(150vh * 9 / 32)))'
  
  return (
    <div className="relative min-h-screen">
        <Background />
        {/* <Header /> */}
        <div className="relative h-screen">
          <Hero />
        </div>
        <div 
          className="relative"
          style={{
            marginTop: `calc(${projectsStartTop} - 100vh)`
          }}
        >
          <Projects />
          <About />
        </div>
    </div>
  )
}
