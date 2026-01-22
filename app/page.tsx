import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
        <Hero />
        <Projects />
        <About />
    </div>
  )
}
