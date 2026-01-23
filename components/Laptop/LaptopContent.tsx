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
            title={selectedProject.title}
            date={selectedProject.title}
            duration={selectedProject.title}
        description={selectedProject.description.long}
        technologies={selectedProject.techStack}
      />}
                {selectedTab === 'Gallery' && <ProjectGallery />}
        </div>
    )
}