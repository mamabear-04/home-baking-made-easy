import React from 'react';
import { ShoppingBag, Info } from 'lucide-react';
import sourdoughHero from '../assets/brand/sourdough-hero.png';
import focacciaArtisanal from '../assets/brand/focaccia-artisanal.png';
import cookieBox from '../assets/brand/cookie-box-seasonal.png';

const MenuPage = () => {
  const products = [
    {
      id: 1,
      name: 'Country Sourdough',
      description: 'Our signature loaf. 24-hour cold ferment, 85% hydration, organic stone-ground flour.',
      price: '2.00',
      image: sourdoughHero,
      stock: 5,
    },
    {
      id: 2,
      name: 'Rosemary & Sea Salt Focaccia',
      description: 'Dimpled dough topped with fresh rosemary and Maldon sea salt. Best enjoyed fresh.',
      price: '5.00',
      image: focacciaArtisanal,
      stock: 3,
    },
    {
      id: 3,
      name: 'Seasonal Cookie Box',
      description: 'A bakers dozen of our rotating favorites. Currently: Brown Butter Miso & Double Chocolate Rye.',
      price: '4.00',
      image: cookieBox,
      stock: 12,
    }
  ];

  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-slate-hearth mb-4">The Weekend Menu</h1>
        <p className="text-herb-garden max-w-xl mx-auto">
          Pre-orders close Thursday at midnight for Saturday morning pickup.
          Inventory is limited to ensure quality in every bake.
        </p>
      </header>

      <div className="bg-terracotta/5 border border-terracotta/10 rounded-2xl p-6 mb-16 flex items-start space-x-4 max-w-3xl mx-auto">
        <Info className="text-terracotta flex-shrink-0 mt-1" size={20} />
        <div className="text-sm text-slate-hearth/80">
          <p className="font-bold text-terracotta mb-1">Cottage Food Law Disclosure</p>
          <p>This product is made in a home kitchen and is not inspected by the Department of State Health Services or a local health department.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map(product => (
          <div key={product.id} className="flex flex-col bg-white rounded-3xl overflow-hidden border border-crusty-sourdough/5 hover:border-crusty-sourdough/20 transition-all shadow-sm hover:shadow-xl">
            <div className="aspect-square overflow-hidden bg-warm-flour relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.stock < 5 && (
                <div className="absolute top-4 right-4 bg-terracotta text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                  Only {product.stock} left
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-serif text-slate-hearth">{product.name}</h3>
                <span className="font-medium text-crusty-sourdough">{product.price}</span>
              </div>
              <p className="text-herb-garden text-sm mb-8 flex-grow leading-relaxed">
                {product.description}
              </p>
              <button className="w-full bg-slate-hearth text-warm-flour py-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-crusty-sourdough transition-colors group">
                <ShoppingBag size={18} />
                <span>Add to Order</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-warm-flour rounded-3xl p-12 text-center border border-crusty-sourdough/10">
        <h2 className="text-3xl font-serif text-slate-hearth mb-4">Missing Out?</h2>
        <p className="text-herb-garden mb-8">Join our mailing list to be notified as soon as the next order window opens.</p>
        <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
          <input type="email" placeholder="your@email.com" className="flex-grow px-6 py-4 rounded-xl border border-crusty-sourdough/20 bg-white focus:outline-none focus:ring-2 focus:ring-crusty-sourdough/30" />
          <button className="bg-herb-garden text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-hearth transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
