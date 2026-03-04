import { CategoriesSection } from "@/components/modules/landing/categories-section";
import { CTASection } from "@/components/modules/landing/cta-section";
import { FeaturedEventsSection } from "@/components/modules/landing/featured-events-section";
import { FeaturesSection } from "@/components/modules/landing/features-section";
import { Footer } from "@/components/modules/landing/footer";
import { HeroSection } from "@/components/modules/landing/hero-section";
import { HostsSection } from "@/components/modules/landing/hosts-section";
import { HowItWorksSection } from "@/components/modules/landing/how-it-works-section";
import { Navbar } from "@/components/modules/landing/navbar";
import { TestimonialsSection } from "@/components/modules/landing/testimonials-section";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getCookie } from "@/services/auth/tokenHandlers";
import { getAllEvents } from "@/services/event/eventsManagements";

import Head from "next/head";

export default async function Home() {
  const events = await getAllEvents();

  const userInfo = (await getUserInfo()) || null;

  const accessToken = await getCookie("accessToken");

  const dashboardRoute = userInfo
    ? getDefaultDashboardRoute(userInfo.role)
    : "/";

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

      {/* <PublicNavbar /> */}
      <Navbar
        initialHasToken={!!accessToken}
        initialUserInfo={userInfo}
        initialDashboardRoute={dashboardRoute}
      />

      <main>
        <HeroSection userInfo={userInfo || null} />
        <HowItWorksSection />
        <CategoriesSection />
        <FeaturedEventsSection events={events.data || []} />
        <FeaturesSection />
        <HostsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
