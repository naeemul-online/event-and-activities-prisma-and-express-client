import { CategoriesSection } from "@/components/modules/Home/category-section";
import { CTASection } from "@/components/modules/Home/cta-section";
import { FeaturedEventsSection } from "@/components/modules/Home/featured-events-section";
import { FeaturesSection } from "@/components/modules/Home/features-section";
import { HeroSection } from "@/components/modules/Home/hero-section";

import { HostsSection } from "@/components/modules/Home/hosts-section";
import { HowItWorksSection } from "@/components/modules/Home/how-its-work";
import { TestimonialsSection } from "@/components/modules/Home/testimonials-section";
import { getAllEvents } from "@/services/event/eventsManagements";

import Head from "next/head";

export default async function Home() {
  const events = await getAllEvents();
  console.log(events.data);
  return (
    <>
      <Head>
        <title>
          Events & Activities | Discover Events. Meet People. Go Together.
        </title>
        <meta
          name="description"
          content="Events & Activities helps you discover local events and find like-minded people to join you. From concerts and hiking to gaming and tech meetups, never go alone again."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSection />
        <HowItWorksSection />
        <CategoriesSection />
        <FeaturedEventsSection />
        <FeaturesSection />
        <HostsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </>
  );
}
