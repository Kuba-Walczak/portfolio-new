"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { ArrowLeft, Mail } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarBadge } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useApp } from "@/contexts/AppContext"
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa"

const navItemClass =
  "relative inline-flex items-center gap-0.5 transition-colors duration-200 cursor-pointer bg-transparent border-0 p-0 font-[inherit]"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { projects, openContacts, setOpenContacts } = useApp()
  const [isAtTop, setIsAtTop] = useState(true)
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null)
  const elementTopRef = useRef<number>(0)

  const isMainPage = pathname === "/"

  const projectLabel = useMemo(() => {
    if (!pathname || pathname === "/") return null
    const slug = pathname.split("/").filter(Boolean)[0]
    if (!slug) return null
    if (projects === null) return "…"
    return projects.find((p) => p.id === slug)?.title ?? slug
  }, [pathname, projects])

  const contacts = {
      github: {
        id: "github",
        label: "Kuba-Walczak",
        icon: <FaGithub className="size-8" />,
        href: "https://github.com/kuba-walczak",
      },
      linkedin: {
        id: "linkedin",
        label: "kuba-walczak-dev",
        icon: <FaLinkedin className="size-8" />,
        href: "https://linkedin.com/in/kuba-walczak-dev",
      },
      mail: {
        id: "mail",
        label: "kubawalczak005@gmail.com",
        icon: <Mail className="size-8" />,
        href: "mailto:kubawalczak005@gmail.com",
      },
      discord: {
        id: "discord",
        label: "kuba.walczak",
        icon: <FaDiscord className="size-8" />,
        href: "https://discord.com/users/347743687838662658",
      }
    }

  const killScrollAnimation = () => {
    if (scrollTweenRef.current) {
      scrollTweenRef.current.kill()
      scrollTweenRef.current = null
    }
  }

  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY <= 10)
    }
    const onUserInterrupt = () => { 
      killScrollAnimation()
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("wheel", onUserInterrupt, { passive: true })
    window.addEventListener("touchstart", onUserInterrupt, { passive: true })
    const element = document.getElementById("projects")
    if (element) {
      elementTopRef.current = element.getBoundingClientRect().top - element.offsetHeight
    }
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("wheel", onUserInterrupt)
      window.removeEventListener("touchstart", onUserInterrupt)
      killScrollAnimation()
    }
  }, [])

  const handleScrollTo = (targetY: number) => {
    killScrollAnimation()
    const scrollProxy = { y: window.pageYOffset }
    scrollTweenRef.current = gsap.to(scrollProxy, {
      y: targetY,
      duration: 2,
      overwrite: "auto",
      onUpdate: () => {
        window.scrollTo(0, scrollProxy.y)
      },
      onComplete: () => {
        scrollTweenRef.current = null
      },
    })
  }

  return (
    <header
      className={`mx-auto fixed top-0 left-0 right-0 z-50 flex items-center ${isMainPage ? "" : "justify-center"} sm:justify-center px-6 rounded-b-2xl border-ui-glass transition-all duration-200 ${!isAtTop ? "py-2" : "py-4"}`}
      style={{ maxWidth: "calc(100vh * 1.1)", background: !isAtTop ? "var(--background)" : "var(--glass)" }}
    >

      {!isMainPage && (
        <div className="absolute left-6 top-1/2 z-10 -translate-y-1/2">
          <ArrowLeft
            className="size-8 cursor-pointer transition-colors duration-200 text-secondary hover:text-[var(--text-primary)]"
            onClick={() => router.push("/")}
          />
        </div>
      )}

      {isMainPage && (
        <nav className="flex items-center justify-center gap-2 sm:gap-16 md:gap-32">
          <a
            className={cn(
              navItemClass,
              "type-h2 hover:text-[var(--text-primary)]"
            )}
            onClick={(e) => {
              e.preventDefault()
              handleScrollTo(0)
            }}
          >
            Home
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                navItemClass,
                "group type-h2 hover:text-[var(--text-primary)] data-[state=open]:text-[var(--text-primary)] focus:outline-none"
              )}
            >
              Projects
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={!isAtTop ? 14 : 32}
              className={`min-w-[12rem] border-ui-glass backdrop-blur-xl ${!isAtTop ? "bg-background" : "bg-glass"} transition-transform duration-200`}
            >
              {projects === null && (
                <DropdownMenuItem disabled className="cursor-default text-[var(--text-secondary)]">
                  Loading…
                </DropdownMenuItem>
              )}
              {projects?.length === 0 && (
                <DropdownMenuItem disabled className="cursor-default text-[var(--text-secondary)]">
                  No projects
                </DropdownMenuItem>
              )}
              {projects?.map((project) => (
                <DropdownMenuItem
                  key={project.id}
                  disabled={project.status === "coming-soon"}
                  className="cursor-pointer text-[var(--text-primary)]"
                  onSelect={() => {
                    if (project.status === "coming-soon") return
                    router.push(`/${project.id}`)
                  }}
                >
<span className="block truncate w-64 sm:w-full">
  {project.title}
</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-[var(--card-border)]" />
              <DropdownMenuItem
                className="cursor-pointer text-[var(--text-primary)]"
                onSelect={() => {
                  handleScrollTo(elementTopRef.current)
                }}
              >
                All projects
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a
            className={cn(
              navItemClass,
              "type-h2 hover:text-[var(--text-primary)]"
            )}
            onClick={(e) => {
              e.preventDefault()
              handleScrollTo(document.documentElement.scrollHeight - window.innerHeight)
            }}
          >
            About
          </a>
        </nav>
      )}

      {!isMainPage && (
        <span className="type-h2">
          {projectLabel}
        </span>
      )}

      <div className="absolute right-6 top-1/2 z-10 -translate-y-1/2">
        <DropdownMenu open={openContacts} onOpenChange={setOpenContacts}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "rounded-full outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              <Avatar className={`border-ui-glass overflow-visible transition-all duration-200 ${!isAtTop ? "size-8" : "size-10"}`}>
                <AvatarFallback className={`bg-gradient-to-r from-primary/80 to-secondary/80 transition-colors duration-200 cursor-pointer hover:brightness-120 text-xs transition-all duration-200 font-semibold text-[var(--text-primary)] ${!isAtTop ? "text-xs" : "text-sm"}`}>
                  KW
                </AvatarFallback>
                <AvatarBadge className="bg-green-600" />
              </Avatar>
            </button>
          </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              sideOffset={!isAtTop ? 12 : 24}
              className={`min-w-[12rem] border-ui-glass backdrop-blur-xl ${!isAtTop ? "bg-background" : "bg-glass"}`}
            >
              <DropdownMenuLabel className="text-[var(--text-secondary)]">Contacts</DropdownMenuLabel>
              {projects === null && (
                <DropdownMenuItem disabled className="cursor-default text-[var(--text-secondary)]">
                  Loading…
                </DropdownMenuItem>
              )}
              {projects?.length === 0 && (
                <DropdownMenuItem disabled className="cursor-default text-[var(--text-secondary)]">
                  No contacts
                </DropdownMenuItem>
              )}
              {Object.values(contacts).map((contact) => (
                <DropdownMenuItem
                  key={contact.id}
                  className="cursor-pointer text-[var(--text-primary)]"
                  onSelect={() => {
                    window.open(contact.href, "_blank")
                  }}
                >
                  {contact.icon}
                  {contact.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
