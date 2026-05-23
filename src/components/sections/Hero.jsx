import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  FaPython,
  FaReact,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
} from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';
import { FiArrowUpRight, FiMail } from 'react-icons/fi';
import ProjectsShowcase from './ProjectsShowcase';
import ContactTerminal from './ContactTerminal';

const skills = [
  { name: 'Python', icon: <FaPython />, color: '#3776AB', orbit: 'orbit-outer', delay: '-0s' },
  { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E', orbit: 'orbit-outer', delay: '-12.5s' },
  { name: 'C++', icon: <SiCplusplus />, color: '#00599C', orbit: 'orbit-outer', delay: '-18s' },
  { name: 'React', icon: <FaReact />, color: '#61DAFB', orbit: 'orbit-middle', delay: '-5s' },
  { name: 'Java', icon: <FaJava />, color: '#f89820', orbit: 'orbit-middle', delay: '-15s' },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#68A063', orbit: 'orbit-inner', delay: '-2s' },
  { name: 'HTML', icon: <FaHtml5 />, color: '#E34F26', orbit: 'orbit-inner', delay: '-6s' },
  { name: 'CSS', icon: <FaCss3Alt />, color: '#1572B6', orbit: 'orbit-inner', delay: '-10s' },
];

const stats = [
  { value: '08+', label: 'Core technologies' },
  { value: '03', label: 'Build modes' },
  { value: '100%', label: 'Responsive focus' },
];

export default function FuturisticPortfolio() {
  const homeRef = useRef(null);
  const [homeTilt, setHomeTilt] = useState({ x: 0, y: 0, px: 0, py: 0 });

  const handleHomePointerMove = (event) => {
    if (!homeRef.current || event.pointerType === 'touch') {
      return;
    }

    const rect = homeRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setHomeTilt({
      x: Number((-y * 3.4).toFixed(2)),
      y: Number((x * 4.6).toFixed(2)),
      px: Number((x * 16).toFixed(2)),
      py: Number((y * 10).toFixed(2)),
    });
  };

  const resetHomeTilt = () => setHomeTilt({ x: 0, y: 0, px: 0, py: 0 });

  return (
    <main className="relative min-h-[100svh] bg-[#050505] font-sans text-white">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-white blur-[1px]" />
        <div className="absolute left-[5%] top-[60%] h-3 w-3 rounded-full bg-white/50 blur-[2px]" />
        <div className="absolute right-[15%] top-[30%] h-1.5 w-1.5 rounded-full bg-white blur-[1px]" />
        <div className="absolute bottom-[20%] right-[10%] h-2 w-2 rounded-full bg-white/60 blur-[1px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,102,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,102,0.03)_1px,transparent_1px)] bg-[size:100px_100px] opacity-50 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <header className="fixed left-0 right-0 top-0 z-50 px-3 py-3 sm:px-6 sm:py-6">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between rounded-xl border border-white/10 bg-[#050505]/70 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:rounded-2xl sm:px-6 sm:py-4">
          <a href="#home" className="flex items-center gap-2 sm:gap-3" aria-label="Praneet home">
            <img
              src="/logo.png"
              alt="BK Logo"
              className="h-8 w-auto object-contain mix-blend-screen drop-shadow-[0_0_15px_rgba(0,255,102,0.3)] sm:h-10"
            />
            <span className="text-base font-medium sm:ml-2 sm:text-lg">
              Praneet<span className="text-[#00FF66]">.dev</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-[#00FF66]/20 bg-[#00FF66]/10 p-1 text-xs font-medium text-[#00FF66] md:flex">
            <a href="#home" className="rounded-full px-4 py-1.5 transition-colors hover:bg-[#00FF66]/10">
              Home
            </a>
            <a href="#projects" className="rounded-full px-4 py-1.5 transition-colors hover:bg-[#00FF66]/10">
              Projects
            </a>
            <a href="#contact" className="rounded-full px-4 py-1.5 transition-colors hover:bg-[#00FF66]/10">
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="rounded-full border border-[#00FF66]/50 px-4 py-2 text-xs font-medium text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.1)] transition-colors hover:bg-[#00FF66]/10 sm:px-6 sm:text-sm"
          >
            Contact Me
          </a>
        </nav>
      </header>

      <section
        id="home"
        ref={homeRef}
        onPointerMove={handleHomePointerMove}
        onPointerLeave={resetHomeTilt}
        className="home-scene relative z-10 mx-auto grid min-h-[100svh] max-w-[1400px] items-center gap-4 overflow-visible px-4 pb-10 pt-24 sm:gap-7 sm:px-6 sm:pb-12 sm:pt-[7.5rem] lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-8 lg:overflow-hidden lg:pb-6 lg:pt-[6.5rem]"
        style={{
          '--home-tilt-x': `${homeTilt.x}deg`,
          '--home-tilt-y': `${homeTilt.y}deg`,
          '--home-parallax-x': `${homeTilt.px}px`,
          '--home-parallax-y': `${homeTilt.py}px`,
        }}
      >
        <div className="home-depth-grid pointer-events-none absolute inset-0 z-0" />
        <div className="home-scanline pointer-events-none absolute inset-x-8 bottom-[9%] z-0 h-px" />

        <div className="home-copy-3d relative z-20 flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center justify-center gap-3 sm:mb-6 lg:justify-start"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00FF66] sm:text-sm sm:tracking-[0.2em]">
              Hello, I'm Praneet
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] shadow-[0_0_8px_#00FF66]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="home-headline mb-4 max-w-[820px] text-[42px] font-bold leading-[1.04] tracking-normal sm:mb-5 sm:text-6xl md:text-7xl"
          >
            I build
            <br />
            <span className="text-[#00FF66] drop-shadow-[0_0_20px_rgba(0,255,102,0.3)]">
              futuristic
            </span>
            <br />
            web experiences.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="home-intro mb-7 max-w-md text-base leading-relaxed text-gray-400 sm:mb-8 sm:text-lg"
          >
            A full-stack developer focused on immersive interfaces, clean logic, and high-performance web experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="home-actions mb-7 flex w-full flex-col gap-3 sm:mb-8 sm:w-auto sm:flex-row sm:gap-4"
          >
            <a
              href="#contact"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#00FF66] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(0,255,102,0.3)] transition-all hover:shadow-[0_0_40px_rgba(0,255,102,0.5)] sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            >
              <FiMail className="text-lg" />
              Contact Me
              <FiArrowUpRight className="text-lg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="home-stat-panel grid w-full max-w-md grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="border-r border-white/10 px-3 py-4 last:border-r-0 sm:px-5">
                <p className="text-lg font-bold text-white sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-gray-500 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="home-orbit-3d relative right-0 mt-4 flex min-h-[340px] items-center justify-center sm:mt-7 sm:min-h-[500px] lg:mt-0 lg:min-h-0">
          <div className="absolute h-[240px] w-[240px] rounded-full bg-[#00FF66]/10 blur-[90px] sm:h-[400px] sm:w-[400px] sm:blur-[120px]" />

          <div className="home-stage relative flex aspect-square w-[78vw] max-w-[340px] items-center justify-center sm:max-w-[500px] md:max-w-[560px] lg:w-full lg:max-w-[580px]">
            <div className="orbit-ring z-0 h-full w-full border-[#00FF66]/20 shadow-[0_0_30px_rgba(0,255,102,0.05),inset_0_0_30px_rgba(0,255,102,0.05)]" />
            <div className="orbit-ring z-0 h-[70%] w-[70%] border-[#00FF66]/30 shadow-[0_0_20px_rgba(0,255,102,0.08)]" />
            <div className="orbit-ring z-0 h-[45%] w-[45%] border-[#00FF66]/40 shadow-[0_0_15px_rgba(0,255,102,0.1)]" />

            <div className="absolute bottom-[5%] z-[5] h-[15%] w-[80%] rounded-[100%] border-2 border-[#00FF66]/40 shadow-[0_0_30px_rgba(0,255,102,0.5)] blur-[1px]" />
            <div className="absolute bottom-[8%] z-[5] h-[10%] w-[60%] rounded-[100%] border-2 border-[#00FF66]/60 shadow-[0_0_20px_rgba(0,255,102,0.8)]" />
            <div className="absolute bottom-[10%] z-[5] h-[5%] w-[40%] rounded-[100%] bg-[#00FF66]/20 blur-md" />

            <motion.div
              className="home-avatar-depth relative z-20 flex h-[58%] w-[58%] items-center justify-center"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/avatar.png"
                alt="Praneet avatar"
                className="home-avatar-image relative z-20 h-full w-full object-contain drop-shadow-[0_0_50px_rgba(0,255,102,0.1)]"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            </motion.div>

            {skills.map((skill, index) => (
              <div
                key={index}
                className={`skill-track home-skill-depth absolute left-0 top-0 h-full w-full ${skill.orbit}`}
                style={{ animationDelay: skill.delay }}
              >
                <div className="skill-item">
                  <div
                    className="skill-icon-wrapper group flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                    style={{ animationDelay: skill.delay }}
                    role="img"
                    aria-label={skill.name}
                    title={skill.name}
                  >
                    <div
                      className="text-[30px] transition-transform duration-300 group-hover:scale-125 sm:text-[38px] lg:text-[44px]"
                      style={{
                        color: skill.color,
                        filter: `drop-shadow(0 0 14px ${skill.color}66)`,
                      }}
                    >
                      {skill.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pointer-events-none absolute bottom-[-10%] left-1/2 z-[15] h-[42%] w-[108%] -translate-x-1/2">
              <div className="absolute bottom-0 left-1/2 h-[34%] w-[68%] -translate-x-1/2 bg-[#050505] shadow-[0_-18px_40px_rgba(5,5,5,0.95)]" />
              <div className="absolute left-1/2 top-[8%] h-[84%] w-full -translate-x-1/2 rounded-[100%] bg-[#050505] shadow-[0_-18px_42px_rgba(5,5,5,0.98),inset_0_0_52px_rgba(0,255,102,0.08)]" />
              <div className="absolute left-1/2 top-[27%] h-[44%] w-[80%] -translate-x-1/2 rounded-[100%] bg-[#050505] shadow-[0_-10px_26px_rgba(5,5,5,0.98),inset_0_0_45px_rgba(0,255,102,0.1)]" />
              <div className="absolute left-1/2 top-[23%] h-[50%] w-[82%] -translate-x-1/2 rounded-[100%] border-2 border-[#00FF66]/45 shadow-[0_0_30px_rgba(0,255,102,0.65),inset_0_0_28px_rgba(0,255,102,0.16)]" />
              <div className="absolute left-1/2 top-[34%] h-[34%] w-[64%] -translate-x-1/2 rounded-[100%] border-2 border-[#00FF66]/70 bg-[#050505] shadow-[0_0_24px_rgba(0,255,102,0.75),inset_0_0_22px_rgba(0,255,102,0.18)]" />
              <div className="absolute left-1/2 top-[46%] h-[26%] w-[52%] -translate-x-1/2 rounded-[100%] bg-[#00FF66]/18 blur-md" />
            </div>
          </div>
        </div>
      </section>

      <ProjectsShowcase />
      <ContactTerminal />

      <style>{`
        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        .home-headline {
          font-size: 2.625rem;
        }

        .home-scene {
          perspective: 1500px;
          transform-style: preserve-3d;
        }

        .home-depth-grid {
          opacity: 0.42;
          background-image:
            linear-gradient(rgba(0, 255, 102, 0.075) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.055) 1px, transparent 1px);
          background-size: 88px 88px;
          transform: translate3d(calc(var(--home-parallax-x) * -0.18), calc(var(--home-parallax-y) * -0.14), -90px) rotateX(64deg);
          transform-origin: center bottom;
          mask-image: radial-gradient(ellipse 76% 68% at 50% 52%, #000 24%, transparent 100%);
        }

        .home-scanline {
          background: linear-gradient(90deg, transparent, rgba(0, 255, 102, 0.42), rgba(34, 211, 238, 0.34), transparent);
          box-shadow: 0 0 28px rgba(0, 255, 102, 0.28);
          transform: translate3d(calc(var(--home-parallax-x) * -0.22), calc(var(--home-parallax-y) * -0.1), -30px);
        }

        .home-copy-3d {
          transform: perspective(1500px) rotateX(calc(var(--home-tilt-x) * 0.26)) rotateY(calc(var(--home-tilt-y) * -0.24)) translate3d(calc(var(--home-parallax-x) * 0.1), calc(var(--home-parallax-y) * 0.1), 20px);
          transform-origin: center center;
          transform-style: preserve-3d;
          transition: transform 180ms ease-out;
          will-change: transform;
        }

        .home-stat-panel {
          transform: translateZ(46px);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24), inset 0 0 24px rgba(0, 255, 102, 0.055);
        }

        .home-orbit-3d {
          transform: translate3d(calc(var(--home-parallax-x) * -0.08), calc(var(--home-parallax-y) * -0.06), 0);
          transform-style: flat;
          transition: transform 180ms ease-out;
          will-change: transform;
        }

        .home-stage {
          transform-style: flat;
        }

        .home-avatar-image {
          transform: none;
          filter: drop-shadow(0 34px 36px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 28px rgba(0, 255, 102, 0.14));
        }

        .orbit-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 50%;
          border-width: 1.5px;
          border-style: solid;
          transform: translate(-50%, -50%);
        }

        .skill-track {
          animation: spin linear infinite;
          z-index: 10;
        }

        .orbit-outer { animation-duration: 35s; width: 100%; height: 100%; top: 0%; left: 0%; }
        .orbit-middle { animation-duration: 25s; width: 70%; height: 70%; top: 15%; left: 15%; }
        .orbit-inner { animation-duration: 15s; width: 45%; height: 45%; top: 27.5%; left: 27.5%; }

        .skill-item {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
        }

        .skill-icon-wrapper {
          animation: spin-reverse linear infinite;
        }

        .orbit-outer .skill-icon-wrapper { animation-duration: 35s; }
        .orbit-middle .skill-icon-wrapper { animation-duration: 25s; }
        .orbit-inner .skill-icon-wrapper { animation-duration: 15s; }

        @media (min-width: 640px) {
          .home-headline {
            font-size: 3.75rem;
          }

          .skill-item {
            top: -24px;
          }
        }

        @media (min-width: 768px) {
          .home-headline {
            font-size: 4.5rem;
          }
        }

        @media (min-width: 1024px) {
          .home-headline {
            font-size: 4.25rem;
            line-height: 0.99;
          }

          .home-orbit-3d {
            min-height: min(67svh, 640px);
          }

          .home-stage {
            max-width: min(38vw, 540px, calc(100svh - 10rem));
          }

          .skill-item {
            top: -28px;
          }
        }

        @media (min-width: 1280px) {
          .home-headline {
            font-size: 4.5rem;
          }
        }

        @media (min-width: 1536px) {
          .home-headline {
            font-size: 4.75rem;
          }
        }

        @media (min-width: 1024px) and (max-height: 850px) {
          .home-scene {
            padding-top: 5.8rem;
            padding-bottom: 1.25rem;
          }

          .home-stage {
            max-width: min(36vw, 470px, calc(100svh - 9rem)) !important;
          }

          .home-orbit-3d {
            min-height: min(61svh, 520px);
          }
        }

        @media (min-width: 1024px) and (max-height: 760px) {
          .home-headline {
            font-size: 3.75rem;
          }

          .home-intro,
          .home-actions {
            margin-bottom: 1.25rem;
          }

          .home-stat-panel > div {
            padding-top: 0.85rem;
            padding-bottom: 0.85rem;
          }

          .home-stage {
            max-width: min(35vw, 440px, calc(100svh - 9rem)) !important;
          }

          .home-orbit-3d {
            min-height: min(58svh, 470px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-depth-grid,
          .home-scanline,
          .home-copy-3d,
          .home-orbit-3d,
          .home-avatar-image,
          .orbit-ring {
            transform: none !important;
            transition: none !important;
          }

          .skill-track,
          .skill-icon-wrapper {
            animation-duration: 0.001ms;
            animation-iteration-count: 1;
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </main>
  );
}
