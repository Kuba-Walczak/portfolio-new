import { ProjectDetails } from "./Tabs/Details"
import { useApp } from "@/contexts/AppContext"
import { ProjectShowcase } from "./Tabs/Showcase"
import { ProjectGallery } from "./Tabs/Gallery"

export function LaptopContent() {
    const { selectedTab, selectedProject } = useApp()
    if (!selectedProject) return null
    return (
        <div className="w-full h-full">
            {selectedTab === 'Showcase' && <ProjectShowcase />}
            {selectedTab === 'Details' && <ProjectDetails
                startDate={selectedProject.laptop.startDate}
                duration={selectedProject.laptop.duration}
                description={selectedProject.laptop.description}
                techStack={selectedProject.laptop.techStack || []}
            />}
            {selectedTab === 'Gallery' && <ProjectGallery />}
        </div>
    )
}
