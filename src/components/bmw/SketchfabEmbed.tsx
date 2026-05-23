import React from 'react'
import { motion } from 'framer-motion'

interface SketchfabEmbedProps {
  title: string
  sketchfabId: string
  lazyLoad?: boolean
  transform?: string
  filter?: string
  width?: string
  left?: string
  clipPath?: string
  top?: string
  height?: string
  /** 
   * Extra wrapper props if needed (e.g. for antigravity animation in RacingSection)
   */
  wrapperProps?: React.ComponentProps<typeof motion.div>
}

export function SketchfabEmbed({
  title,
  sketchfabId,
  lazyLoad = false,
  transform,
  filter,
  width = '100%',
  left = '0',
  clipPath = 'none',
  top = '0',
  height = '100%',
  wrapperProps = {},
}: SketchfabEmbedProps) {
  return (
    <motion.div className="relative w-full h-full" {...wrapperProps}>
      <iframe
        title={title}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        loading={lazyLoad ? "lazy" : "eager"}
        src={`https://sketchfab.com/models/${sketchfabId}/embed?autospin=1&autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0&ui_watermark_link=0&ui_ar=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_annotations=0&ui_stop=0&preload=1&transparent=1&dnt=1`}
        style={{
          border: 'none',
          background: 'transparent',
          position: 'absolute',
          top,
          left,
          width,
          maxWidth: 'none',
          height,
          clipPath,
          transform,
          filter,
        }}
      />
    </motion.div>
  )
}
