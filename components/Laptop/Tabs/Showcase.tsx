import { useApp } from "@/contexts/AppContext";
import { useEffect, useRef } from "react";

export function ProjectShowcase() {

    const { laptopReady } = useApp()

    const videoRef = useRef<HTMLVideoElement>(null)
    useEffect(() => {
        if (laptopReady) videoRef.current?.play()
    }, [laptopReady])
    const { selectedProject } = useApp()
    return (
        <div className="w-full h-full flex items-center relative">
            <video
                ref={videoRef}
                src={selectedProject?.laptop?.showcase}
                loop
                muted
                playsInline
                className="w-full h-full"
            />
        </div>
    )
}
