import React, { useState, useEffect, useRef } from 'react';
import { Reveal } from '../components/Reveal';
import { ChevronLeft, ChevronRight, ArrowUpRight, MoveRight, ArrowLeft, Play, Volume2, VolumeX } from 'lucide-react';

// --- DATA CONFIGURATION ---

interface WorkItem {
  id: number;
  title: string;
  category: string;
  client: string;
  year: string;
  video: string;
  type: 'vertical' | 'horizontal';
}

const verticalWorks: WorkItem[] = [
  { 
    id: 101, 
    title: "Drift State", 
    category: "Automotive", 
    client: "Personal",
    year: "2024",
    video: "https://www.dropbox.com/scl/fi/opah137bqtjtg4gb0kboq/drifting.mp4?rlkey=swzdq9ktnrgyw19ypehiif5qt&st=dbwsvnt5&raw=1",
    type: 'vertical'
  },
  { 
    id: 102, 
    title: "Golden Horizon", 
    category: "Travel", 
    client: "Explore",
    year: "2024",
    video: "https://www.dropbox.com/scl/fi/x9evw26r2tb2gad8xgdc3/one-of-the-best-sunsets-I-ve-ever-seen-1.mp4?rlkey=lrfx2usxs0q3enpkuu8j0yp45&st=dzu6xf1r&raw=1",
    type: 'vertical'
  },
  { 
    id: 103, 
    title: "Spring Awakening", 
    category: "Nature", 
    client: "Season",
    year: "2023",
    video: "https://www.dropbox.com/scl/fi/1z2ekv7ryjusshq00r6r9/spring-has-finally-come-around-in-Aus.mp4?rlkey=rixpg341bipzjbtbwq23pvzmq&st=vzpziorp&raw=1",
    type: 'vertical'
  },
  { 
    id: 104, 
    title: "Into the Wild", 
    category: "Lifestyle", 
    client: "Camp",
    year: "2024",
    video: "https://www.dropbox.com/scl/fi/4ikzitd8c2dyc30d6ksee/one-hell-of-a-camp-spot.mp4?rlkey=iwdbpto7b36x849v7v45ukg6e&st=do5mcpxw&raw=1",
    type: 'vertical'
  }
];

const horizontalWorks: WorkItem[] = [
  { 
    id: 201, 
    title: "Urban Flow", 
    category: "Cinematography", 
    client: "Concept",
    year: "2024",
    video: "https://www.dropbox.com/scl/fi/07gehbamxu1153uwfzu3e/home-.-horizontal.mp4?rlkey=p7lqi0wglmiwsxgy1wy64jbrq&st=g5vajvz6&raw=1",
    type: 'horizontal'
  },
  { 
    id: 202, 
    title: "Coastal Vibe", 
    category: "Travel", 
    client: "Explore",
    year: "2024",
    video: "https://www.dropbox.com/scl/fi/85hdwt3zp14t906l471rb/more-like-these-Or-the-pov-vids-horizontal.mp4?rlkey=yaqwfzz8mjo8xonmztt9lk8py&st=xufsz2at&raw=1",
    type: 'horizontal'
  },
  { 
    id: 203, 
    title: "Purple Sunset", 
    category: "Nature", 
    client: "Atmosphere",
    year: "2023",
    video: "https://www.dropbox.com/scl/fi/gvz4m0i4qt6tmhuwtszeu/purple-frames-cinematography-ocean-beach-sunset-horizontal.mp4?rlkey=okqprv70ip1yf0lonxl8i3fqy&st=wd4elu9s&raw=1",
    type: 'horizontal'
  }
];

export const Works: React.FC = () => {
  const [viewMode, setViewMode] = useState<'gallery' | 'carousel'>('gallery');
  const [activeSection, setActiveSection] = useState<'vertical' | 'horizontal'>('vertical');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Default to sound ON when fully open

  // Drag Logic Refs
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  // Scroll to top when switching to gallery
  useEffect(() => {
    if (viewMode === 'gallery') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [viewMode]);

  const handleWorkClick = (index: number, type: 'vertical' | 'horizontal') => {
    setActiveSection(type);
    setActiveIndex(index);
    setViewMode('carousel');
  };

  // Derived state for current playlist
  const currentWorks = activeSection === 'vertical' ? verticalWorks : horizontalWorks;

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < currentWorks.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === 'carousel') {
          if (e.key === 'ArrowLeft') handlePrev();
          if (e.key === 'ArrowRight') handleNext();
          if (e.key === 'Escape') setViewMode('gallery');
      }
  };

  useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, viewMode, currentWorks]);

  // --- Mouse & Touch Handlers for Swipe ---

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    dragStartX.current = clientX;
  };

  const handleMouseUp = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = dragStartX.current - clientX;
    
    if (diff > 50) {
        handleNext();
    } else if (diff < -50) {
        handlePrev();
    }
  };

  return (
    <div className="bg-orbit-black min-h-screen w-full relative">
      
      {/* --- GALLERY VIEW --- */}
      <div 
        className={`w-full transition-opacity duration-500 ease-in-out ${viewMode === 'gallery' ? 'opacity-100' : 'opacity-0 pointer-events-none fixed inset-0'}`}
      >
          <div className="pt-24 pb-20 container mx-auto px-4 md:px-6">
              
              {/* Header */}
              <Reveal width="100%">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-white">
                            Selected<br />Works
                        </h1>
                    </div>
                    <div className="hidden md:block text-gray-400 text-sm tracking-widest uppercase mb-2">
                        Scroll to explore
                    </div>
                </div>
              </Reveal>

              {/* VERTICAL SECTION */}
              <div className="mb-20">
                  <Reveal>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-[1px] bg-white/50"></div>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-white">Shorts & Reels</h3>
                    </div>
                  </Reveal>
                  
                  {/* Mobile: 2-column grid. Desktop: 4-column grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                      {verticalWorks.map((work, index) => (
                          <Reveal key={work.id} delay={index * 0.1} width="100%">
                              <div 
                                onClick={() => handleWorkClick(index, 'vertical')}
                                className="group relative cursor-pointer overflow-hidden aspect-[9/16] bg-gray-900 rounded-2xl border border-white/5"
                              >
                                  <video 
                                    src={work.video} 
                                    muted 
                                    loop 
                                    playsInline
                                    webkit-playsinline="true"
                                    autoPlay
                                    preload="auto"
                                    className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 opacity-100"
                                  />
                                  
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity duration-300">
                                      <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">{work.category}</p>
                                      <h3 className="text-sm md:text-lg font-bold text-white uppercase tracking-tight">{work.title}</h3>
                                  </div>
                                  
                                  {/* Play Icon Overlay */}
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                          <Play size={20} fill="white" className="ml-1" />
                                      </div>
                                  </div>
                              </div>
                          </Reveal>
                      ))}
                  </div>
              </div>

              {/* HORIZONTAL SECTION */}
              <div className="mb-20">
                  <Reveal>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-[1px] bg-white/50"></div>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-white">Cinematic Films</h3>
                    </div>
                  </Reveal>

                   {/* Mobile: 1-column stack. Desktop: 3-column grid */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                      {horizontalWorks.map((work, index) => (
                          <Reveal key={work.id} delay={index * 0.1} width="100%">
                              <div 
                                onClick={() => handleWorkClick(index, 'horizontal')}
                                className="group relative cursor-pointer overflow-hidden aspect-video bg-gray-900 rounded-2xl border border-white/5"
                              >
                                  <video 
                                    src={work.video} 
                                    muted 
                                    loop 
                                    playsInline
                                    webkit-playsinline="true"
                                    autoPlay
                                    preload="auto"
                                    className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105 opacity-100"
                                  />
                                  
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 transition-opacity duration-300">
                                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">{work.category}</p>
                                        <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">{work.title}</h3>
                                      </div>
                                  </div>
                              </div>
                          </Reveal>
                      ))}
                   </div>
              </div>
          </div>
      </div>


      {/* --- CAROUSEL VIEW (SMART PLAYER) --- */}
      <div 
        className={`fixed inset-0 z-50 bg-orbit-black flex flex-col justify-center overflow-hidden transition-all duration-500 ${viewMode === 'carousel' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {/* Dynamic CSS Variables based on Video Type */}
        <style>{`
            :root {
                --item-width: ${activeSection === 'vertical' ? '80vw' : '90vw'};
                --gap: 5vw;
                --offset-start: ${activeSection === 'vertical' ? '10vw' : '5vw'};
            }
            @media (min-width: 768px) {
                :root {
                    --item-width: ${activeSection === 'vertical' ? '35vw' : '65vw'};
                    --gap: 6vw;
                    --offset-start: ${activeSection === 'vertical' ? '32.5vw' : '17.5vw'};
                }
            }
        `}</style>

        {/* Mobile Scroll Indicator Overlay */}
        <div className={`md:hidden absolute right-6 top-[55%] z-40 pointer-events-none animate-pulse flex items-center gap-2 transition-opacity duration-500 ${viewMode === 'carousel' ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-xs font-bold uppercase tracking-widest text-white drop-shadow-md">Swipe</span>
            <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <MoveRight size={14} />
            </div>
        </div>

        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/40 via-black to-black z-0 pointer-events-none"></div>

        {/* Navigation / Header */}
        <div className="absolute top-0 left-0 w-full z-20 p-6 md:p-12 flex justify-between items-start pointer-events-none">
            <button 
                onClick={() => setViewMode('gallery')}
                className="group flex items-center gap-3 text-white uppercase tracking-widest text-sm font-bold hover:text-gray-300 transition-colors pointer-events-auto"
            >
                <div className="p-2 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowLeft size={20} />
                </div>
                <span className="hidden md:inline">Back to Gallery</span>
            </button>
            
            <div className="pointer-events-auto flex items-center gap-4">
                 {/* Audio Toggle */}
                <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all text-white"
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <div className="text-right">
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white opacity-80">
                        {currentWorks[activeIndex].category}
                    </h2>
                    <span className="text-white/40 text-sm font-mono tracking-widest block mt-2">
                        {String(activeIndex + 1).padStart(2, '0')} / {String(currentWorks.length).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </div>

        {/* Carousel Container */}
        <div className="relative z-10 w-full h-[70vh] md:h-[80vh] flex items-center mt-12 md:mt-0">
            
            {/* Left Arrow */}
            {activeIndex > 0 && (
            <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 md:left-12 z-30 p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 group hidden md:block"
            >
                <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            )}

            {/* Right Arrow */}
            {activeIndex < currentWorks.length - 1 && (
            <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 md:right-12 z-30 p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 group hidden md:block"
            >
                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>
            )}

            {/* Track */}
            <div 
                className="flex items-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full will-change-transform"
                style={{ 
                    transform: `translateX(calc(var(--offset-start) - (var(--item-width) + var(--gap)) * ${activeIndex}))` 
                }}
            >
                {currentWorks.map((work, index) => (
                    <div 
                        key={work.id}
                        className={`
                            relative flex-shrink-0 
                            w-[var(--item-width)]
                            ${activeSection === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'} 
                            mr-[var(--gap)]
                            transition-all duration-700 ease-out
                            ${index === activeIndex ? 'scale-100 opacity-100 grayscale-0' : 'scale-90 opacity-40 grayscale blur-[1px] cursor-pointer'}
                        `}
                        onClick={() => index !== activeIndex && setActiveIndex(index)}
                    >
                        {/* ROUNDED CORNERS */}
                        <div className="w-full h-full overflow-hidden relative shadow-2xl shadow-black bg-gray-900 border border-white/10 rounded-2xl">
                            <video 
                                src={work.video} 
                                muted={index !== activeIndex || isMuted} // Only play audio if active AND NOT muted by user
                                loop 
                                playsInline
                                webkit-playsinline="true"
                                autoPlay
                                preload="auto"
                                className="w-full h-full object-cover pointer-events-none"
                            />
                            {/* Overlay */}
                            <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${index === activeIndex ? 'opacity-0' : 'opacity-100'}`}></div>
                            
                            {/* Project Info - Only visible on active */}
                            <div className={`absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end items-start transition-opacity duration-500 ${index === activeIndex ? 'opacity-100 delay-300' : 'opacity-0'}`}>
                                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">{work.title}</h2>
                                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-300 uppercase tracking-widest">
                                    <span>{work.client}</span>
                                    <span className="w-1 h-1 bg-white rounded-full"></span>
                                    <span>{work.year}</span>
                                </div>
                                
                                <button className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-all pointer-events-auto">
                                    View Full Case <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Mobile Dots */}
        <div className="flex md:hidden justify-center px-6 items-center w-full absolute bottom-8 z-30 pointer-events-none">
            <div className="flex gap-2 pointer-events-auto">
                {currentWorks.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-gray-700'}`}
                    />
                ))}
            </div>
        </div>

      </div>

    </div>
  );
};