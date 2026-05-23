export interface ShowcaseRow {
  modelPath: string
  sketchfabId?: string
  sfTransform?: string
  sfFilter?: string
  color: string
  stripeColor: string
  label: string
  sublabel: string
  speed: number
}

export const showcaseRows: ShowcaseRow[] = [
  {
    modelPath: '/models/red-car.glb',
    sketchfabId: '8fa21fe97a6042a2a09e0b09fd546b91',
    sfTransform: 'scale(0.93)',
    sfFilter: 'contrast(1.05)',
    color: '#D5001C',
    stripeColor: '#D5001C',
    label: 'HELLROT',
    sublabel: 'Inferno Red — The Racing Color',
    speed: 1,
  },
  {
    modelPath: '/models/silver-car.glb',
    sketchfabId: '81e322dbf656444d861e53e8b402c1db',
    sfTransform: 'scale(0.88)',
    sfFilter: 'brightness(1.15) contrast(1.1) saturate(0.8)',
    color: '#8C8C8C',
    stripeColor: '#0066B1',
    label: 'SILBER',
    sublabel: 'Arctic Silver — Engineering Precision',
    speed: 0.7,
  },
  {
    modelPath: '/models/black-car.glb',
    sketchfabId: 'ab2574c2d1414062bedc6a5457443757',
    sfTransform: 'scale(0.88)',
    sfFilter: 'brightness(3) contrast(1.2)',
    color: '#555555',
    stripeColor: '#003B7A',
    label: 'SCHWARZ',
    sublabel: 'Jet Black — The Stealth Variant',
    speed: 1.3,
  },
]

export interface Variant {
  modelPath: string
  sketchfabId?: string
  label: string
  labelEn: string
  stripeColor: string
  accentColor: string
  description: string
  heightClass: string
  cameraPosition: [number, number, number]
  bgColor: string
  textColor: string
  subTextColor: string
  environmentPreset: string
}

export const variants: Variant[] = [
  {
    modelPath: '/models/red-car.glb',
    sketchfabId: '8fa21fe97a6042a2a09e0b09fd546b91',
    label: 'HELLROT',
    labelEn: 'Hellrot Red',
    stripeColor: '#0066B1',
    accentColor: '#D5001C',
    description: 'The color of competition. The same red that crossed the finish line first at Spa, Nurburgring, and every circuit that mattered.',
    heightClass: 'min-h-[90vh]',
    cameraPosition: [5, 2, 5],
    bgColor: '#0e0608',
    textColor: 'text-white',
    subTextColor: 'text-neutral-500',
    environmentPreset: 'studio'
  },
  {
    modelPath: '/models/silver-car.glb',
    sketchfabId: '81e322dbf656444d861e53e8b402c1db',
    label: 'SILBER',
    labelEn: 'Polar Silver',
    stripeColor: '#D5001C',
    accentColor: '#8C8C8C',
    description: 'Understated precision. The silver that reflected BMW\'s engineering-first philosophy — no excess, only purpose.',
    heightClass: 'min-h-[60vh]',
    cameraPosition: [-5, 2, -5],
    bgColor: '#0a0a0c',
    textColor: 'text-white',
    subTextColor: 'text-neutral-500',
    environmentPreset: 'studio'
  },
  {
    modelPath: '/models/black-car.glb',
    sketchfabId: 'ab2574c2d1414062bedc6a5457443757',
    label: 'SCHWARZ',
    labelEn: 'Jet Black',
    stripeColor: '#003B7A',
    accentColor: '#444444',
    description: 'Absolute authority. Black was the color of the night races, the test mules, and the engineers\' own machines.',
    heightClass: 'min-h-[90vh]',
    cameraPosition: [0, 1.5, 6],
    bgColor: '#050507',
    textColor: 'text-white',
    subTextColor: 'text-neutral-500',
    environmentPreset: 'night'
  },
]
