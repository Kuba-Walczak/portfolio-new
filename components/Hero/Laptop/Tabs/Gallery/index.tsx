'use client'

import { useApp } from '@/contexts/AppContext'
import { GalleryContent } from '@/types/project'
import Image from 'next/image'
import { Modal } from './Modal'

export function Gallery() {
  const { selectedProject, selectedContent, setSelectedContent } = useApp()

  return (
    <div className="relative w-full h-full">
      <div className={`flex flex-col justify-center ${selectedContent ? 'hidden' : ''}`}>
        <div className="grid grid-cols-2 gap-2 vsm:gap-3 vmd:gap-4 vlg:gap-4 vxl:gap-5 v2xl:gap-6">
          {selectedProject?.laptop?.gallery.map((content: GalleryContent) => (
              <div key={content.caption} className="flex flex-col">
                <div className="flex items-center justify-center border bg-white/3 backdrop-blur-sm p-1 vsm:p-1.5 vmd:p-2 vlg:p-3 rounded-t-lg vsm:rounded-t-xl">
                  <p className="font-medium text-xs vsm:text-sm vmd:text-base vlg:text-2xl vxl:text-3xl v2xl:text-4xl opacity-100 text-center leading-tight">
                    {content?.caption}
                  </p>
                </div>
                <div
                  className="group cursor-pointer overflow-hidden rounded-b-lg border"
                  onClick={() => setSelectedContent(content)}
                >
                  <div className="relative h-20 w-full overflow-hidden vsm:h-40 vmd:h-60 vlg:h-80 vxl:h-100 v2xl:h-120">
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
                        <div className="absolute inset-0 h-full w-full overflow-hidden [clip-path:inset(0_50%_0_0)]">
                          <video
                            src={content?.media[0]?.src}
                            width={content?.media[0]?.width}
                            height={content?.media[0]?.height}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 h-full w-full overflow-hidden [clip-path:inset(0_0_0_50%)]">
                          <video
                            src={content?.media[1]?.src}
                            width={content?.media[1]?.width}
                            height={content?.media[1]?.height}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </>
                    ) : null}
                    <div className="absolute inset-0 flex w-full items-end justify-center bg-gradient-to-b from-black/50 to-transparent p-2 text-white opacity-100 transition-opacity duration-300 vsm:p-3 vmd:p-4 group-hover:opacity-0"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedContent && 
          <div className="flex flex-col justify-center">
            <Modal />
          </div>}
    </div>
  )
}
