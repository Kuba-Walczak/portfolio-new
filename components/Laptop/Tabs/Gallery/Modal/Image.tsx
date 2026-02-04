import { GalleryContent } from "@/types/project";
import NextImage from 'next/image'

export function Image({ content }: { content: GalleryContent }) {
    return (
      <>
        <p className="text-white text-2xl text-center mb-2">{content?.caption}</p>
        <div className="relative overflow-hidden border rounded-lg">
          <NextImage
            src={content?.media[0]?.src}
            alt={content?.caption}
            width={content?.media[0]?.width}
            height={content?.media[0]?.height}
            className="object-contain rounded-lg"
          />
        </div>
      </>
    )
}
