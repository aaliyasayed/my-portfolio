import { memo, lazy, Suspense } from "react";
import { Navbar } from "../components/Navbar";
import { Loader } from "../components/Loader";

import { NavigationProvider } from "../context/NavigationContext";
import { DataProvider } from "../context/DataContext";
import { useData } from "../context/DataContext";

// Create dynamic imports for lazy loading with named exports
const HeroSection = lazy(() =>
  import("../sections/Hero/Hero").then((module) => ({ default: module.Hero }))
);

const AboutSection = lazy(() =>
  import("../sections/About/About").then((module) => ({
    default: module.About,
  }))
);

const SkillsSection = lazy(() =>
  import("../sections/Skills/Skills").then((module) => ({
    default: module.Skills,
  }))
);

const ExperienceSection = lazy(() =>
  import("../sections/Experience/Experience").then((module) => ({
    default: module.Experience,
  }))
);

const EducationSection = lazy(() =>
  import("../sections/Education/Education").then((module) => ({
    default: module.Education,
  }))
);

const ContactSection = lazy(() =>
  import("../sections/Contact/Contact").then((module) => ({
    default: module.Contact,
  }))
);

// Loading component with consistent height
const LoadingFallback = () => (
  <div
    style={{
      minHeight: "50vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Loader />
  </div>
);

// Main content component separated to access the DataContext
const MainContent = memo(() => {
  const { loading } = useData();

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <EducationSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <ContactSection />
        </Suspense>
      </main>
    </>
  );
});

function App() {
  return (
    <DataProvider>
      <NavigationProvider>
        <MainContent />
      </NavigationProvider>
    </DataProvider>
  );
}

export default memo(App);
