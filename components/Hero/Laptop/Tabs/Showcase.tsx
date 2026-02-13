import { useApp } from "@/contexts/AppContext";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { FileText, Calendar, Clock, Play, Pause } from "lucide-react";

interface ShowcaseProps {
    title: string
    date: string
    duration: string
}

export function Showcase({ title, date, duration }: ShowcaseProps) {

    const { laptopReady } = useApp()

    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    
    useEffect(() => {
        if (laptopReady) {
            videoRef.current?.play()
            setIsPlaying(true)
        }
    }, [laptopReady])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)

        video.addEventListener('play', handlePlay)
        video.addEventListener('pause', handlePause)

        return () => {
            video.removeEventListener('play', handlePlay)
            video.removeEventListener('pause', handlePause)
        }
    }, [])

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
        }
    }
    const { selectedProject } = useApp()
    return (
        <div className="w-full h-full flex">
            <div className="flex flex-col justify-center gap-4 p-4 border bg-white/5 backdrop-blur-sm rounded-xl">
            <video
                ref={videoRef}
                src={selectedProject?.laptop?.showcase}
                loop
                muted
                playsInline
                className="border rounded-xl"
            />
            <div className="flex gap-4">
            <Card className="flex flex-row items-center justify-center gap-4 p-4 bg-transparent backdrop-blur-none">
            <FileText className="h-12 w-12 text-foreground" />
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">
                Title
              </h3>
              <p className="text-3xl font-medium">{title}</p>
            </div>
        </Card>
        <Card className="flex flex-row items-center justify-center gap-4 p-4 bg-transparent backdrop-blur-none">
            <Calendar className="h-12 w-12 text-foreground" />
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">
                Date
              </h3>
              <p className="text-3xl font-medium">{date}</p>
            </div>
        </Card>
        <Card className="flex flex-row items-center justify-center gap-4 p-4 bg-transparent backdrop-blur-none">
            <Clock className="h-12 w-12 text-foreground" />
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">
                Duration
              </h3>
              <p className="text-3xl font-medium">{duration}</p>
            </div>
        </Card>
        <Card 
          className="flex flex-1 flex-row items-center justify-center p-6 backdrop-blur-none cursor-pointer hover:bg-white/10 transition-colors"
          onClick={togglePlayPause}
        >
            {isPlaying ? (
                <Pause className="h-12 w-12 text-foreground" />
              ) : (
                <Play className="h-12 w-12 text-foreground" />
              )}
        </Card>
      </div>
            </div>
        </div>
    )
}
