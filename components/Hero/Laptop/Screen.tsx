import { TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/tabs";
import { gsap } from "gsap";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Showcase } from "./Tabs/Showcase";
import { Details } from "./Tabs/Details";
import { Gallery } from "./Tabs/Gallery";

export function Screen() {
    const { selectedProject, setSelectedProject, setProjectView } = useApp()
    const [activeTab, setActiveTab] = useState("showcase")

    const handleClose = () => {
      const element = document.getElementById('projects')
      if (!element) return
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const targetPosition = elementPosition + 200
      const scrollProxy = { y: window.pageYOffset }
      gsap.to(scrollProxy, {
        y: targetPosition,
        duration: 2,
        overwrite: "auto",
        onUpdate: () => {
          window.scrollTo(0, scrollProxy.y)
        },
      })
      setTimeout(() => {
        setSelectedProject(null)
        setProjectView(false)
      }, 1500)
    }

    if (!selectedProject) return null
    return (
            <div className="w-full h-full flex flex-col rounded-t-xl vsm:rounded-t-2xl vmd:rounded-t-3xl vlg:rounded-t-4xl bg-background"> {/* inset-shadow-pseudo */}
                <div className="p-1 vsm:p-2 vmd:p-3 vlg:p-4">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (value === "close") {
              handleClose()
              setActiveTab("showcase")
              return
            }
            setActiveTab(value)
          }}
          className="w-full h-full"
        >
          <div className="flex justify-center w-full">
            <TabsList>
              <TabsTrigger value="showcase">Showcase</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="close" className="hover:text-red-500 dark:hover:text-red-400">
                Close
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="showcase"><Showcase title={selectedProject.title} date={selectedProject.laptop.startDate} duration={selectedProject.laptop.duration} /></TabsContent>
          <TabsContent value="details"><Details description={selectedProject.laptop.description} techStack={selectedProject.laptop.techStack} /></TabsContent>
          <TabsContent value="gallery"><Gallery /></TabsContent>
        </Tabs>
                </div>
        </div>
    )
}
