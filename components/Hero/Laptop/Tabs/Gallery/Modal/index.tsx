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
          <div className="relative flex items-center justify-end p-2 border rounded-t-xl">
            <p className="absolute left-1/2 -translate-x-1/2 text-white text-3xl text-center">{selectedContent?.caption}</p>
            <Card className="flex items-center justify-center backdrop-blur-none px-12 py-1 border rounded-lg hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-8 h-8" />
            </Card>
          </div>
          <div className="relative overflow-hidden max-w-full max-h-full">
            {selectedContent?.type === 'image' ? <Image content={selectedContent!} /> : selectedContent?.type === 'video' ? <Video content={selectedContent!} /> : selectedContent?.type === 'before-after' ? <BeforeAfter content={selectedContent!} /> : null}
          </div>
        </div>
    )
}
