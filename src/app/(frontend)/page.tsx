import { fr } from '@/content/fr'
import { SiteHeader } from '@/components/site-header'
import {
  AudiencesSection,
  DashboardSection,
  FaqSection,
  FeaturesSection,
  FinalCtaAndFooter,
  FormSection,
  HeroSection,
  HowSection,
  InputModesSection,
  PricingSection,
  ProblemStrip,
  RolesSection,
  WhatsappSection,
} from '@/components/sections/landing-sections'

const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: fr.productName,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: fr.seo.description,
  inLanguage: 'fr',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <SiteHeader />
      <main>
        <HeroSection />
        <ProblemStrip />
        <InputModesSection />
        <FeaturesSection />
        <HowSection />
        <WhatsappSection />
        <DashboardSection />
        <AudiencesSection />
        <RolesSection />
        <PricingSection />
        <FormSection />
        <FaqSection />
      </main>
      <FinalCtaAndFooter />
    </>
  )
}
