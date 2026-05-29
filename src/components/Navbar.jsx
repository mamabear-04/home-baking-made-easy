import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-warm-flour/80 backdrop-blur-md border-b border-crusty-sourdough/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif text-slate-hearth tracking-tight">
          The Local <span className="text-crusty-sourdough">Crumb</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center text-sm font-medium uppercase tracking-widest text-herb-garden">
          <Link to="/" className="hover:text-crusty-sourdough transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-crusty-sourdough transition-colors">Menu</Link>
          <Link to="/playbook" className="hover:text-crusty-sourdough transition-colors">Playbook</Link>
          <Link to="/account" className="hover:text-crusty-sourdough transition-colors">Account</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-hearth hover:text-crusty-sourdough transition-colors relative">
            <ShoppingBag size={24} strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-terracotta rounded-full"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
