import { GalleryContent } from "@/types/project";

export function BeforeAfter({ content }: { content: GalleryContent }) {
    return (
        <>
        <p className="text-white text-2xl text-center mb-2">{content?.caption}</p>
        <div className="flex border rounded-lg">
        <div className="relative overflow-hidden rounded-l-lg">
            <video
            src={content?.media[0]?.src}
            width={content?.media[0]?.width}
            height={content?.media[0]?.height}
            className="object-contain"
            autoPlay
            muted
            loop />
        </div>
        <div className="relative overflow-hidden rounded-r-lg">
            <video
            src={content?.media[1]?.src}
            width={content?.media[1]?.width}
            height={content?.media[1]?.height}
            className="object-contain"
            autoPlay
            muted
            loop />
        </div>
        </div>
        </>
    )
}
