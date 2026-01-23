'use client'

import Image from 'next/image'
import { useState } from 'react'

interface GalleryImage {
  id: number
  src: string
  alt: string
  caption: string
}

export default function ProjectGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const images: GalleryImage[] = [
    {
      id: 1,
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Homepage design',
      caption: 'Homepage redesign with improved navigation',
    },
    {
      id: 2,
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Product listing',
      caption: 'Product listing page with advanced filters',
    },
    {
      id: 3,
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Shopping cart',
      caption: 'Streamlined checkout experience',
    },
    {
      id: 4,
      src: '/placeholder.svg?height=400&width=600',
      alt: 'Mobile view',
      caption: 'Mobile-first responsive design',
    },
  ]

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold mb-8">Project Gallery</h2>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative overflow-hidden rounded-lg bg-muted h-80 w-full">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                <div className="w-full p-4 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-medium text-sm">{image.caption}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] cursor-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative h-full w-full flex flex-col">
              <div className="relative flex-1 w-full">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="bg-black/40 text-white p-4 text-center">
                <p className="font-medium">{selectedImage.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
