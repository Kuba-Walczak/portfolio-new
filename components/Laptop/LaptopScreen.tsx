import ProjectGallery from "@/components/Laptop/ProjectGallery";
import ProjectDetails from "@/components/Laptop/ProjectDetails";
import { ProjectShowcase } from "./ProjectShowcase";
import { useApp } from "@/contexts/AppContext";

export function LaptopScreen() {
    const { selectedTab } = useApp()
    return (
            <div className="w-full h-full">
                {selectedTab === 'Showcase' && <ProjectShowcase />}
                {selectedTab === 'Details' && <ProjectDetails />}
                {selectedTab === 'Gallery' && <ProjectGallery />}
        </div>
    )
}