import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { useApp } from "@/contexts/AppContext";
import { X } from "lucide-react";
import { gsap } from "gsap";

export function LaptopHeader() {
    const { selectedTab, setSelectedTab } = useApp()
    return (
      <div className="w-full h-20 border-b rounded-t-4xl bg-secondary">
        <div className="w-full h-full flex gap-4 items-center px-10">
        <Button 
          variant="outline" 
          size="projectNav" 
          onClick={() => setSelectedTab('Showcase')}
          className={cn(
            selectedTab === 'Showcase' && 'bg-primary text-primary-foreground opacity-100',
            selectedTab !== 'Showcase' && 'opacity-50',
            'cursor-pointer'
          )}
        >
          Showcase
        </Button>
        <Button 
          variant="outline" 
          size="projectNav" 
          onClick={() => setSelectedTab('Details')}
          className={cn(
            selectedTab === 'Details' && 'bg-primary text-primary-foreground opacity-100',
            selectedTab !== 'Details' && 'opacity-50',
            'cursor-pointer'
          )}
        >
          Details
        </Button>
        <Button 
          variant="outline" 
          size="projectNav" 
          onClick={() => setSelectedTab('Gallery')}
          className={cn(
            selectedTab === 'Gallery' && 'bg-primary text-primary-foreground opacity-100',
            selectedTab !== 'Gallery' && 'opacity-50',
            'cursor-pointer'
          )}
        >
          Gallery
        </Button>
        <Button 
          variant="outline" 
          size="icon"
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
          }}
          className="bg-primary text-primary-foreground opacity-100 ml-auto cursor-pointer"
        >
          <X className="size-6" />
        </Button>
      </div>
                </div>
    )
}