'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="home"
      className="max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center gap-8"
    >
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          I create beautiful and functional digital experiences that help businesses grow and users
          succeed.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Get In Touch
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-foreground text-foreground hover:bg-secondary bg-transparent"
        >
          View My Work
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </section>
  )
}
