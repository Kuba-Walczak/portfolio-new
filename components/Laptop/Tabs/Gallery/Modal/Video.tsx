import { GalleryContent } from "@/types/project";

export function Video({ content }: { content: GalleryContent }) {
    return (
        <>
        <p className="text-white text-2xl text-center rounded-t-lg border bg-secondary p-1">{content?.caption}</p>
        <div className="relative overflow-hidden border rounded-b-lg">
            <video
            src={content?.media[0]?.src}
            width={content?.media[0]?.width}
            height={content?.media[0]?.height}
            className="object-contain"
            autoPlay
            muted
            loop />
        </div>
        </>
    )
}
