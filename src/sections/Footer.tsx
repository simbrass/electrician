import { Shield, Award, Phone } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-white/10 py-12 z-[90]">
      <div className="px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo and copyright */}
          <div className="text-center lg:text-left">
            <a href="#" className="font-heading font-bold text-xl text-white mb-2 inline-block">
              Arsenal <span className="text-gold">Électrique</span>
            </a>
            <p className="text-gray-text text-sm">
              © {currentYear} Arsenal Électrique — Licence RBQ 0000-0000-01
            </p>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
              <Shield className="text-gold" size={16} />
              <span className="text-white/80 text-sm">RBQ 0000-0000-01</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2">
              <Award className="text-gold" size={16} />
              <span className="text-white/80 text-sm">CMMTQ</span>
            </div>
          </div>

          {/* Quick contact */}
          <a
            href="tel:+14500000000"
            className="flex items-center gap-2 text-white hover:text-gold transition-colors"
          >
            <Phone size={18} />
            <span className="font-medium">(450) 000-0000</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-text text-xs">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#services" className="hover:text-white transition-colors">
                Services
              </a>
              <a href="#residential" className="hover:text-white transition-colors">
                Secteurs
              </a>
              <a href="#projects" className="hover:text-white transition-colors">
                Projets
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <div className="text-center sm:text-right">
              Service professionnel sur la Rive-Nord de Montréal
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
