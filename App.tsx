import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Works } from './pages/Works';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Store } from './pages/Store';
import { Page } from './types';

// Asset Manifest for Preloading
// Crucial: These URLs must match exactly what is used in the components to leverage browser caching.
const ASSETS = {
  video: "https://www.dropbox.com/scl/fi/8n8x2l0ehc1d7fxai8aoh/this-one-took-a-while-inspo-from-scoobafiles-tylerbaileytravel-travel-nature.mp4?rlkey=g4jizjr8vfgqih1z01c9cbeu8&st=aolhwlws&raw=1",
  images: [
    // Store - Prints
    "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80", // Nightcall
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", // Apex
    "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80", // Void
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80", // Neon Tokyo
    // Store - Merch
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80", // Hoodie
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80", // Cap
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80", // Tee
  ]
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isLoading, setIsLoading] = useState(true);

  // Robust Asset Preloading Logic
  useEffect(() => {
    const preloadAssets = async () => {
      // 1. Preload Images
      const imagePromises = ASSETS.images.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false); 
        });
      });

      // 2. Preload Video
      const videoPromise = new Promise((resolve) => {
        const video = document.createElement('video');
        
        // We wait for HAVE_ENOUGH_DATA (4) or HAVE_FUTURE_DATA (3) to ensure smoothness
        const checkReadyState = () => {
             if (video.readyState >= 3) {
                 resolve(true);
             }
        };

        video.addEventListener('canplaythrough', () => resolve(true), { once: true });
        video.addEventListener('loadeddata', checkReadyState);
        video.addEventListener('progress', checkReadyState);
        
        video.onerror = () => resolve(false);
        
        // Timeout to prevent hanging if connection is extremely slow
        setTimeout(() => resolve(false), 8000);

        video.src = ASSETS.video;
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.load(); 
      });

      // 3. Minimum Display Time
      // Increased to 3.5 seconds to cover initialization time and hide buffering
      const timerPromise = new Promise(resolve => setTimeout(resolve, 3500));

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
      case Page.STORE:
        return <Store />;
      default:
        return <Home setPage={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter animate-pulse">
                Cian<span className="text-gray-500">Cinematic</span>
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