import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Secteurs', href: '#residential' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className={`font-heading font-bold text-xl tracking-tight transition-colors ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}
            >
              Arsenal{' '}
              <span className="text-gold">Électrique</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className={`font-medium text-sm transition-colors hover:text-gold ${
                    isScrolled ? 'text-navy/80' : 'text-white/90'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-gold hover:bg-gold-dark text-navy font-semibold px-6 btn-hover"
              >
                Devis gratuit
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-navy/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="font-heading font-bold text-3xl text-white hover:text-gold transition-colors"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen
                  ? 'translateY(0)'
                  : 'translateY(20px)',
              }}
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection('#contact')}
            className="mt-4 bg-gold hover:bg-gold-dark text-navy font-semibold px-8 py-6 text-lg btn-hover"
          >
            <Phone className="mr-2" size={20} />
            Appeler
          </Button>
        </div>
      </div>
    </>
  );
}
