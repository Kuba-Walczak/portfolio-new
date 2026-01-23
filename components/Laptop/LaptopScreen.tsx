import ProjectGallery from "@/components/Laptop/ProjectGallery";
import { ProjectDetails } from "@/components/Laptop/ProjectDetails";
import { ProjectShowcase } from "./ProjectShowcase";
import { useApp } from "@/contexts/AppContext";

export function LaptopScreen() {
    const { selectedTab, selectedProject } = useApp()
    return (
            <div className="w-full h-full bg-muted/20 rounded-t-4xl inset-shadow-pseudo">
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