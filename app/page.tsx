import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects/index'
import About from '@/components/About'
import SectionHeader from '@/components/SectionHeader'
import Background from '@/components/Background'

export default function Home() {
  return (
    <div className="relative min-h-screen">
        <Background />
        <Header />
        <Hero />
        <Projects />
        <SectionHeader title="About Me" />
        <About />
        <SectionHeader title="About Me" />
    </div>
  )
}
