import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Cpu,
  Database,
  Home,
  Lock,
  Landmark,
  Mail,
  MousePointer2,
  Play,
  User,
  Zap,
} from "lucide-react";
import {
  PORTFOLIO_PALETTES,
  TubesBackground,
  type TubesPalette,
} from "./components/TubesBackground";
import { PrecisionCursor } from "./components/PrecisionCursor";

const LUMINA_EASE = [0.19, 1, 0.22, 1] as const;

const revealUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, delay, ease: LUMINA_EASE },
});

const scrollReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 1.2, delay, ease: LUMINA_EASE },
});

interface Project {
  title: string;
  category: string;
  description: string;
  url: string;
  badge: string;
  accent: string;
  icon: "bmi" | "auth" | "ledger";
  image: string;
}

const PROJECTS: Project[] = [
  {
    title: "BMI Calculator App",
    category: "WEB APP · HEALTH METRICS",
    description:
      "Clean, responsive body mass index calculator engineered for instant client-side feedback.",
    url: "https://hamza-akbar-0327.netlify.app/",
    badge: "BMI CALCULATOR",
    accent: "from-[#141414] via-[#1c1a15] to-[#0a0a0a]",
    icon: "bmi",
    image: "/images/projects/bmi-calculator.svg",
  },
  {
    title: "Complete Auth System",
    category: "BACKEND · SECURITY API",
    description:
      "Production-grade authentication architecture with tokens, sessions, and a Postman API collection.",
    url: "https://hamza-akbar.up.railway.app/test",
    badge: "AUTH API SYSTEM",
    accent: "from-[#12101a] via-[#1b1626] to-[#09090d]",
    icon: "auth",
    image: "/images/projects/auth-system.svg",
  },
  {
    title: "Banking Ledger System",
    category: "BACKEND · FINTECH CORE",
    description:
      "Transactional banking ledger engine with verifiable balances and Postman API documentation.",
    url: "https://bano-qabil-backend-production.up.railway.app/",
    badge: "BANKING LEDGER",
    accent: "from-[#18130a] via-[#21180b] to-[#090909]",
    icon: "ledger",
    image: "/images/projects/banking-ledger.svg",
  },
];

export function App() {
  const [activePalette, setActivePalette] = useState<TubesPalette>(
    PORTFOLIO_PALETTES[0]
  );

  return (
    <LazyMotion features={domAnimation} strict>
    <TubesBackground onPaletteChange={setActivePalette}>
      <PrecisionCursor />

      {/* ==================== FIXED TOP NAVIGATION ==================== */}
      <m.header
        {...revealUp(0.05)}
        className="fixed top-0 left-0 z-50 w-full px-6 md:px-12 py-6 flex items-center justify-between bg-gradient-to-b from-[#080808]/90 via-[#080808]/55 to-transparent backdrop-blur-md"
      >
        {/* Left: Rotated 45deg Diamond Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-4"
          aria-label="Hamza Akbar Home"
        >
          <span className="w-8 h-8 border border-[#c5a059] rotate-45 flex items-center justify-center text-[#c5a059] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:bg-[#c5a059] group-hover:text-black group-hover:shadow-[0_0_24px_rgba(197,160,89,0.35)]">
            <Zap className="w-3.5 h-3.5 -rotate-45" />
          </span>
          <span className="hidden sm:inline-block font-[Public_Sans] text-[10px] font-semibold tracking-[0.28em] text-[#888888] group-hover:text-white transition-colors duration-500">
            HAMZA AKBAR
          </span>
        </a>

        {/* Center: Desktop Ultra-small Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-[Public_Sans] text-[10px] font-semibold tracking-[0.25em] text-[#888888]">
          {[
            { label: "HOME", href: "#hero" },
            { label: "ABOUT", href: "#about" },
            { label: "SKILLS", href: "#skills" },
            { label: "WORK", href: "#work" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-white transition-colors duration-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#c5a059] hover:after:w-full after:transition-all after:duration-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Persistent border-b CONTACT + Invert Button */}
        <div className="flex items-center gap-6">
          <a
            href="#contact"
            className="font-[Public_Sans] text-[10px] font-semibold tracking-[0.25em] text-[#EBEBEB] border-b border-white/30 pb-0.5 hover:text-[#c5a059] hover:border-[#c5a059] transition-colors duration-500"
          >
            CONTACT
          </a>
          <a
            href="#work"
            className="hidden sm:inline-flex items-center px-5 py-2.5 border border-[#333333] bg-[#1A1A1A] text-white font-[Public_Sans] text-[10px] font-bold tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
          >
            VIEW WORK
          </a>
        </div>
      </m.header>

      {/* ==================== HERO SECTION ==================== */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-between pt-28 pb-8 px-6 md:px-12"
      >
        <div className="my-auto mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center py-8">
          {/* Hero Core */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <m.div
              {...revealUp(0.15)}
              className="flex items-center gap-4 font-[Public_Sans] text-[10px] md:text-[11px] font-semibold tracking-[0.3em] text-[#c5a059] uppercase mb-7"
            >
              <span className="w-10 h-px bg-[#c5a059]" />
              <span>FULL STACK DEVELOPER</span>
            </m.div>

            <m.h1
              {...revealUp(0.3)}
              className="tracking-[-0.05em] leading-[0.86] mb-7 select-none"
            >
              <span className="block font-[Space_Grotesk] font-light text-[clamp(4rem,10vw,7.5rem)] text-white drop-shadow-[0_12px_36px_rgba(0,0,0,0.85)]">
                HAMZA
              </span>
              <span className="block font-[Crimson_Pro] font-extralight italic text-[clamp(4rem,10vw,7.5rem)] text-[#e8d0a3] drop-shadow-[0_12px_36px_rgba(0,0,0,0.85)]">
                Akbar
              </span>
            </m.h1>

            <m.p
              {...revealUp(0.45)}
              className="font-[Crimson_Pro] font-extralight italic text-xl md:text-2xl leading-relaxed text-white/60 max-w-xl mb-10"
            >
              Full stack developer and Node.js backend developer, trained at
              Bano Qabil Institute. I build modern, responsive React interfaces
              and secure REST APIs from authentication systems.
            </m.p>

            {/* CTA Row: Solid Sharp Gold Button + Ghost Video/Interaction Button */}
            <m.div
              {...revealUp(0.6)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5"
            >
              <a
                href="#work"
                className="btn-gold-sharp inline-flex items-center gap-3 px-9 py-4 uppercase"
              >
                <span>EXPLORE WORK</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-3.5 px-6 py-3.5 border border-white/10 bg-white/[0.02] backdrop-blur-md text-white font-[Public_Sans] text-[11px] font-semibold tracking-[0.2em] uppercase hover:border-[#c5a059] hover:text-[#c5a059] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
              >
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#c5a059] group-hover:bg-[#c5a059]/10 transition-all duration-500">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                <span>GET IN TOUCH</span>
              </a>
            </m.div>
          </div>

          {/* Side Portrait */}
          <m.div
            {...revealUp(0.5)}
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
          >
            <div className="relative w-72 sm:w-80">
              <div className="group relative aspect-[4/5] overflow-hidden border border-[#c5a059]/25 bg-[#0e0e0e] transition-colors duration-700 hover:border-[#c5a059]">
                <img
                  src="/images/hamza-profile.webp"
                  srcSet="/images/hamza-profile-320.webp 320w, /images/hamza-profile.webp 640w"
                  sizes="(min-width: 640px) 320px, 288px"
                  alt="Hamza Akbar"
                  width={640}
                  height={853}
                  decoding="async"
                  className="w-full h-full object-cover object-top opacity-75 grayscale-[55%] transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between font-[Public_Sans] text-[10px] tracking-[0.2em] text-white/70">
                  <span>CS · INTERMEDIATE </span>
                  <span className="text-[#c5a059]">PAKISTAN</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between font-[Public_Sans] text-[10px] font-semibold tracking-[0.22em] text-[#888888]">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B50] animate-pulse" />
                  AVAILABLE FOR WORK
                </span>
                <span className="text-white/55">SIRAJ-UD-DULA COLLEGE</span>
              </div>
            </div>
          </m.div>
        </div>

        {/* Technical Hero Footer */}
        <m.div
          {...revealUp(0.75)}
          className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5"
        >
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <div className="flex items-center gap-3 font-[Public_Sans] text-[10px] font-semibold tracking-[0.28em] text-[#EBEBEB]">
              <span className="w-6 h-px bg-[#c5a059]" />
              <span>SENSORY ENGINE ACTIVE</span>
              <span className="text-[#c5a059]">· {activePalette.name}</span>
            </div>
            <p className="inline-flex items-center gap-2 font-[Public_Sans] text-[10px] tracking-[0.2em] text-white/50 md:pl-9 uppercase">
              <MousePointer2 className="w-3 h-3 text-[#c5a059]" />
              Move cursor to view 3D tubes · Click anywhere to shift palette
            </p>
          </div>

          <div className="flex items-center gap-4 font-[Public_Sans] text-[10px] font-semibold tracking-[0.22em] text-[#888888]">
            <a
              href="https://github.com/hamzamaheer80-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c5a059] transition-colors duration-500"
            >
              GITHUB
            </a>
            <span className="w-12 h-px bg-[#333333]" />
            <a
              href="https://www.linkedin.com/in/hamza-akbar-955450451/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c5a059] transition-colors duration-500"
            >
              LINKEDIN
            </a>
            <span className="w-12 h-px bg-[#333333]" />
            <a
              href="mailto:hamzamaheer80@gmail.com"
              className="inline-flex items-center gap-1.5 hover:text-[#c5a059] transition-colors duration-500"
            >
              <span>EMAIL</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </m.div>
      </section>

      {/* ==================== ABOUT & EDUCATION ==================== */}
      <section id="about" className="py-28 md:py-36 px-6 md:px-12 scroll-mt-20">
        <div className="mx-auto max-w-6xl">
          <m.div
            {...scrollReveal()}
            className="flex items-center gap-4 font-[Public_Sans] text-[10px] font-semibold tracking-[0.3em] text-[#c5a059] uppercase mb-14"
          >
            <span className="w-10 h-px bg-[#c5a059]" />
            <span>01 · ABOUT & EDUCATION</span>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <m.div {...scrollReveal(0.1)} className="lg:col-span-6">
              <h2 className="font-[Space_Grotesk] font-light text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] leading-[0.95] mb-8">
                Building{" "}
                <em className="font-[Crimson_Pro] font-extralight italic text-[#e8d0a3]">
                  intelligent
                </em>
                <br />
                web systems.
              </h2>
              <p className="font-[Crimson_Pro] font-light text-xl leading-relaxed text-white/55">
                I&apos;m Hamza Akbar, 17 years old a student of 11th Class Computer Science
                at Siraj-ud-Dula Govt Degree College. Alongside my studies I
                trained at Bano Qabil Institute, where I learned full stack
                development with AI and backend development with Node.js.
              </p>
              <p className="mt-5 font-[Crimson_Pro] font-light text-xl leading-relaxed text-white/55">
                I enjoy turning ideas into working products designing clean,
                responsive interfaces in React and Tailwind, then wiring them to
                secure REST APIs built with Express and MongoDB, using AI tools
                to move faster from prototype to launch.
              </p>
            </m.div>

            <m.div
              {...scrollReveal(0.2)}
              className="lg:col-span-6 grid gap-4"
            >
              {[
                {
                  label: "NAME",
                  title: "Hamza Akbar",
                  sub: "Full Stack & Backend Developer · Pakistan",
                },
                {
                  label: "EDUCATION",
                  title: "11th Class — Computer Science",
                  sub: "Siraj-ud-Dula Govt Degree College",
                },
                {
                  label: "SKILLS · BANO QABIL INSTITUTE",
                  title: "Full Stack Developer with AI · Backend Developer",
                  sub: "React UI, Node.js & Express REST APIs, MongoDB, AI-assisted workflows",
                },
                {
                  label: "DIRECT CONTACT",
                  title: "hamzamaheer80@gmail.com",
                  sub: "+92 327 8450810 · Open for freelance & collaboration",
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="glass-lumina p-6 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-[#c5a059]/30 hover:-translate-y-0.5"
                >
                  <div className="font-[Public_Sans] text-[10px] font-semibold tracking-[0.28em] text-[#c5a059] mb-2">
                    {card.label}
                  </div>
                  <div className="font-[Space_Grotesk] text-lg text-white mb-1">
                    {card.title}
                  </div>
                  <div className="font-[Crimson_Pro] italic text-sm text-[#888888]">
                    {card.sub}
                  </div>
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </section>

      {/* ==================== SKILLS BENTO GRID ==================== */}
      <section
        id="skills"
        className="py-20 md:py-28 px-6 md:px-12 scroll-mt-20"
      >
        <div className="mx-auto max-w-6xl">
          <m.div
            {...scrollReveal()}
            className="flex items-center gap-4 font-[Public_Sans] text-[10px] font-semibold tracking-[0.3em] text-[#c5a059] uppercase mb-14"
          >
            <span className="w-10 h-px bg-[#c5a059]" />
            <span>02 · CAPABILITIES & STACK</span>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column 1: #111111 Bento Card */}
            <m.div
              {...scrollReveal(0.1)}
              className="relative rounded-3xl bg-[#111111]/90 border border-white/5 p-8 sm:p-12 flex flex-col justify-between min-h-[340px] backdrop-blur-xl transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-1"
            >
              {/* Floating Skewed Coral Badge */}
              <div className="animate-float-badge self-end mb-4 bg-[#FF6B50] text-black font-[Space_Grotesk] font-black italic text-xs tracking-wider px-6 py-2 rounded-lg shadow-[0_10px_30px_rgba(255,107,80,0.35)]">
                FULL STACK + AI!
              </div>

              <div>
                <span className="font-[Public_Sans] text-[10px] font-semibold tracking-[0.25em] text-[#666666] uppercase">
                  FRONTEND ARCHITECTURE
                </span>
                <h3 className="mt-4 font-[Space_Grotesk] font-medium text-5xl sm:text-6xl tracking-[-0.04em] leading-[0.9] text-white">
                  Pixel
                  <br />
                  <span className="text-[#888888]">Precision.</span>
                </h3>
                <p className="mt-4 font-[Crimson_Pro] italic text-base text-white/60">
                  Modern, responsive UI with clean layouts, smooth animations
                  and reusable components, built mobile-first for every screen.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React.js",
                  "Tailwind CSS",
                  "Framer Motion",
                  "Responsive Design",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-1.5 rounded-full border border-white/10 font-[Public_Sans] text-[10px] font-semibold tracking-[0.15em] text-[#EBEBEB] hover:border-[#c5a059] hover:text-[#c5a059] transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </m.div>

            {/* Column 2: Gradient Card + Floating Skewed Coral Badge */}
            <m.div
              {...scrollReveal(0.2)}
              className="relative rounded-3xl bg-gradient-to-br from-emerald-950/80 via-[#0d1f2d]/85 to-slate-950/90 border border-[#c5a059]/15 p-8 sm:p-12 flex flex-col justify-between min-h-[340px] backdrop-blur-xl overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-1"
            >
              <div>
                <span className="font-[Public_Sans] text-[10px] font-semibold tracking-[0.25em] text-[#e8d0a3]/70 uppercase">
                  BACKEND & DATA SYSTEMS
                </span>
                <h3 className="mt-3 font-[Space_Grotesk] font-medium text-4xl sm:text-5xl tracking-[-0.04em] leading-[0.95] text-white">
                  Scalable <span className="text-[#c5a059]">APIs.</span>
                </h3>
                <p className="mt-3 font-[Crimson_Pro] italic text-base text-white/60">
                  Secure, scalable REST APIs with JWT authentication, protected
                  routes, input validation and AI-assisted rapid prototyping.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Node.js", "Express.js", "MongoDB", "REST APIs"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-4 py-1.5 rounded-full border border-white/15 bg-black/25 font-[Public_Sans] text-[10px] font-semibold tracking-[0.15em] text-white hover:border-[#FF6B50] transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </m.div>

            {/* AI Tooling Card */}
            <m.div
              {...scrollReveal(0.25)}
              className="glass-lumina rounded-3xl p-8 flex items-start justify-between gap-6 hover:border-[#c5a059]/30 transition-all duration-500"
            >
              <div>
                <span className="font-[Public_Sans] text-[10px] font-semibold tracking-[0.25em] text-[#c5a059]">
                  ADDITIONAL SKILLS
                </span>
                <div className="mt-2 font-[Space_Grotesk] text-2xl text-white">
                  AI Coding &amp; Design Tools
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Claude Code",
                    "Codex",
                    "Google Antigravity",
                    "Google Stitch",
                    "Google AI Studio",
                  ].map((tool) => (
                    <span
                      key={tool}
                      className="px-3.5 py-1.5 rounded-full border border-white/10 font-[Public_Sans] text-[10px] font-semibold tracking-[0.12em] text-[#EBEBEB] hover:border-[#c5a059] hover:text-[#c5a059] transition-colors duration-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <Cpu className="w-8 h-8 text-[#c5a059] shrink-0" />
            </m.div>

            {/* Database & API Testing Card */}
            <m.div
              {...scrollReveal(0.3)}
              className="glass-lumina rounded-3xl p-8 flex items-center justify-between gap-6 hover:border-[#FF6B50]/30 transition-all duration-500"
            >
              <div>
                <span className="font-[Public_Sans] text-[10px] font-semibold tracking-[0.25em] text-[#FF6B50]">
                  API VERIFICATION & STORAGE
                </span>
                <div className="mt-2 font-[Space_Grotesk] text-2xl text-white">
                  MongoDB · Supabase · REST APIs · Postman Collections
                </div>
              </div>
              <Database className="w-8 h-8 text-[#FF6B50] shrink-0" />
            </m.div>
          </div>
        </div>
      </section>

      {/* ==================== STAGGERED WORK GALLERY ==================== */}
      <section id="work" className="py-20 md:py-28 px-6 md:px-12 scroll-mt-20">
        <div className="mx-auto max-w-6xl">
          <m.div
            {...scrollReveal()}
            className="flex items-center gap-4 font-[Public_Sans] text-[10px] font-semibold tracking-[0.3em] text-[#c5a059] uppercase mb-14"
          >
            <span className="w-10 h-px bg-[#c5a059]" />
            <span>03 · SELECTED WORK</span>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-8">
              <ProjectCard project={PROJECTS[0]} delay={0.1} />
              <ProjectCard project={PROJECTS[2]} delay={0.2} />
            </div>

            {/* Column 2 (Staggered md:mt-24) */}
            <div className="flex flex-col gap-8 md:mt-24">
              <ProjectCard project={PROJECTS[1]} delay={0.15} />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== IMPACT FOOTER ==================== */}
      <footer
        id="contact"
        className="pt-28 pb-36 px-6 md:px-12 border-t border-white/5 scroll-mt-20"
      >
        <div className="mx-auto max-w-6xl">
          <m.div {...scrollReveal()} className="mb-16 select-none">
            <div className="font-[Space_Grotesk] font-light text-[clamp(3.25rem,13.5vw,11rem)] tracking-[-0.05em] leading-[0.85] text-white">
              CRAFT
            </div>
            <div className="font-[Space_Grotesk] font-light text-[clamp(3.25rem,13.5vw,11rem)] tracking-[-0.05em] leading-[0.85] text-white">
              MORE<span className="text-[#FF6B50]">.</span>
            </div>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5">
            {/* Left: Contact Info + Socials */}
            <div className="lg:col-span-5 flex flex-col gap-10">
            {/* Vertical Contact Stack */}
            <m.div {...scrollReveal(0.1)} className="flex flex-col gap-6">
              <div>
                <span className="block font-[Public_Sans] text-[10px] font-semibold tracking-[0.25em] text-[#666666] mb-1">
                  EMAIL
                </span>
                <a
                  href="mailto:hamzamaheer80@gmail.com"
                  className="inline-block font-[Space_Grotesk] text-lg md:text-xl text-[#EBEBEB] border-b border-white/20 pb-0.5 hover:text-[#FF6B50] hover:border-[#FF6B50] transition-colors duration-300"
                >
                  hamzamaheer80@gmail.com
                </a>
              </div>

              <div>
                <span className="block font-[Public_Sans] text-[10px] font-semibold tracking-[0.25em] text-[#666666] mb-1">
                  PHONE
                </span>
                <a
                  href="tel:+923278450810"
                  className="font-[Space_Grotesk] text-lg md:text-xl text-[#EBEBEB] hover:text-[#c5a059] transition-colors duration-300"
                >
                  03278450810
                </a>
              </div>

              <div>
                <span className="block font-[Public_Sans] text-[10px] font-semibold tracking-[0.25em] text-[#666666] mb-1">
                  EDUCATION
                </span>
                <span className="font-[Crimson_Pro] italic text-lg text-white/70">
                  11th Class Computer Science · Siraj-ud-Dula Govt Degree College
                </span>
              </div>
            </m.div>

            {/* Circular 56px Social Icons */}
            <m.div {...scrollReveal(0.2)} className="flex items-center gap-4">
              <a
                href="https://github.com/hamzamaheer80-debug"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-14 h-14 rounded-full border border-[#333333] flex items-center justify-center text-[#EBEBEB] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-2 hover:bg-white hover:text-black hover:border-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/hamza-akbar-955450451/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-14 h-14 rounded-full border border-[#333333] flex items-center justify-center text-[#EBEBEB] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-2 hover:bg-white hover:text-black hover:border-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/hamza_.akbar?fqnt=MTh0MG9pdnJ4MTdtOQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-14 h-14 rounded-full border border-[#333333] flex items-center justify-center text-[#EBEBEB] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-2 hover:bg-white hover:text-black hover:border-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.41-11.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
                </svg>
              </a>
            </m.div>
            </div>

            {/* Right: Contact Form */}
            <m.div {...scrollReveal(0.25)} className="lg:col-span-7">
              <ContactForm />
            </m.div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-[Public_Sans] text-[10px] font-semibold tracking-[0.22em] text-[#8a8a8a]">
            <span>HAMZA AKBAR</span>
            <span>LUMINA × MIDNIGHT EDITORIAL</span>
          </div>
        </div>
      </footer>

      {/* ==================== FLOATING BOTTOM DOCK ==================== */}
      <m.nav
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.9, ease: LUMINA_EASE }}
        aria-label="Quick navigation dock"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-dock rounded-2xl p-2 flex items-center gap-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        {[
          { href: "#hero", label: "Home", icon: Home },
          { href: "#about", label: "About", icon: User },
          { href: "#skills", label: "Skills", icon: Code2 },
          { href: "#work", label: "Work", icon: Briefcase },
        ].map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            aria-label={label}
            className="p-3 rounded-xl text-[#888888] hover:bg-[#222222] hover:text-white transition-all duration-300"
          >
            <Icon className="w-4 h-4" />
          </a>
        ))}

        <span className="w-px h-6 bg-[#333333] mx-1" />

        <a
          href="#contact"
          aria-label="Contact"
          className="p-3 rounded-xl text-[#888888] hover:bg-[#222222] hover:text-white transition-all duration-300"
        >
          <Mail className="w-4 h-4" />
        </a>

        <a
          href="mailto:hamzamaheer80@gmail.com"
          className="ml-1 px-5 py-3 rounded-xl bg-[#FF6B50] text-black font-[Public_Sans] text-[11px] font-bold uppercase tracking-wider hover:bg-[#ff8570] transition-all duration-300"
        >
          HIRE ME
        </a>
      </m.nav>
    </TubesBackground>
    </LazyMotion>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setSent(false);
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:hamzamaheer80@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const fieldClass =
    "w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 font-[Space_Grotesk] text-base text-white placeholder:text-white/25 outline-none transition-colors duration-300 focus:border-[#c5a059] focus:bg-black/50";
  const labelClass =
    "block font-[Public_Sans] text-[10px] font-semibold tracking-[0.25em] text-[#666666] mb-2";

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-lumina rounded-3xl p-7 sm:p-10 flex flex-col gap-5"
    >
      <div>
        <span className="font-[Public_Sans] text-[10px] font-semibold tracking-[0.28em] text-[#c5a059]">
          LET&apos;S CONNECT
        </span>
        <h3 className="mt-2 font-[Space_Grotesk] font-light text-3xl sm:text-4xl tracking-[-0.03em] text-white">
          Send me a{" "}
          <em className="font-[Crimson_Pro] font-extralight italic text-[#e8d0a3]">
            message
          </em>
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label>
          <span className={labelClass}>NAME</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            maxLength={80}
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </label>
        <label>
          <span className={labelClass}>EMAIL</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            maxLength={120}
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClass}
          />
        </label>
      </div>

      <label>
        <span className={labelClass}>DESCRIPTION</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          maxLength={2000}
          placeholder="Tell me about your project or idea..."
          className={`${fieldClass} resize-none`}
        />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="submit"
          className="btn-gold-sharp inline-flex items-center gap-3 px-9 py-4 uppercase"
        >
          <span>SEND MESSAGE</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
        {sent && (
          <span className="font-[Crimson_Pro] italic text-base text-[#e8d0a3]">
            Opening your email app — thanks for reaching out!
          </span>
        )}
      </div>
    </form>
  );
}

function ProjectCard({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  const Icon =
    project.icon === "auth"
      ? Lock
      : project.icon === "ledger"
      ? Landmark
      : Cpu;

  return (
    <m.a
      {...scrollReveal(delay)}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border border-white/5 bg-[#111111]/85 backdrop-blur-xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:border-[#c5a059]/30"
    >
      <div className="relative aspect-video overflow-hidden">
        <div
          className={`w-full h-full bg-gradient-to-br ${project.accent} transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] opacity-80 grayscale-[40%] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105`}
        >
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <span className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md font-[Public_Sans] text-[9px] font-bold tracking-[0.24em] text-white/80">
          <Icon className="w-3 h-3 text-[#c5a059]" strokeWidth={2} />
          {project.badge}
        </span>

        <span className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/15 bg-black/60 flex items-center justify-center text-white/70 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:bg-[#c5a059] group-hover:text-black group-hover:border-[#c5a059]">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>

      <div className="p-7">
        <span className="block font-[Public_Sans] text-[10px] font-bold tracking-[0.2em] text-[#666666] mb-2">
          {project.category}
        </span>
        <h3 className="font-[Space_Grotesk] text-2xl sm:text-3xl font-bold text-white group-hover:text-[#c5a059] transition-colors duration-500">
          {project.title}
        </h3>
        <p className="mt-2 font-[Crimson_Pro] italic text-base text-[#888888] leading-relaxed">
          {project.description}
        </p>
      </div>
    </m.a>
  );
}

export default App;
