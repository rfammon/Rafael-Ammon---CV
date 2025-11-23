import React, { useState, useEffect } from 'react';
import { PROFILE, EXPERIENCES, PROJECTS, SKILLS } from './constants';
import { 
  LeafIcon, MapPinIcon, MailIcon, MenuIcon, XIcon, SproutIcon, 
  SunIcon, MoonIcon, LinkedinIcon, PhoneIcon, ToolsIcon, MonitorIcon, BriefcaseIcon, SendIcon 
} from './components/Icons';
import ChatWidget from './components/ChatWidget';
import ProjectCard from './components/ProjectCard';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Theme State Initialization
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Contact Form State
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    // Simulate sending
    setTimeout(() => {
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  // Apply Theme Effect
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, text, mobile = false }: { href: string; text: string; mobile?: boolean }) => (
    <a
      href={href}
      className={`${
        mobile
          ? 'block px-4 py-3 text-lg font-medium hover:bg-forest-50 dark:hover:bg-stone-800 text-earth-800 dark:text-stone-200'
          : 'text-earth-900 dark:text-stone-200 hover:text-forest-600 dark:hover:text-forest-400 font-medium transition-colors'
      }`}
      onClick={() => mobile && setIsMenuOpen(false)}
    >
      {text}
    </a>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-earth-100 dark:bg-stone-950 transition-colors duration-300">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-stone-900/90 backdrop-blur-md shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 text-forest-800 dark:text-forest-400 transition-colors group">
            <LeafIcon className="w-8 h-8 group-hover:text-forest-600 dark:group-hover:text-forest-300 transition-colors" />
            <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tight leading-none group-hover:text-forest-900 dark:group-hover:text-stone-100 transition-colors">Rafael Ammon</span>
                <span className="text-xs font-sans tracking-widest text-forest-600 dark:text-forest-500 uppercase">EcoFolio</span>
            </div>
          </a>

          <div className="hidden md:flex gap-8 items-center">
            <NavLink href="#about" text="Sobre" />
            <NavLink href="#experience" text="Experiência" />
            <NavLink href="#portfolio" text="Projetos" />
            <NavLink href="#skills" text="Habilidades" />
            <NavLink href="#contact" text="Contato" />
            
            {/* Theme Toggle Desktop */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-earth-200 dark:hover:bg-stone-800 text-earth-800 dark:text-stone-200 transition-colors"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
             {/* Theme Toggle Mobile */}
             <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-earth-200 dark:hover:bg-stone-800 text-earth-800 dark:text-stone-200 transition-colors"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            <button
              className="text-earth-900 dark:text-stone-200 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-stone-900 shadow-lg md:hidden border-t border-earth-200 dark:border-stone-800">
            <div className="flex flex-col py-2">
              <NavLink href="#about" text="Sobre" mobile />
              <NavLink href="#experience" text="Experiência" mobile />
              <NavLink href="#portfolio" text="Projetos" mobile />
              <NavLink href="#skills" text="Habilidades" mobile />
              <NavLink href="#contact" text="Contato" mobile />
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://picsum.photos/seed/foresthero/1920/1080" 
            alt="Background Floresta" 
            className="w-full h-full object-cover opacity-10 dark:opacity-20 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-earth-100/50 via-earth-100/80 to-earth-100 dark:from-stone-950/50 dark:via-stone-950/80 dark:to-stone-950 transition-colors duration-300"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <span className="inline-block px-4 py-1.5 rounded-full bg-forest-100 dark:bg-forest-900/50 text-forest-800 dark:text-forest-200 font-semibold text-sm tracking-wide uppercase mb-2">
                Engenharia Florestal & Gestão Ambiental
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-earth-900 dark:text-stone-100 leading-tight">
                Gestão Ambiental com <br/> <span className="text-forest-700 dark:text-forest-500">Foco em Sustentabilidade</span>
            </h1>
            <p className="text-lg md:text-xl text-earth-800 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
                {PROFILE.bio}
            </p>
            <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center">
                <a href="#contact" className="bg-forest-700 hover:bg-forest-800 dark:bg-forest-600 dark:hover:bg-forest-700 text-white px-8 py-3.5 rounded-lg font-medium transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Entrar em Contato
                </a>
                <a href="#portfolio" className="bg-white hover:bg-forest-50 dark:bg-stone-900 dark:hover:bg-stone-800 text-forest-800 dark:text-forest-200 border border-forest-200 dark:border-forest-800 px-8 py-3.5 rounded-lg font-medium transition shadow-sm">
                    Ver Projetos
                </a>
            </div>
        </div>
      </header>

      {/* About & Experience Grid */}
      <section id="experience" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
            {/* Left Col: Philosophy */}
            <div>
                <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-stone-100 mb-6 flex items-center gap-3">
                    <SproutIcon className="w-8 h-8 text-forest-600 dark:text-forest-400" />
                    Minha Filosofia
                </h2>
                <div className="space-y-6 text-earth-800 dark:text-stone-300 leading-relaxed">
                    <p>
                        Acredito que a intervenção humana na paisagem deve harmonizar desenvolvimento industrial e conservação. Seja na recuperação de uma área degradada ou na gestão de contratos em áreas industriais, o foco é a excelência técnica e a conformidade legal.
                    </p>
                    <p>
                        Meu trabalho combina o rigor técnico da engenharia florestal com ferramentas modernas de gestão de projetos (PMBOK/Google), garantindo eficiência operacional e sustentabilidade ecológica.
                    </p>
                    <div className="bg-white dark:bg-stone-900 p-6 rounded-xl border-l-4 border-forest-500 shadow-sm my-6 transition-colors duration-300">
                        <p className="italic font-serif text-lg text-forest-800 dark:text-forest-200">
                            "A natureza não é um lugar para visitar. É o nosso lar."
                        </p>
                        <p className="mt-2 text-sm text-forest-600 dark:text-forest-400 font-bold">— Gary Snyder</p>
                    </div>
                </div>
            </div>

            {/* Right Col: Timeline */}
            <div>
                <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-stone-100 mb-8">Trajetória Profissional</h2>
                <div className="space-y-0 border-l-2 border-forest-200 dark:border-stone-800 ml-3 transition-colors duration-300">
                    {EXPERIENCES.map((exp, index) => (
                        <div key={exp.id} className="relative pl-8 pb-10 last:pb-0">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-forest-600 dark:bg-forest-500 border-4 border-white dark:border-stone-950 shadow-sm transition-colors duration-300"></div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                <h3 className="font-bold text-lg text-earth-900 dark:text-stone-100">{exp.role}</h3>
                                <span className="hidden sm:inline text-gray-400">•</span>
                                <span className="text-forest-700 dark:text-forest-400 font-medium text-sm">{exp.company}</span>
                            </div>
                            <span className="inline-block bg-earth-200 dark:bg-stone-800 text-earth-800 dark:text-stone-300 text-xs px-2 py-0.5 rounded mb-3 transition-colors duration-300">
                                {exp.period}
                            </span>
                            <p className="text-earth-800 dark:text-stone-400 text-sm leading-relaxed">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Projects */}
      <section id="portfolio" className="py-20 bg-white dark:bg-stone-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-forest-600 dark:text-forest-400 font-semibold tracking-wide text-sm uppercase">Portfolio</span>
                <h2 className="font-serif text-4xl font-bold text-earth-900 dark:text-stone-100 mt-2">Projetos Selecionados</h2>
                <p className="text-earth-600 dark:text-stone-400 mt-4 max-w-2xl mx-auto">
                    Uma curadoria de trabalhos que representam a diversidade e complexidade dos desafios que soluciono.
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {PROJECTS.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-6 bg-forest-900 dark:bg-forest-950 text-white transition-colors duration-300 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-forest-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-800/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                  <span className="text-forest-300 font-semibold tracking-wide text-sm uppercase">Expertise</span>
                  <h2 className="font-serif text-4xl font-bold text-white mt-2">Competências Técnicas</h2>
                  <p className="text-forest-200/80 mt-4 max-w-2xl mx-auto">
                    Uma combinação de conhecimento técnico florestal, domínio de softwares especializados e habilidades de gestão.
                  </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { id: 'Técnica', icon: ToolsIcon, label: 'Engenharia & Campo' },
                    { id: 'Software', icon: MonitorIcon, label: 'Softwares & GIS' },
                    { id: 'Gestão', icon: BriefcaseIcon, label: 'Gestão & Liderança' }
                  ].map((category) => (
                      <div key={category.id} className="bg-forest-800/40 dark:bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-forest-700/50 hover:border-forest-500/50 transition-colors duration-300 group">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="bg-forest-700/50 p-3 rounded-xl group-hover:bg-forest-600 transition-colors">
                              <category.icon className="w-6 h-6 text-forest-200" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{category.id}</h3>
                                <p className="text-xs text-forest-300 uppercase tracking-wider">{category.label}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                              {SKILLS.filter(s => s.category === category.id).map(skill => (
                                  <div key={skill.name} className="group/skill">
                                      <div className="flex justify-between mb-2">
                                          <span className="font-medium text-sm text-forest-100 group-hover/skill:text-white transition-colors">{skill.name}</span>
                                          <span className="text-forest-400 text-xs font-mono">{skill.level}%</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-forest-950 dark:bg-black/60 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-gradient-to-r from-forest-500 to-forest-300 rounded-full transition-all duration-1000 ease-out group-hover/skill:brightness-125"
                                            style={{ width: `${skill.level}%` }}
                                          ></div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-earth-100 dark:bg-stone-950 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              
              {/* Contact Info */}
              <div>
                <span className="text-forest-600 dark:text-forest-400 font-semibold tracking-wide text-sm uppercase">Contato</span>
                <h2 className="font-serif text-4xl font-bold text-earth-900 dark:text-stone-100 mt-2 mb-6">Vamos Conversar?</h2>
                <p className="text-lg text-earth-800 dark:text-stone-300 mb-10 leading-relaxed">
                    Estou disponível para novas oportunidades, consultorias em engenharia florestal ou para trocar ideias sobre projetos de sustentabilidade.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="bg-white dark:bg-stone-900 p-3 rounded-full shadow-sm text-forest-600 dark:text-forest-400">
                        <MailIcon className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-bold text-earth-900 dark:text-stone-100">Email</h4>
                        <a href={`mailto:${PROFILE.email}`} className="text-earth-600 dark:text-stone-400 hover:text-forest-600 dark:hover:text-forest-400 transition-colors">
                          {PROFILE.email}
                        </a>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="bg-white dark:bg-stone-900 p-3 rounded-full shadow-sm text-forest-600 dark:text-forest-400">
                        <MapPinIcon className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-bold text-earth-900 dark:text-stone-100">Localização</h4>
                        <p className="text-earth-600 dark:text-stone-400">{PROFILE.location}</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="bg-white dark:bg-stone-900 p-3 rounded-full shadow-sm text-forest-600 dark:text-forest-400">
                        <PhoneIcon className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="font-bold text-earth-900 dark:text-stone-100">Telefone / WhatsApp</h4>
                        <p className="text-earth-600 dark:text-stone-400 mb-2">{PROFILE.phone}</p>
                        <a 
                          href={`https://wa.me/${PROFILE.phone.replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-forest-600 dark:text-forest-400 hover:underline"
                        >
                          Chamar no WhatsApp &rarr;
                        </a>
                     </div>
                  </div>
                </div>

                <div className="mt-12">
                   <h4 className="font-bold text-earth-900 dark:text-stone-100 mb-4">Redes Sociais</h4>
                   <div className="flex gap-4">
                      <a 
                        href={PROFILE.linkedinUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-forest-700 hover:bg-forest-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-transform hover:-translate-y-1 shadow-md"
                      >
                        <LinkedinIcon className="w-5 h-5" />
                        LinkedIn
                      </a>
                   </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl shadow-xl border border-earth-200 dark:border-stone-800 relative">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                   <div>
                      <label htmlFor="name" className="block text-sm font-medium text-earth-700 dark:text-stone-300 mb-1">Nome Completo</label>
                      <input 
                        required 
                        type="text" 
                        id="name"
                        className="w-full px-4 py-3 rounded-xl bg-earth-50 dark:bg-stone-800 border-transparent focus:border-forest-500 focus:bg-white dark:focus:bg-stone-800 focus:ring-2 focus:ring-forest-200 dark:focus:ring-forest-900 outline-none transition-all dark:text-white"
                        placeholder="Seu nome"
                      />
                   </div>
                   <div>
                      <label htmlFor="email" className="block text-sm font-medium text-earth-700 dark:text-stone-300 mb-1">Email</label>
                      <input 
                        required 
                        type="email" 
                        id="email"
                        className="w-full px-4 py-3 rounded-xl bg-earth-50 dark:bg-stone-800 border-transparent focus:border-forest-500 focus:bg-white dark:focus:bg-stone-800 focus:ring-2 focus:ring-forest-200 dark:focus:ring-forest-900 outline-none transition-all dark:text-white"
                        placeholder="seu@email.com"
                      />
                   </div>
                   <div>
                      <label htmlFor="message" className="block text-sm font-medium text-earth-700 dark:text-stone-300 mb-1">Mensagem</label>
                      <textarea 
                        required 
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-earth-50 dark:bg-stone-800 border-transparent focus:border-forest-500 focus:bg-white dark:focus:bg-stone-800 focus:ring-2 focus:ring-forest-200 dark:focus:ring-forest-900 outline-none transition-all dark:text-white resize-none"
                        placeholder="Olá Rafael, gostaria de falar sobre..."
                      ></textarea>
                   </div>
                   
                   <button 
                    type="submit" 
                    disabled={formStatus !== 'idle'}
                    className={`w-full py-4 rounded-xl font-bold text-white flex justify-center items-center gap-2 transition-all duration-300 ${
                        formStatus === 'success' 
                          ? 'bg-green-500' 
                          : 'bg-forest-600 hover:bg-forest-700 hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                   >
                      {formStatus === 'idle' && (
                        <>Enviar Mensagem <SendIcon className="w-5 h-5" /></>
                      )}
                      {formStatus === 'sending' && (
                        <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      )}
                      {formStatus === 'success' && (
                        <>Mensagem Enviada! <LeafIcon className="w-5 h-5" /></>
                      )}
                   </button>
                </form>
                
                {/* Decorative element */}
                <div className="absolute -top-10 -right-10 text-forest-100 dark:text-stone-800 -z-10">
                   <SproutIcon className="w-40 h-40 opacity-50 rotate-12" />
                </div>
              </div>

            </div>
          </div>
      </section>

      <footer className="py-8 text-center text-sm text-earth-500 dark:text-stone-600 bg-earth-200 dark:bg-stone-950/50">
          © {new Date().getFullYear()} {PROFILE.name}. Todos os direitos reservados.
      </footer>

      {/* Chat Bot */}
      <ChatWidget />

    </div>
  );
};

export default App;