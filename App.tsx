import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Works } from './pages/Works';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Page } from './types';

// Asset Manifest for Preloading
const ASSETS = {
  video: "https://www.dropbox.com/scl/fi/tz20d2xwyzl770wkhehkx/IMG_0669-2.mp4?rlkey=wptpf6cnzoz5vbjvzkfh2si8t&st=r71hja1x&raw=1",
  images: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
  ]
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isLoading, setIsLoading] = useState(true);

  // Robust Asset Preloading Logic
  useEffect(() => {
    const preloadAssets = async () => {
      const startTime = Date.now();

      // 1. Preload Images
      const imagePromises = ASSETS.images.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false); // Resolve even on error to avoid blocking
        });
      });

      // 2. Preload Video (The critical part)
      const videoPromise = new Promise((resolve) => {
        const video = document.createElement('video');
        video.oncanplaythrough = () => resolve(true);
        video.onloadeddata = () => resolve(true); // Fallback if canplaythrough doesn't fire fast enough
        video.onerror = () => resolve(false);
        
        // Safety timeout for video (e.g., if connection is very slow, don't wait forever)
        // We give it a generous 8 seconds to buffer enough data
        setTimeout(() => resolve(false), 8000);

        video.src = ASSETS.video;
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.load(); // Force browser to start fetching
      });

      // 3. Minimum Display Time (2.5 seconds)
      // This ensures the branding animation is seen even if assets load instantly
      const timerPromise = new Promise(resolve => setTimeout(resolve, 2500));

      // Wait for everything
      try {
        await Promise.all([...imagePromises, videoPromise, timerPromise]);
      } catch (err) {
        console.warn("Some assets failed to preload", err);
      } finally {
        setIsLoading(false);
      }
    };

    preloadAssets();
  }, []);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home setPage={setCurrentPage} />;
      case Page.WORKS:
        return <Works />;
      case Page.ABOUT:
        return <About />;
      case Page.CONTACT:
        return <Contact />;
      default:
        return <Home setPage={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter animate-pulse">
                Orbit<span className="text-gray-500">Visuals</span>
            </h1>
            <div className="mt-4 w-48 h-[2px] bg-gray-800 mx-auto overflow-hidden">
                <div className="h-full bg-white animate-[loading_1.5s_ease-in-out_infinite]"></div>
            </div>
            <p className="text-xs text-gray-600 uppercase tracking-widest mt-4 animate-pulse">Initializing Experience</p>
        </div>
        <style>{`
            @keyframes loading {
                0% { width: 0%; transform: translateX(-100%); }
                50% { width: 100%; transform: translateX(0); }
                100% { width: 0%; transform: translateX(100%); }
            }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orbit-black text-white selection:bg-white selection:text-black font-sans">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      
      <main className="transition-opacity duration-500 ease-in-out">
        {renderPage()}
      </main>

      <Footer setPage={setCurrentPage} />
    </div>
  );
}

export default App;