import { Card } from "../ui/card";
import { useApp } from "@/contexts/AppContext";

export function ProjectShowcase() {
    const { selectedProject } = useApp()
    return (
        <div className="w-full h-full flex flex-col items-center relative">
            <video
                src="https://PortfolioPullZone.b-cdn.net/LandingPage/Reel/ChasmsCall2.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full"
            />
        </div>
    )
}