'use client'

import { lazy, Suspense } from 'react'
import LoadingSpinner from '@/components/bmw/LoadingSpinner'
import Navbar from '@/components/bmw/Navbar'
import PageLoader from '@/components/bmw/PageLoader'
import CustomCursor from '@/components/bmw/CustomCursor'

// Lazy load all sections for better performance
const HeroSection = lazy(() => import('@/components/bmw/HeroSection'))
const CarShowcase = lazy(() => import('@/components/bmw/CarShowcase'))
const StorySection = lazy(() => import('@/components/bmw/StorySection'))
const DetailGrid = lazy(() => import('@/components/bmw/DetailGrid'))
const TimelineSection = lazy(() => import('@/components/bmw/TimelineSection'))
const VariantShowcase = lazy(() => import('@/components/bmw/VariantShowcase'))
const RacingSection = lazy(() => import('@/components/bmw/RacingSection'))
const QuoteSection = lazy(() => import('@/components/bmw/QuoteSection'))
const FooterSection = lazy(() => import('@/components/bmw/FooterSection'))

function SectionLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] bg-[#080808]">
      <LoadingSpinner />
    </div>
  )
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-[#080808]">
      <CustomCursor />
      <PageLoader />
      <Navbar />

      <Suspense fallback={<SectionLoader />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <CarShowcase />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <StorySection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <DetailGrid />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <TimelineSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <VariantShowcase />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <RacingSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <QuoteSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <FooterSection />
      </Suspense>
    </main>
  )
}
