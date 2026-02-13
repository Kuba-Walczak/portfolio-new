import { TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { useApp } from "@/contexts/AppContext";
import { Showcase } from "./Tabs/Showcase";
import { Details } from "./Tabs/Details";
import { Gallery } from "./Tabs/Gallery";

export function Screen() {
    const { selectedProject, setSelectedProject, setProjectView } = useApp()
    if (!selectedProject) return null
    return (
            <div className="w-full h-full flex flex-col bg-gradient-to-t from-blue-900/25 via-black to-blue-900/25 rounded-t-4xl"> {/* inset-shadow-pseudo */}
                <div className="p-4">
        <Tabs defaultValue="showcase" className="w-full h-full">
          <div className="flex items-center justify-between w-full">
            <TabsList>
              <TabsTrigger value="showcase">Showcase</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            <Card
              className="flex flex-row items-center justify-center m-4 transition-colors rounded-full h-16 aspect-square"
              onClick={() =>{
                const scrollProxy = { y: window.pageYOffset }
                  gsap.to(scrollProxy, {
                    y: 1000,
                    duration: 1.5,
                    overwrite: "auto",
                    onUpdate: () => {
                      window.scrollTo(0, scrollProxy.y)
                    },
                  })
                  setTimeout(() => {
                    setSelectedProject(null)
                    setProjectView(false)
                  }, 1000)
              }}
            >
              <X className="h-10 w-10 text-foreground opacity-60 transition-colors hover:opacity-100 cursor-pointer" />
            </Card>
          </div>
          <TabsContent value="showcase"><Showcase title={selectedProject.title} date={selectedProject.laptop.startDate} duration={selectedProject.laptop.duration} /></TabsContent>
          <TabsContent value="details"><Details description={selectedProject.laptop.description} techStack={selectedProject.laptop.techStack} /></TabsContent>
          <TabsContent value="gallery"><Gallery /></TabsContent>
        </Tabs>
                </div>
        </div>
    )
}
