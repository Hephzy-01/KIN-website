import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from './Icons';

interface HeaderProps {
  onNavigate: (page: 'home' | 'about' | 'contact' | 'programmes' | 'gods-university') => void;
  currentPage: 'home' | 'about' | 'contact' | 'programmes' | 'gods-university';
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'about' | 'contact' | 'programmes' | 'gods-university', href?: string) => {
    if (page === 'about' || page === 'contact' || page === 'programmes' || page === 'gods-university') {
      onNavigate(page);
      window.scrollTo(0, 0);
    } else {
      onNavigate('home');
      if (href) {
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', page: 'home' as const, href: '#home' },
    { name: 'Programmes', page: 'programmes' as const },
    { name: 'About', page: 'about' as const },
  ];
  
  const scrolledOrOpen = isScrolled || isOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolledOrOpen ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex-shrink-0">
            <button onClick={() => handleNavClick('home', '#home')} className="flex items-center">
                <img src="/KIN-website/logo.png" alt="KidsInspiring Nation Logo" className="h-16 sm:h-20 md:h-24 w-auto" />
                <div className="border-l-2 border-brand-yellow pl-1">
                  <p className={`text-xs sm:text-sm font-bold tracking-wide leading-tight transition-colors duration-300 ${scrolledOrOpen ? 'text-brand-purple-dark' : 'text-white'}`} style={{ fontFamily: "'Lobster', cursive" }}>
                    raising gods,<br/>building nations
                  </p>
                </div>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <button key={link.name} onClick={() => handleNavClick(link.page, link.href)} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${scrolledOrOpen ? 'text-gray-700 hover:text-brand-purple' : 'text-gray-200 hover:text-white'}`}>
                  {link.name}
                </button>
              ))}
               <a href="https://paystack.shop/pay/KINgive" target="_blank" rel="noopener noreferrer" className="ml-4 bg-brand-yellow text-brand-purple-dark font-bold py-2 px-4 rounded-full text-sm uppercase tracking-wider hover:bg-brand-yellow-dark transition-colors duration-300">
                Give
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors duration-300 ${scrolledOrOpen ? 'text-gray-700 hover:text-brand-purple' : 'text-gray-200 hover:text-white'}`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => handleNavClick(link.page, link.href)} className="text-gray-700 hover:text-brand-purple block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors">
                {link.name}
              </button>
            ))}
            <a href="https://paystack.shop/pay/KINgive" target="_blank" rel="noopener noreferrer" className="block w-full text-left bg-brand-yellow text-brand-purple-dark font-bold mt-2 py-2 px-3 rounded-md text-base uppercase tracking-wider hover:bg-brand-yellow-dark transition-colors duration-300">
                Give
            </a>
          </div>
        </div>
      )}
    </header>
  );
};