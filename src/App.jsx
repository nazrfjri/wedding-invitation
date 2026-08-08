import { useState, useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { AudioProvider } from './contexts/AudioContext';
import AudioPlayer from './components/ui/AudioPlayer';
import Cover from './features/cover/Cover';
import Hero from './features/hero/Hero';

const Countdown = lazy(() => import('./features/countdown/Countdown'));
const LoveStory = lazy(() => import('./features/love-story/LoveStory'));
const EventLocation = lazy(() => import('./features/event/EventLocation'));
const Gallery = lazy(() => import('./features/gallery/Gallery'));
const Gift = lazy(() => import('./features/gift/Gift'));
const Rsvp = lazy(() => import('./features/rsvp/Rsvp'));
const Closing = lazy(() => import('./features/closing/Closing'));
const Wishes = lazy(() => import('./features/wishes/Wishes'));

const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-background">
    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin opacity-50" />
  </div>
);

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });
    
    setLenis(lenisInstance);
    lenisInstance.stop(); 

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenisInstance.destroy();
  }, []);

  useEffect(() => {
    if (isOpened && lenis) {
      setTimeout(() => lenis.start(), 1000); 
    }
  }, [isOpened, lenis]);

  return (
    <AudioProvider>
      <main className="max-w-md mx-auto w-full min-h-[100dvh] bg-background relative shadow-2xl overflow-x-hidden">
        
        <Cover isOpened={isOpened} onOpen={() => setIsOpened(true)} />
        
        {isOpened && (
          <div className="relative w-full bg-background">
            <AudioPlayer />
            <Hero />            
            <Suspense fallback={<SectionLoader />}>
              <Countdown />
              <LoveStory />
              <EventLocation />
              <Gallery />
              <Rsvp />
              <Gift />
              <Wishes />
              <Closing />
            </Suspense>
          </div>
        )}
      </main>
    </AudioProvider>
  );
}

export default App;