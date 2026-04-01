import { TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/tabs";
import { gsap } from "gsap";
import { Dispatch, SetStateAction, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Showcase } from "./Tabs/Showcase";
import { Details } from "./Tabs/Details";
import { Gallery } from "./Tabs/Gallery";

type ScreenProps = {
  setIsScreenMounted: Dispatch<SetStateAction<boolean>>;
  setIsScreenVisible: Dispatch<SetStateAction<boolean>>;
  setIsScreenFadingOut: Dispatch<SetStateAction<boolean>>;
};

export function Screen({ setIsScreenMounted, setIsScreenVisible, setIsScreenFadingOut }: ScreenProps) {
    const { selectedProject, setSelectedProject, setProjectView } = useApp()
    const [activeTab, setActiveTab] = useState("showcase")
    const [tabFadeKey, setTabFadeKey] = useState(0)
    const [isClosing, setIsClosing] = useState(false)

    const handleClose = () => {
      setIsClosing(true)
      setIsScreenFadingOut(true)
      setIsScreenVisible(false)
      setTimeout(() => {
        setIsScreenMounted(false)
        setIsScreenFadingOut(false)
        setIsClosing(false)
      }, 220)

      setTimeout(() => {
        setActiveTab("showcase")
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
      }, 220)
    }

    if (!selectedProject) return null
    const withOpacity50 = (color: string) => `color-mix(in srgb, ${color} 100%, transparent)`
    const rawColorBase = selectedProject.laptop.colors[0] ?? '#000000'
    const colorBase = withOpacity50(rawColorBase)
    const colorAccent = withOpacity50(selectedProject.laptop.colors[1] ?? rawColorBase)
    return (
            <div
              className={`w-full h-full flex flex-col rounded-t-xl vsm:rounded-t-2xl vmd:rounded-t-3xl vlg:rounded-t-4xl ${isClosing ? 'animate-glyph-fade-out' : ''}`}
            >
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (value === "close") {
              handleClose()
              return
            }
            setActiveTab(value)
            setTabFadeKey((prev) => prev + 1)
          }}
          className="w-full h-full"
        >
          <div className="flex justify-center w-full bg-[#151520] rounded-t-xl vsm:rounded-t-2xl vmd:rounded-t-3xl vlg:rounded-t-4xl">
            <TabsList className="!h-8 vsm:!h-10 vmd:!h-[3.25rem] vlg:!h-[3.75rem] !p-0.5 vsm:!p-1 vmd:!p-1.5 vlg:!p-2">
              <TabsTrigger value="showcase" className="text-sm vsm:text-lg vmd:text-2xl vlg:text-3xl !py-0.5 ![font-family:var(--font-manrope)]">Preview</TabsTrigger>
              <TabsTrigger value="details" className="text-sm vsm:text-lg vmd:text-2xl vlg:text-3xl !py-0.5 ![font-family:var(--font-manrope)]">Details</TabsTrigger>
              <TabsTrigger value="gallery" className="text-sm vsm:text-lg vmd:text-2xl vlg:text-3xl !py-0.5 ![font-family:var(--font-manrope)]">Gallery</TabsTrigger>
              <TabsTrigger value="close" className="text-sm vsm:text-lg vmd:text-2xl vlg:text-3xl !py-0.5 ![font-family:var(--font-manrope)] hover:text-red-500 dark:hover:text-red-400">
                Close
              </TabsTrigger>
            </TabsList>
          </div>
          <div
          className="p-1 vsm:p-2 vmd:p-3 vlg:p-4 h-full"
          style={{
            backgroundColor: selectedProject.laptop.colors[0],
            backgroundImage: `radial-gradient(circle at top left, ${selectedProject.laptop.colors[1]} 0%, transparent 100%)`,
            boxShadow:
              "inset 2px 0 5px -2px rgba(0,0,0,1), inset -2px 0 5px -2px rgba(0,0,0,1), inset 0 -2px 5px -2px rgba(0,0,0,1)",
          }}>
          <TabsContent value="showcase"><div key={`showcase-${tabFadeKey}`} className="animate-glyph-fade"><Showcase title={selectedProject.title} date={selectedProject.laptop.startDate} duration={selectedProject.laptop.duration} /></div></TabsContent>
            <TabsContent value="details"><div key={`details-${tabFadeKey}`} className="animate-glyph-fade"><Details description={selectedProject.laptop.description} techStack={selectedProject.laptop.techStack} /></div></TabsContent>
            <TabsContent value="gallery"><div className={activeTab === "gallery" ? "animate-glyph-fade" : ""}><Gallery /></div></TabsContent>
          </div>
        </Tabs>
                </div>
    )
}
