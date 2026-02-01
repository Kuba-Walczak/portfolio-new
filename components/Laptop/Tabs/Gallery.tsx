'use client'

import Image from 'next/image'
import { useApp } from '@/contexts/AppContext'
import { GalleryImage } from '@/types/project'

export function ProjectGallery() {
  const { selectedProject, selectedImage, setSelectedImage } = useApp()

  return (
    <div className="relative w-full h-full">
      <div className="grid grid-cols-3 gap-8 p-8">
        {selectedProject?.laptop?.gallery.map((image: GalleryImage) => (
          <div
            key={image.caption}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative overflow-hidden rounded-lg bg-muted h-80 w-full">
              <Image
                src={image?.src}
                alt={image?.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                <div className="w-full p-4 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-medium text-sm">{image?.caption}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative overflow-hidden p-16">
            <img
              src={selectedImage.src}
              alt={selectedImage.caption}
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}
