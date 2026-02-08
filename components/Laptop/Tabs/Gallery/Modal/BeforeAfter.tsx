import { GalleryContent } from "@/types/project";

export function BeforeAfter({ content }: { content: GalleryContent }) {
    return (
        <>
        <p className="text-white text-2xl text-center rounded-t-lg border bg-secondary p-1">{content?.caption}</p>
        <div className="flex border rounded-b-lg">
        <div className="relative overflow-hidden rounded-bl-lg">
            <video
            src={content?.media[0]?.src}
            width={content?.media[0]?.width}
            height={content?.media[0]?.height}
            className="object-contain"
            autoPlay
            muted
            loop />
        </div>
        <div className="relative overflow-hidden rounded-br-lg">
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
