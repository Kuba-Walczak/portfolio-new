import { useApp } from "@/contexts/AppContext";
import { Video } from "./Video";
import { Image } from "./Image";
import { BeforeAfter } from "./BeforeAfter";

export function Modal() {
    const { selectedImage, setSelectedImage } = useApp()
    return (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative overflow-hidden p-8">
            {selectedImage?.type === 'image' ? <Image content={selectedImage!} /> : selectedImage?.type === 'video' ? <Video content={selectedImage!} /> : selectedImage?.type === 'before-after' ? <BeforeAfter content={selectedImage!} /> : null}
          </div>
        </div>
    )
}
