import { useApp } from "@/contexts/AppContext";
import { Video } from "./Video";
import { Image } from "./Image";
import { BeforeAfter } from "./BeforeAfter";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

export function Modal() {
    const { selectedContent, setSelectedContent } = useApp()
    return (
        <div 
          className="flex flex-col justify-center"
          onClick={() => setSelectedContent(null)}
        >
          <div className="relative flex items-center justify-end border bg-white/3 backdrop-blur-sm p-1 vsm:p-2 vmd:p-3 rounded-t-lg vsm:rounded-t-xl">
            <p className="absolute left-1/2 -translate-x-1/2 text-center text-sm text-white vsm:text-lg vmd:text-xl vlg:text-2xl vxl:text-3xl v2xl:text-4xl">
              {selectedContent?.caption}
            </p>
            <Card className="flex items-center justify-center rounded-lg border px-4 py-0.5 backdrop-blur-none transition-colors vsm:px-8 vsm:py-1 vmd:px-10 vlg:px-12 hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 vsm:h-6 vsm:w-6 vmd:h-7 vmd:w-7 vlg:h-8 vlg:w-8" />
            </Card>
          </div>
          <div className="relative overflow-hidden max-w-full max-h-full">
            {selectedContent?.type === 'image' ? <Image content={selectedContent!} /> : selectedContent?.type === 'video' ? <Video content={selectedContent!} /> : selectedContent?.type === 'before-after' ? <BeforeAfter content={selectedContent!} /> : null}
          </div>
        </div>
    )
}
