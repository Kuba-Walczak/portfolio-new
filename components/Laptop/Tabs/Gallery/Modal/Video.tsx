import { GalleryContent } from "@/types/project";

export function Video({ content }: { content: GalleryContent }) {
    return (
        <>
        <p className="text-white text-2xl text-center mb-2">{content?.caption}</p>
        <div className="relative overflow-hidden border rounded-lg">
            <video
            src={content?.media[0]?.src}
            width={content?.media[0]?.width}
            height={content?.media[0]?.height}
            className="object-contain rounded-lg"
            autoPlay
            muted
            loop />
        </div>
        </>
    )
}
