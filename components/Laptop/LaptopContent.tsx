import { ProjectDetails } from "./ProjectDetails"
import { useApp } from "@/contexts/AppContext"
import { ProjectShowcase } from "./ProjectShowcase"
import { ProjectGallery } from "./ProjectGallery"

export function LaptopContent() {
    const { selectedTab, selectedProject } = useApp()
    return (
            <div className="w-full h-full">
                {selectedTab === 'Showcase' && <ProjectShowcase />}
                {selectedTab === 'Details' && <ProjectDetails
            startDate={selectedProject.startDate}
            duration={selectedProject.duration}
            description={selectedProject.description.long}
            techStack={selectedProject.techStack}
      />}
                {selectedTab === 'Gallery' && <ProjectGallery />}
        </div>
    )
}