import { useApp } from "@/contexts/AppContext";

export function ProjectShowcase() {
    const { selectedProject } = useApp()
    return (
        <div className="w-full h-full flex items-center relative">
            <video
                src={selectedProject?.laptop?.showcase}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full"
            />
        </div>
    )
}
