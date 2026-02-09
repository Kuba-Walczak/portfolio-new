import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects/index'
import About from '@/components/About'
import SectionHeader from '@/components/SectionHeader'
import Background from '@/components/Background'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <div className="relative min-h-screen">
        <Background />
        {/* <Header /> */}
        <Hero />
        <Projects />
        <About />
    </div>
  )
}
