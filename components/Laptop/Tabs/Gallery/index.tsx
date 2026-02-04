'use client'

import { useApp } from '@/contexts/AppContext'
import { GalleryContent } from '@/types/project'
import Image from 'next/image'
import { Modal } from './Modal'

export function ProjectGallery() {
  const { selectedProject, selectedImage, setSelectedImage } = useApp()

  return (
    <div className="relative w-full h-full">
      <div className="grid grid-cols-2 gap-4 p-4">
        {selectedProject?.laptop?.gallery.map((content: GalleryContent) => (
          content.type === 'image' ? (
          <div
            key={content.caption}
            className="group cursor-pointer rounded-lg overflow-hidden border"
            onClick={() => setSelectedImage(content)}
          >
            <div className="relative overflow-hidden h-80 w-full">
            <Image
                src={content?.media[0]?.src}
                alt={content?.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-end justify-center w-full p-4 bg-gradient-to-t from-black/50 to-wh text-white opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="font-medium text-lg">{content?.caption}</p>
              </div>
            </div>
          </div>
        ) : content.type === 'video' ? (
          <div
            key={content.caption}
            className="group cursor-pointer rounded-lg overflow-hidden border"
            onClick={() => setSelectedImage(content)}
          >
            <div className="relative overflow-hidden h-80 w-full">
            <video
                src={content?.media[0]?.src}
                width={content?.media[0]?.width}
                height={content?.media[0]?.height}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-end justify-center w-full p-4 bg-gradient-to-t from-black/50 to-wh text-white opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="font-medium text-lg">{content?.caption}</p>
              </div>
            </div>
          </div>
        ) : content.type === 'before-after' ? (
          <div
            key={content.caption}
            className="relative group cursor-pointer border rounded-lg"
            onClick={() => setSelectedImage(content)}
          >
            <div className="relative h-80">
            <div className="absolute inset-0 overflow-hidden h-80 w-full [clip-path:inset(0_50%_0_0)] rounded-lg">
            <video
                src={content?.media[0]?.src}
                width={content?.media[0]?.width}
                height={content?.media[0]?.height}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />

            </div>
            <div className="absolute inset-0 overflow-hidden h-80 w-full [clip-path:inset(0_0_0_50%)] rounded-lg">
            <video
                src={content?.media[1]?.src}
                width={content?.media[1]?.width}
                height={content?.media[1]?.height}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 flex items-end justify-center w-full p-4 bg-gradient-to-t from-black/50 to-wh text-white opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="font-medium text-lg">{content?.caption}</p>
              </div>
            </div>
          </div>
        ) : null))}
      </div>
      {selectedImage && <Modal />}
    </div>
  )
}
