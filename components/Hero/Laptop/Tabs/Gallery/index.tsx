'use client'

import { useApp } from '@/contexts/AppContext'
import { GalleryContent } from '@/types/project'
import Image from 'next/image'
import { Modal } from './Modal'

export function Gallery() {
  const { selectedProject, selectedContent, setSelectedContent } = useApp()

  return (
    <div className="relative w-full h-full">
      <div className={`flex flex-col justify-center p-4 border bg-white/5 backdrop-blur-sm rounded-xl ${selectedContent ? 'hidden' : ''}`}>
        <div className="grid grid-cols-2 gap-4">
          {selectedProject?.laptop?.gallery.map((content: GalleryContent) => (
              <div key={content.caption} className="flex flex-col">
                <div className="flex items-center justify-center p-1 border rounded-t-xl">
                  <p className="font-medium text-2xl opacity-100">{content?.caption}</p>
                </div>
                <div
                  className="group cursor-pointer rounded-b-lg overflow-hidden border"
                  onClick={() => setSelectedContent(content)}
                >
                  <div className="relative overflow-hidden h-80 w-full">
                    {content.type === 'image' ? (
                      <>
                        <Image
                          src={content?.media[0]?.src}
                          alt={content?.caption}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </>
                    ) : content.type === 'video' ? (
                      <>
                        <video
                          src={content?.media[0]?.src}
                          width={content?.media[0]?.width}
                          height={content?.media[0]?.height}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </>
                    ) : content.type === 'before-after' ? (
                      <>
                        <div className="absolute inset-0 overflow-hidden h-80 w-full [clip-path:inset(0_50%_0_0)]">
                          <video
                            src={content?.media[0]?.src}
                            width={content?.media[0]?.width}
                            height={content?.media[0]?.height}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute inset-0 overflow-hidden h-80 w-full [clip-path:inset(0_0_0_50%)]">
                          <video
                            src={content?.media[1]?.src}
                            width={content?.media[1]?.width}
                            height={content?.media[1]?.height}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="absolute inset-0 flex items-end justify-center w-full p-4 bg-gradient-to-b from-black/50 to-wh text-white opacity-100 group-hover:opacity-0 transition-opacity duration-300"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedContent && 
          <div className="flex flex-col justify-center p-4 border bg-white/5 backdrop-blur-sm rounded-xl">
            <Modal />
          </div>}
    </div>
  )
}
