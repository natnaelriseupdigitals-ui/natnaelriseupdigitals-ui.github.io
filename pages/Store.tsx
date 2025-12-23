import React from 'react';
import { Reveal } from '../components/Reveal';
import { ShoppingBag } from 'lucide-react';

const prints = [
  {
    id: 1,
    name: "Nightcall",
    category: "Limited Edition Print",
    price: "$145.00",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
    size: "24x36"
  },
  {
    id: 2,
    name: "Apex",
    category: "Fine Art Print",
    price: "$150.00",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    size: "24x36"
  },
  {
    id: 3,
    name: "Void",
    category: "Limited Edition Print",
    price: "$135.00",
    image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80",
    size: "18x24"
  },
  {
    id: 4,
    name: "Neon Tokyo",
    category: "Fine Art Print",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    size: "18x24"
  }
];

const merch = [
  {
    id: 5,
    name: "Stealth Hoodie",
    category: "Apparel",
    price: "$95.00",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Director's Cap",
    category: "Accessories",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Oversized Tee",
    category: "Apparel",
    price: "$55.00",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  }
];

export const Store: React.FC = () => {
  return (
    <div className="bg-orbit-black min-h-screen w-full">
        {/* Header */}
        <div className="pt-32 pb-20 container mx-auto px-6">
             <Reveal>
                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-white">
                    The<br />Collection.
                </h1>
             </Reveal>
             <Reveal delay={0.2}>
                <p className="text-xl text-gray-400 max-w-xl font-light">
                    Professional grade prints and exclusive merchandise. Designed for creators.
                </p>
             </Reveal>
        </div>

        {/* Section: Prints */}
        <div className="container mx-auto px-6 mb-32">
            <Reveal>
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-8 h-[1px] bg-white/50"></div>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-white">Fine Art Prints</h3>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {prints.map((product, index) => (
                    <Reveal key={product.id} delay={index * 0.1}>
                        <div className="group cursor-pointer">
                            <div className="relative overflow-hidden aspect-[4/5] bg-gray-900 mb-6 rounded-2xl border border-white/5">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                                
                                <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    Add to Cart
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1 group-hover:text-gray-300 transition-colors">{product.name}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">{product.category} • {product.size}</p>
                                </div>
                                <span className="text-white font-mono">{product.price}</span>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>

        {/* Section: Merch */}
        <div className="container mx-auto px-6 mb-32">
             <Reveal>
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-8 h-[1px] bg-white/50"></div>
                    <h3 className="text-xl font-bold uppercase tracking-widest text-white">Apparel & Gear</h3>
                </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {merch.map((product, index) => (
                    <Reveal key={product.id} delay={index * 0.1}>
                         <div className="group cursor-pointer">
                            <div className="relative overflow-hidden aspect-[4/5] bg-gray-900 mb-6 rounded-2xl border border-white/5">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale" 
                                />
                                 <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-3 py-1 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    Add to Cart
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1 group-hover:text-gray-300 transition-colors">{product.name}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</p>
                                </div>
                                <span className="text-white font-mono">{product.price}</span>
                            </div>
                         </div>
                    </Reveal>
                ))}
                
                {/* Coming Soon Card */}
                 <Reveal delay={0.2}>
                    <div className="aspect-[4/5] bg-gray-900 border border-white/10 flex flex-col items-center justify-center text-center p-8 rounded-2xl">
                        <ShoppingBag size={48} className="text-gray-700 mb-4" strokeWidth={1} />
                        <h3 className="text-xl font-bold text-gray-500 uppercase tracking-tight">More Dropping Soon</h3>
                        <p className="text-xs text-gray-700 uppercase tracking-widest mt-2">Sign up for notifications</p>
                    </div>
                 </Reveal>
            </div>
        </div>
    </div>
  );
};