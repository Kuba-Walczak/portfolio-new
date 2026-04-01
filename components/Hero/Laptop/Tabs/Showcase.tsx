import { useApp } from "@/contexts/AppContext";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Calendar, Clock } from "lucide-react";
import { gsap } from "gsap";

interface ShowcaseProps {
    title: string
    date: string
    duration: string
}

export function Showcase({ title, date, duration }: ShowcaseProps) {

    const { laptopReady, selectedProject } = useApp()

    const videoRef = useRef<HTMLVideoElement>(null)
    const [videoProgress, setVideoProgress] = useState(0)

    useEffect(() => {
        if (laptopReady) {
            videoRef.current?.play()
        }
    }, [laptopReady])

    useEffect(() => {
        const v = videoRef.current
        if (!v) return

        /** Last `timeupdate` t — detects loop wrap (with `loop`, `ended` often does not fire). */
        let lastVideoTime = 0

        let tweenTarget: { videoProgress: number } | null = null

        function kickProgressTween(d: number) {
            if (!Number.isFinite(d) || d <= 0) return

            if (tweenTarget) gsap.killTweensOf(tweenTarget)
            const target = { videoProgress: 0 }
            tweenTarget = target
            setVideoProgress(0)

            gsap.to(target, {
                videoProgress: 100,
                duration: d,
                ease: "none",
                overwrite: "auto",
                onUpdate: () => setVideoProgress(target.videoProgress),
            })
        }

        function startProgressLoop() {
            const el = videoRef.current
            if (!el || !laptopReady) return
            const d = el.duration
            if (!Number.isFinite(d) || d <= 0) return
            if (el.paused) return

            kickProgressTween(d)
        }

        function onTimeUpdate() {
            const el = videoRef.current
            if (!el || !laptopReady) return
            const t = el.currentTime
            const last = lastVideoTime
            if (last > 0.25 && t < last - 0.25) {
                lastVideoTime = t
                kickProgressTween(el.duration)
                return
            }
            lastVideoTime = t
        }

        function onEnded() {
            const el = videoRef.current
            if (!el || !laptopReady) return
            const d = el.duration
            if (!Number.isFinite(d) || d <= 0) return
            lastVideoTime = 0
            kickProgressTween(d)
        }

        v.addEventListener("loadedmetadata", startProgressLoop)
        v.addEventListener("play", startProgressLoop)
        v.addEventListener("timeupdate", onTimeUpdate)
        v.addEventListener("ended", onEnded)

        lastVideoTime = 0
        startProgressLoop()

        return () => {
            if (tweenTarget) gsap.killTweensOf(tweenTarget)
            tweenTarget = null
            v.removeEventListener("loadedmetadata", startProgressLoop)
            v.removeEventListener("play", startProgressLoop)
            v.removeEventListener("timeupdate", onTimeUpdate)
            v.removeEventListener("ended", onEnded)
            setVideoProgress(0)
        }
    }, [selectedProject?.laptop?.showcase, laptopReady])
    return (
        <div className="w-full h-full flex">
            <div className="flex h-full w-full min-h-0 min-w-0 flex-col justify-center gap-1 vsm:gap-2 vmd:gap-3 vlg:gap-4">
            <div className="grid w-full grid-cols-3 gap-1 vsm:gap-2 vmd:gap-3 vlg:gap-4">
            <Card className="min-w-0 flex flex-row items-center justify-center gap-1 vsm:gap-2 vmd:gap-3 vlg:gap-4 p-1 vsm:p-2 vmd:p-3 vlg:p-4 [font-family:var(--font-manrope)]">
            <FileText className="h-6 w-6 vsm:h-8 vsm:w-8 vmd:h-10 vmd:w-10 vlg:h-12 vlg:w-12 text-foreground" />
            <div>
              <h3 className="text-[10px] vmd:text-xs vlg:text-base font-medium text-muted-foreground">
                Title
              </h3>
              <p className="type-h5">{title}</p>
            </div>
        </Card>
            <Card className="min-w-0 flex flex-row items-center justify-center gap-1 vsm:gap-2 vmd:gap-3 vlg:gap-4 p-1 vsm:p-2 vmd:p-3 vlg:p-4 [font-family:var(--font-manrope)]">
            <Calendar className="h-6 w-6 vsm:h-8 vsm:w-8 vmd:h-10 vmd:w-10 vlg:h-12 vlg:w-12 text-foreground" />
            <div>
              <h3 className="text-[10px] vmd:text-xs vlg:text-base font-medium text-muted-foreground">
                Date
              </h3>
              <p className="type-h5">{date}</p>
            </div>
        </Card>
        <Card className="min-w-0 flex flex-row items-center justify-center gap-1 vsm:gap-2 vmd:gap-3 vlg:gap-4 p-1 vsm:p-2 vmd:p-3 vlg:p-4 [font-family:var(--font-manrope)]">
            <Clock className="h-6 w-6 vsm:h-8 vsm:w-8 vmd:h-10 vmd:w-10 vlg:h-12 vlg:w-12 text-foreground" />
            <div>
              <h3 className="text-[10px] vmd:text-xs vlg:text-base font-medium text-muted-foreground">
                Duration
              </h3>
              <p className="type-h5">{duration}</p>
            </div>
        </Card>
      </div>
      <Progress
                value={videoProgress}
                className="h-1.5 vsm:h-2 shrink-0 bg-muted/40"
            />
            <video
                ref={videoRef}
                src={selectedProject?.laptop?.showcase}
                loop
                muted
                playsInline
                className="h-full w-full min-h-0 min-w-0 flex-1 object-cover rounded-xl"
            />
            </div>
        </div>
    )
}
