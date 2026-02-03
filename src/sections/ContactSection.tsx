import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Phone,
    label: 'Téléphone',
    value: '(450) 000-0000',
    href: 'tel:+14500000000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@arsenalelectrique.ca',
    href: 'mailto:info@arsenalelectrique.ca',
  },
  {
    icon: MapPin,
    label: 'Zone de service',
    value: 'Laval · Rosemère · Terrebonne · Boisbriand',
    href: null,
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;

    if (!section || !left || !form) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        left,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        form,
        { y: 40, opacity: 0, rotateZ: 0.5 },
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 35%',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-gray-light py-20 lg:py-32 z-[80]"
    >
      <div className="px-6 lg:px-[7vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column - Info */}
          <div ref={leftRef}>
            <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-6">
              Parlons de votre
              <br />
              <span className="text-gold">projet.</span>
            </h2>

            <p className="text-navy/70 text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Racontez-nous vos besoins. On vous répond sous 24h.
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="text-gold" size={22} />
                  </div>
                  <div>
                    <div className="text-navy/50 text-sm mb-1">{info.label}</div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-navy font-medium hover:text-gold transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-navy font-medium">{info.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Form */}
          <div ref={formRef}>
            <div className="bg-white rounded-3xl shadow-card p-6 lg:p-10">
              {/* Decorative line */}
              <div className="w-full h-1 bg-gradient-to-r from-gold/50 via-gold to-gold/50 rounded-full mb-8" />

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-2xl mb-3">
                    Message envoyé!
                  </h3>
                  <p className="text-navy/60">
                    Nous vous contacterons sous 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-navy/70 text-sm mb-2 block">
                        Nom
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        required
                        className="bg-gray-light border-0 rounded-xl py-6 text-navy placeholder:text-navy/40"
                      />
                    </div>
                    <div>
                      <label className="text-navy/70 text-sm mb-2 block">
                        Téléphone
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(450) 000-0000"
                        required
                        className="bg-gray-light border-0 rounded-xl py-6 text-navy placeholder:text-navy/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-navy/70 text-sm mb-2 block">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      required
                      className="bg-gray-light border-0 rounded-xl py-6 text-navy placeholder:text-navy/40"
                    />
                  </div>

                  <div>
                    <label className="text-navy/70 text-sm mb-2 block">
                      Type de projet
                    </label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, projectType: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-light border-0 rounded-xl py-6 text-navy">
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">
                          Installation résidentielle
                        </SelectItem>
                        <SelectItem value="commercial">
                          Projet commercial
                        </SelectItem>
                        <SelectItem value="ev">Borne de recharge VE</SelectItem>
                        <SelectItem value="compliance">
                          Mise aux normes
                        </SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-navy/70 text-sm mb-2 block">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet..."
                      rows={4}
                      className="bg-gray-light border-0 rounded-xl py-4 text-navy placeholder:text-navy/40 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gold hover:bg-gold-dark text-navy font-bold py-6 btn-hover group"
                  >
                    Envoyer la demande
                    <Send
                      className="ml-2 transition-transform group-hover:translate-x-1"
                      size={18}
                    />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
