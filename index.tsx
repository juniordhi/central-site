import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Video, 
  Palette, 
  Cpu, 
  Globe, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Instagram, 
  Linkedin,
  MapPin,
  Phone,
  Send,
  Play,
  TrendingUp,
  Users,
  Quote,
  Star,
  AlertCircle,
  Loader2,
  Calendar,
  ArrowUpRight,
  Activity,
  Radar
} from 'lucide-react';

// --- Utility for Scroll Animations ---
const useOnScreen = (options: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
};

const Reveal: React.FC<{ children?: React.ReactNode; delay?: number; width?: string }> = ({ children, delay = 0, width = '100%' }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, width }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4`}>
      <div className={`max-w-6xl mx-auto rounded-full transition-all duration-300 ${
        scrolled || isOpen ? 'bg-slate-950/90 backdrop-blur-xl border border-slate-800 shadow-2xl' : 'bg-transparent border border-transparent'
      }`}>
        <div className="flex items-center justify-between px-6 py-3 md:py-4 relative z-50">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-xl md:text-2xl font-black tracking-tighter text-white flex items-center gap-1 group">
              <span>CENTRAL</span>
              <span className="text-indigo-500 group-hover:animate-pulse">DIGITALE</span>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 ml-0.5"></div>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold text-slate-300 hover:text-white transition-colors uppercase tracking-wide relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-white text-slate-950 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20"
            >
              Devis Gratuit
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90 transform"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Improved Animation */}
        <div className={`md:hidden absolute top-full left-0 w-full mt-2 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-slate-800 shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}>
            <div className="p-4 space-y-1 flex flex-col items-center">
              {navLinks.map((link, i) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: `${i * 50}ms` }}
                  className={`text-slate-300 hover:text-white block px-4 py-3 rounded-xl text-lg font-medium w-full text-center hover:bg-white/5 transition-all duration-300 transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full text-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-4 py-4 rounded-xl text-lg font-bold shadow-lg shadow-indigo-900/50 active:scale-95 transition-all"
              >
                Devis Gratuit
              </a>
            </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover opacity-[0.03] pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          
          <Reveal delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-md text-indigo-300 text-sm font-medium mb-8 hover:border-indigo-500/50 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Agence Digitale Internationale
            </div>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
              L'IMPACT <br className="md:hidden"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient bg-300%">
                DIGITAL ABSOLU
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Nous transformons votre vision en une machine de guerre digitale. 
              <span className="text-white font-semibold block mt-2">Design d'élite, vidéos virales et technologies IA.</span>
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a href="#contact" className="group w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)]">
                Lancer mon projet
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#portfolio" className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 text-white border border-slate-700 rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                <Play size={18} className="fill-white" />
                Découvrir nos offres
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
        <Reveal delay={100}>
          <h2 className="text-indigo-400 font-bold tracking-widest uppercase text-xs mb-4 inline-flex items-center gap-2 justify-center">
            <span className="w-8 h-[1px] bg-indigo-400"></span>
            À Propos
            <span className="w-8 h-[1px] bg-indigo-400"></span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
            Nous créons ce que <br/>
            <span className="text-slate-500">les autres imaginent.</span>
          </h3>
        </Reveal>
        
        <Reveal delay={300}>
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            <p>
              Central Digitale n'est pas une simple agence, c'est un accélérateur de réussite basé à Lomé et opérant mondialement.
            </p>
            <p>
              Notre mission est d'équiper les entreprises ambitieuses des outils les plus puissants du marché actuel pour dominer leur secteur.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  )
}

const Services = () => {
  const services = [
    {
      icon: <Video size={32} className="text-white" />,
      color: "bg-indigo-500",
      title: "Montage Vidéo",
      description: "Reels, TikToks et vidéos Youtube captivants pour exploser votre engagement."
    },
    {
      icon: <Palette size={32} className="text-white" />,
      color: "bg-purple-500",
      title: "Graphisme",
      description: "Identités visuelles marquantes, logos et supports marketing qui incarnent votre marque."
    },
    {
      icon: <Cpu size={32} className="text-white" />,
      color: "bg-cyan-500",
      title: "Automatisation IA",
      description: "Gagnez du temps : Chatbots, CRM automatisés et workflows intelligents."
    },
    {
      icon: <Globe size={32} className="text-white" />,
      color: "bg-emerald-500",
      title: "Site Web",
      description: "Sites vitrines et e-commerce modernes, rapides et optimisés pour la conversion."
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Nos Expertises</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Une suite complète de services pour digitaliser votre entreprise de A à Z.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="glass-card h-full p-6 rounded-2xl hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-2 group border-t border-white/5 flex flex-col items-start text-left">
                <div className={`mb-4 w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center ${service.color} shadow-lg shadow-${service.color}/20 group-hover:scale-110 transition-transform duration-300`}>
                  {React.cloneElement(service.icon as React.ReactElement, { size: 24 })}
                </div>
                <h3 className="text-base md:text-xl font-bold mb-2 text-white group-hover:text-indigo-300 transition-colors leading-tight">{service.title}</h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { 
      title: "Campagne Nike Style", 
      category: "Montage Vidéo", 
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      title: "Tech Startup Landing", 
      category: "Site Web", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      title: "Visual Identity System", 
      category: "Graphisme", 
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
    },
    { 
      title: "Finance Dashboard", 
      category: "Automatisation", 
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
    },
  ];

  return (
    <section id="portfolio" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-end md:text-left mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Réalisations Récentes</h2>
              <p className="text-slate-400">Découvrez comment nous aidons nos clients à briller.</p>
            </div>
            <button className="mt-6 md:mt-0 text-white bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full flex items-center gap-2 font-medium transition-colors border border-white/10">
              Voir tout le portfolio <ArrowRight size={18} />
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:gap-8">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 150}>
              <div className="group relative overflow-hidden rounded-xl md:rounded-3xl aspect-[4/3] md:aspect-video cursor-pointer shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 p-3 md:p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-indigo-600/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full inline-block mb-2 md:mb-3">
                    {project.category}
                  </div>
                  <h3 className="text-sm md:text-2xl font-bold text-white leading-tight mb-1 md:mb-2">{project.title}</h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all">
                    <span className="text-indigo-300 text-[10px] md:text-sm font-medium flex items-center gap-1">
                      Voir le projet <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marc Dupont",
      role: "CEO, TechHorizon",
      quote: "Une transformation radicale de notre image de marque. Le site web est ultra-rapide.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Sarah K.",
      role: "Glow Cosmetics",
      quote: "Les vidéos pour notre lancement TikTok ont fait le buzz. Central Digitale assure.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "David L.",
      role: "Consultant",
      quote: "L'IA m'a fait gagner 20h de travail. Un investissement rentabilisé immédiatement.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
    },
     {
      name: "Julie M.",
      role: "Art Director",
      quote: "Une équipe réactive et un design à couper le souffle. Je recommande à 100%.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-slate-900/50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-900/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils nous font confiance</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
              L'élite du business mondial choisit Central Digitale.
            </p>
          </div>
        </Reveal>

        {/* Horizontal Slider for Testimonials */}
        <div className="flex overflow-x-auto gap-4 pb-8 snap-x hide-scrollbar px-2 -mx-4 md:mx-0">
          {testimonials.map((t, index) => (
            <div key={index} className="flex-shrink-0 w-[280px] md:w-[350px] snap-center">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 relative group hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg h-full flex flex-col justify-between">
                <Quote className="absolute top-4 right-4 text-slate-800 w-6 h-6 group-hover:text-indigo-900/50 transition-colors" />
                
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-indigo-500 text-indigo-500" />
                    ))}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/30" 
                  />
                  <div>
                    <h4 className="text-white font-bold text-sm">{t.name}</h4>
                    <p className="text-indigo-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      if (isPaused) return;

      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
         const firstCard = scrollContainer.children[0] as HTMLElement;
         const itemWidth = firstCard ? firstCard.offsetWidth : 350; 
         const gap = 24; 
         const itemFullWidth = itemWidth + gap;
         
         const currentScroll = scrollContainer.scrollLeft;
         const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
         
         let nextScroll = currentScroll + itemFullWidth;
         
         if (nextScroll >= maxScroll - 5) { 
             nextScroll = 0;
         }
         
         scrollContainer.scrollTo({
             left: nextScroll,
             behavior: 'smooth'
         });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const posts = [
    {
      category: "Stratégie",
      date: "15 Oct",
      title: "Format court : Dominer 2024",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
      excerpt: "TikTok, Reels, Shorts : capter l'attention en 3 secondes."
    },
    {
      category: "IA",
      date: "02 Nov",
      title: "L'IA ne remplacera pas votre agence",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
      excerpt: "Comment utiliser l'IA pour décupler la productivité."
    },
    {
      category: "Design",
      date: "28 Nov",
      title: "Tendances UX/UI à surveiller",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
      excerpt: "Du 'Bento Design' au retour du maximalisme."
    },
     {
      category: "Tech",
      date: "10 Dec",
      title: "Le futur du Web3",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
      excerpt: "Comprendre les enjeux de la décentralisation."
    }
  ];

  return (
    <section id="blog" className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Actualités & Insights</h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Décryptage des tendances pour garder une longueur d'avance.
            </p>
          </div>
        </Reveal>

        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex overflow-x-auto gap-6 pb-8 snap-x hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
        >
          {posts.map((post, index) => (
            <div key={index} className="flex-shrink-0 w-[85vw] sm:w-[350px] snap-center">
              <article className="group cursor-pointer flex flex-col h-full bg-slate-900/50 rounded-2xl overflow-hidden hover:bg-slate-800/50 transition-colors border border-transparent hover:border-white/5">
                <div className="relative overflow-hidden h-48 w-full">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-white border border-white/10 uppercase tracking-wide">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-indigo-400 font-medium text-xs group/link mt-auto">
                    Lire l'article 
                    <ArrowUpRight size={14} className="ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
           <button className="text-indigo-400 font-medium text-sm flex items-center justify-center gap-2 mx-auto hover:text-white transition-colors">
             Voir toutes les actualités <ArrowRight size={16} />
           </button>
        </div>

      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    "Montage Vidéo",
    "Graphisme",
    "Automatisation IA",
    "Site Web"
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.service) newErrors.service = "Veuillez choisir un service";
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', service: '', message: '' });
      }, 1500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleServiceSelect = (service: string) => {
    setFormData(prev => ({ ...prev, service }));
    if (errors.service) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.service;
        return newErrors;
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left Side Content - Simplified */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à dominer votre marché ?</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Discutons de votre projet. Que vous ayez besoin d'une refonte complète, d'une stratégie de contenu ou d'une automatisation IA, nous sommes prêts.
              </p>
              
              <div className="p-8 bg-indigo-900/10 border border-indigo-500/20 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full"></div>
                <h4 className="text-xl font-bold text-white mb-2 relative z-10">Pourquoi Central Digitale ?</h4>
                <ul className="space-y-3 relative z-10">
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="text-indigo-400" size={20} /> Expertise Internationale
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="text-indigo-400" size={20} /> Technologie de Pointe
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="text-indigo-400" size={20} /> Résultats Garantis
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 shadow-xl">
               {isSubmitted ? (
                 <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-in fade-in zoom-in duration-500">
                   <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                     <CheckCircle2 size={40} />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">Message Envoyé !</h3>
                   <p className="text-slate-400 mb-6">Nous vous répondrons sous 24h.</p>
                   <button 
                     onClick={() => setIsSubmitted(false)}
                     className="text-indigo-400 font-medium hover:text-white transition-colors"
                   >
                     Envoyer un autre message
                   </button>
                 </div>
               ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Nom complet</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border ${errors.name ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Email professionnel</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600`}
                      placeholder="john@entreprise.com"
                    />
                     {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                  
                  {/* Service Selector */}
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Service souhaité</label>
                    <div className="grid grid-cols-2 gap-2">
                      {services.map((svc) => (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => handleServiceSelect(svc)}
                          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                            formData.service === svc 
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                          }`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.service}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Votre projet</label>
                    <textarea 
                      rows={4} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-slate-950 border ${errors.message ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600`}
                      placeholder="Parlez-nous de vos objectifs..."
                    ></textarea>
                     {errors.message && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-500 transition-all transform hover:scale-[1.02] shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <a href="#" className="text-2xl font-black tracking-tighter text-white flex items-center justify-center md:justify-start gap-1 mb-6">
              <span>CENTRAL</span>
              <span className="text-indigo-500">DIGITALE</span>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 ml-0.5"></div>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0 mb-6">
              Agence de marketing digital premium. Nous combinons créativité humaine et puissance de l'IA pour propulser votre marque.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-600 transition-all">
                <Users size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-row justify-center md:justify-end gap-8 sm:gap-12 md:gap-24">
             {/* Navigation - Centered on mobile, aligned on Desktop */}
             <div className="text-left">
                <h3 className="text-white font-bold mb-6">Navigation</h3>
                <ul className="space-y-4">
                  <li><a href="#home" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Accueil</a></li>
                  <li><a href="#services" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Services</a></li>
                  <li><a href="#portfolio" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Portfolio</a></li>
                  <li><a href="#blog" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Blog</a></li>
                  <li><a href="#contact" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Contact</a></li>
                </ul>
              </div>

              {/* Contact Info - Centered on mobile, aligned on Desktop */}
              <div className="text-left">
                <h3 className="text-white font-bold mb-6">Contact</h3>
                <ul className="space-y-4 flex flex-col items-start">
                  <li className="flex items-start gap-3 text-slate-400 text-sm">
                    <MapPin size={16} className="mt-1 text-indigo-500 shrink-0" />
                    <span>Lomé, Togo<br/>Quartier Administratif</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-400 text-sm">
                    <Phone size={16} className="text-indigo-500 shrink-0" />
                    <span>+228 71 51 84 10</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-400 text-sm">
                    <Mail size={16} className="text-indigo-500 shrink-0" />
                    <span>hello@centraldigitale.com</span>
                  </li>
                </ul>
              </div>
          </div>
          
        </div>

        {/* Map Image Section - New Tech Animation */}
        <div className="w-full h-48 rounded-xl overflow-hidden mb-12 relative group cursor-pointer border border-slate-800 hover:border-indigo-500/50 transition-colors">
           <img 
             src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
             alt="Location Map" 
             className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
           />
           {/* Radar Scan Effect */}
           <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-full h-1 bg-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,1)] absolute top-0 animate-[scan_2s_linear_infinite]"></div>
           </div>

           <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-slate-950/80 px-5 py-3 rounded-full text-white text-sm font-bold flex items-center gap-2 backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform shadow-2xl">
               <MapPin size={16} className="text-indigo-500 animate-bounce" /> Voir sur la carte
             </div>
           </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-slate-500 text-xs">
            © 2024 Central Digitale. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Mentions Légales</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">Confidentialité</a>
            <a href="#" className="text-slate-500 hover:text-white text-xs transition-colors">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);