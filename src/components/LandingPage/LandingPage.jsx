import React from 'react';
import { Hero } from './Hero';
import { FeatureShowcase } from './FeatureShowcase';
import { TargetAudience } from './TargetAudience';
import { Pricing } from './Pricing';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';
import { CTA } from './CTA';

export function LandingPage({ onGetStarted }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero onGetStarted={onGetStarted} />
      <FeatureShowcase onGetStarted={onGetStarted} />
      <TargetAudience onGetStarted={onGetStarted} />
      <Pricing onGetStarted={onGetStarted} />
      <Testimonials />
      <FAQ />
      <CTA onGetStarted={onGetStarted} />
    </div>
  );
}
