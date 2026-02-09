'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useState } from 'react'

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST APIs', 'Authentication'] },
  { category: 'Tools', items: ['Git', 'Figma', 'VS Code', 'AWS'] },
]

export default function About() {
  return (
    <section id="about" className="max-w-400 mx-auto">
      <div className="flex justify-center gap-16 p-16">
      <div className="flex flex-col gap-6 pt-16">
            <h2 className="text-7xl font-bold text-muted-foreground">
              Hi, I'm Jacob!
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
            My name's Jacob and I'm a full-time CS student at PJAIT.
            Throughout my life I've tinkered with various forms of creative expression, such as video editing, music and animation.
            Ultimately what I've found to love most is creating visuals that rely on complex systems to create amazing experiences that don't just look cool, but work in a bigger environment and perform well.
            Thank you for checking out my website!
            </p>
          </div>
        <Image
        src="https://PortfolioPullZone.b-cdn.net/LandingPage/FaceForeground.webp"
        alt="About Me"
        width={500}
        height={500}
        className="rounded-2xl bg-white/5 border"
        />
      </div>
    </section>
  )
}
