import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Star } from 'lucide-react';
import sourdoughHero from '../assets/brand/sourdough-hero.png';
import focacciaArtisanal from '../assets/brand/focaccia-artisanal.png';
import cookieBox from '../assets/brand/cookie-box-seasonal.png';

const LandingPage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, mins: 42, secs: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { title: 'Naturally Leavened Sourdough', price: '2', img: sourdoughHero, tag: 'Signature' },
    { title: 'Artisanal Focaccia', price: '5', img: focacciaArtisanal, tag: 'Limited' },
    { title: 'Seasonal Cookie Box', price: '4', img: cookieBox, tag: 'Popular' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-warm-flour">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={sourdoughHero} alt="background" className="w-full h-full object-cover blur-sm" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-crusty-sourdough/10 border border-crusty-sourdough/20 rounded-full px-4 py-1 mb-8 text-crusty-sourdough text-sm font-medium">
            <Star size={14} className="fill-current" />
            <span>Next Drop is coming soon</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif text-slate-hearth leading-tight mb-6">
            Small Batch. <br />
            <span className="text-crusty-sourdough">Naturally Leavened.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-herb-garden max-w-2xl mx-auto mb-12">
            Artisanal baked goods from our home kitchen to your table. 
            Pre-order for weekend pickup and taste the difference of slow-fermented craft.
          </p>

          {/* Countdown Card */}
          <div className="bg-white/50 backdrop-blur-md border border-crusty-sourdough/10 rounded-2xl p-8 shadow-xl max-w-xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-2 text-slate-hearth mb-4 font-medium uppercase tracking-widest text-xs">
              <Clock size={16} className="text-terracotta" />
              <span>Orders Open In</span>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-serif text-slate-hearth">{value.toString().padStart(2, '0')}</span>
                  <span className="text-[10px] uppercase tracking-tighter text-herb-garden">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <Link to="/menu" className="inline-flex items-center space-x-2 bg-slate-hearth text-warm-flour px-8 py-4 rounded-full hover:bg-crusty-sourdough transition-all group">
            <span>Explore the Menu</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl font-serif text-slate-hearth mb-4">On the Counter</h2>
              <p className="text-herb-garden italic">Every batch is intentional, never stale. Here's what we're baking this window.</p>
            </div>
            <Link to="/menu" className="mt-6 md:mt-0 text-crusty-sourdough font-medium inline-flex items-center space-x-1 hover:underline">
              <span>View Full Menu</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-warm-flour">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-hearth">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-serif text-slate-hearth leading-tight group-hover:text-crusty-sourdough transition-colors">{item.title}</h3>
                  <span className="text-herb-garden font-medium">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Focus Section */}
      <section className="py-24 px-4 bg-warm-flour border-y border-crusty-sourdough/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-slate-hearth mb-8">Hyper-Local. Hyper-Fresh.</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 bg-herb-garden/10 text-herb-garden rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={24} />
              </div>
              <h4 className="font-serif text-lg mb-2">Home Kitchen</h4>
              <p className="text-sm text-herb-garden">Crafted in small batches with premium, clean ingredients.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-crusty-sourdough/10 text-crusty-sourdough rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={24} />
              </div>
              <h4 className="font-serif text-lg mb-2">Scheduled Drops</h4>
              <p className="text-sm text-herb-garden">No waste, no stale bread. We bake only what is pre-ordered.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={24} />
              </div>
              <h4 className="font-serif text-lg mb-2">Local Pickup</h4>
              <p className="text-sm text-herb-garden">Serving our neighborhood with walkable pickup windows.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper for local icon reuse
const ShoppingBag = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

export default LandingPage;
