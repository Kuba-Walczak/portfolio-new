'use client'

import { useApp } from '@/contexts/AppContext'
import { GalleryContent } from '@/types/project'
import Image from 'next/image'
import { Modal } from './Modal'

export function ProjectGallery() {
  const { selectedProject, selectedImage, setSelectedImage } = useApp()

  return (
    <div className="relative w-full h-full">
      <div className="grid grid-cols-3 gap-8 p-8">
        {selectedProject?.laptop?.gallery.map((content: GalleryContent) => (
          content.type === 'image' ? (
          <div
            key={content.caption}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(content)}
          >
            <div className="relative overflow-hidden rounded-lg h-80 w-full">
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
        ) : (
          <div
            key={content.caption}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(content)}
          >
            <div className="relative overflow-hidden rounded-lg h-80 w-full">
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
        )))}
      </div>
      {selectedImage && <Modal />}
    </div>
  )
}
