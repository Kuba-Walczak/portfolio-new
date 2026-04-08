export interface Tag {
    id: string;
    style: string;
    title: string;
}

export const Tag = {
    PROGRAMMING: {
        id: "1",
        style: "programming",
        title: "Programming"
    },
    TECHNICAL_ART: {
        id: "2",
        style: "technicalArt",
        title: "TA"
    },
    ART: {
        id: "3",
        style: "art",
        title: "3D"
    },
    CONTEST: {
        id: "4",
        style: "contest",
        title: "Contest"
    }
} as const satisfies Record<string, Tag>;

export function getTag(key: string): Tag {
    return Tag[key as keyof typeof Tag];
}
