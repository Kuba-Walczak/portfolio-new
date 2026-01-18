'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST APIs', 'Authentication'] },
  { category: 'Tools', items: ['Git', 'Figma', 'VS Code', 'AWS'] },
]

export default function About() {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-6 py-24 md:py-32 border-t border-border"
    >
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate full-stack developer with 5+ years of experience building web
              applications. I specialize in creating beautiful, performant, and user-friendly
              digital experiences that solve real problems.
            </p>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            When I'm not coding, you can find me exploring new technologies, contributing to
            open-source projects, or sharing knowledge with the developer community.
          </p>
        </div>

        <div className="space-y-4">
          {skills.map((skillGroup) => (
            <Card
              key={skillGroup.category}
              className="bg-card border-border"
            >
              <CardHeader>
                <CardTitle className="text-lg text-foreground">{skillGroup.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <div
                      key={item}
                      className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-12 border-t border-border text-center">
        <p className="text-muted-foreground mb-4">Let's work together</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">
            Email
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">
            LinkedIn
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">
            GitHub
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">
            Twitter
          </a>
        </div>
      </div>
    </section>
  )
}
