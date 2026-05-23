import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiGithub, FiRadio, FiZap } from 'react-icons/fi';

const projects = [
  {
    id: 'redmagic-showcase',
    channel: '01',
    title: 'REDMAGIC 3D Showcase',
    category: '3D product lab',
    status: 'Live build',
    description:
      'A hardware-accelerated 3D product showcase for the REDMAGIC Titan 16 Pro, featuring a custom haptic synth, fan simulation, and custom cursor.',
    stack: ['Three.js', 'React', 'Web Audio API'],
    stats: ['3D orbit model', 'Synth sweeps', '60fps cursor'],
    accent: '#FF003C',
    github: 'https://github.com/praneetkamble/Redmagic_clone',
    live: 'https://praneetkamble.github.io/Redmagic_clone/',
  },
];

const getBufferedLiveUrl = (url) => {
  const target = new URL(url);
  target.searchParams.set('buffer', 'portfolio');
  target.searchParams.set('launch', Date.now().toString());
  return target.toString();
};

const openBufferedLive = (event, url) => {
  event.preventDefault();
  window.open(getBufferedLiveUrl(url), '_blank', 'noopener,noreferrer');
};

function DesktopProjectScreen({ project, activeIndex, isTuning, onJump, className = '' }) {
  const titleSizeClass = project.title.length > 20
    ? 'text-[1rem]'
    : 'text-[1.375rem]';

  return (
    <div
      className={`channel-screen project-tilt-panel screen-projection absolute overflow-hidden text-white ${className}`}
      style={{ '--project-accent': project.accent }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[#03110f]/24 backdrop-blur-[0.5px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(0,255,102,0.08),transparent_30%),linear-gradient(120deg,rgba(0,255,102,0.035),transparent_46%,rgba(34,211,238,0.03)_78%,transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:100%_8px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(90deg,rgba(0,255,102,0.07)_1px,transparent_1px),linear-gradient(rgba(34,211,238,0.07)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[24%] bg-gradient-to-r from-transparent via-[#03110f]/22 to-[#03110f]/30" />

      {project.live && (
        <a 
          href={getBufferedLiveUrl(project.live)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => openBufferedLive(event, project.live)}
          className="absolute inset-0 z-0 pointer-events-auto overflow-hidden block cursor-pointer"
        >
          <iframe
            src={`${project.live}?embed=portfolio-preview`}
            className="border-0 animate-fade-in"
            title={project.title}
            style={{
              width: '300%',
              height: '300%',
              transform: 'scale(0.33333)',
              transformOrigin: 'top left',
              pointerEvents: 'none',
              opacity: 1
            }}
          />
        </a>
      )}

      <AnimatePresence>
        {isTuning && (
          <motion.div
            key="channel-tuning"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.55, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 z-30"
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.45)_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,rgba(0,255,102,0.2)_0_2px,transparent_2px_8px)] mix-blend-screen" />
            <div className="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 bg-white/30 blur-md" />
          </motion.div>
        )}
      </AnimatePresence>

      {!project.live && (
        <motion.article
          key={project.id}
          initial={false}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px) brightness(1)' }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="project-depth-article relative z-10 h-full pl-3 pr-3 pb-3 pt-3"
        >
          <div className="grid h-full grid-cols-[minmax(0,1fr)_116px] grid-rows-[auto_minmax(0,1fr)_34px] gap-1.5">
            <header className="project-card-depth max-w-[220px] space-y-0.5">
              <div className="mb-0.5 flex items-center justify-between text-[9.5px] font-semibold uppercase text-white/55">
                <div className="flex items-center gap-1.5">
                  <span className="border border-[var(--project-accent)]/60 bg-[var(--project-accent)]/12 px-1.5 py-0.5 text-[var(--project-accent)] text-[8.5px]">
                    {project.status}
                  </span>
                  <span>{project.category}</span>
                </div>
                <div className="flex items-center gap-2 pointer-events-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[var(--project-accent)] transition-colors p-0.5"
                    >
                      <FiGithub size={10} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={getBufferedLiveUrl(project.live)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => openBufferedLive(event, project.live)}
                      className="text-white/60 hover:text-[var(--project-accent)] transition-colors p-0.5"
                    >
                      <FiArrowUpRight size={11} />
                    </a>
                  )}
                </div>
              </div>
              <h2 className={`${titleSizeClass} max-w-[220px] font-black uppercase leading-tight tracking-normal text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.18)]`}>
                {project.title}
              </h2>
              <p className="mt-1 max-w-[210px] text-[10px] leading-tight text-white/70 line-clamp-2">
                {project.description}
              </p>
              <div className="mt-1 flex flex-wrap gap-1">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="border border-[var(--project-accent)]/24 bg-black/30 px-1.5 py-0.5 text-[9px] font-semibold text-white/78"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </header>

            <aside className="project-side-depth row-span-2 grid min-h-0 content-start grid-rows-[90px_54px] gap-2 pr-0.5">
              <div className="border border-[var(--project-accent)]/26 bg-black/30 p-1.5 shadow-[inset_0_0_12px_rgba(0,255,102,0.08)]">
                <div className="mb-1 flex items-center justify-between text-[9px] font-bold uppercase text-white/70">
                  <span>Live Status</span>
                  <span className="flex items-center gap-1 text-[var(--project-accent)]">
                    <span className="h-1 w-1 rounded-full bg-[var(--project-accent)] shadow-[0_0_6px_var(--project-accent)]" />
                    Live
                  </span>
                </div>
                <div className="flex h-5 items-end gap-0.5 border-b border-[var(--project-accent)]/18 pb-0.5">
                  {[32, 44, 28, 62, 38, 54, 35, 76, 42, 58, 36, 48].map((height, index) => (
                    <span
                      key={`${project.id}-wave-${index}`}
                      className="w-full bg-[var(--project-accent)]/75 shadow-[0_0_6px_var(--project-accent)]"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <p className="mt-0.5 text-[8px] text-white/56">Systems operational</p>
              </div>

              <div className="border border-[var(--project-accent)]/20 bg-black/24 p-1.5">
                <div className="mb-0.5 flex items-center gap-1.5 text-[8.5px] font-bold uppercase text-white/72">
                  <FiRadio className="text-[var(--project-accent)]" />
                  Scanning
                </div>
                <div className="flex items-center justify-between text-[8px] text-white/58">
                  <span>Environment OK</span>
                  <span className="flex gap-0.5">
                    {[7, 12, 16].map((height, index) => (
                      <i key={`${project.id}-scan-${index}`} className="block w-0.5 bg-[var(--project-accent)]" style={{ height }} />
                    ))}
                  </span>
                </div>
              </div>
            </aside>

            {!project.live ? (
              <section className="project-preview-depth min-h-0 border border-[var(--project-accent)]/32 bg-[#03120f]/58 p-1.5 shadow-[0_0_12px_rgba(0,255,102,0.08)]">
                <div className="mb-1 flex items-center justify-between text-[9px] font-bold uppercase text-white/60">
                  <span className="flex items-center gap-1.5 text-[var(--project-accent)]">
                    <span className="h-4 w-4 border border-[var(--project-accent)]/70 shadow-[0_0_8px_var(--project-accent)]" />
                    {project.stats[0]}
                  </span>
                  <span>Live preview</span>
                </div>

                <div className="grid h-[calc(100%-1.25rem)] grid-cols-[minmax(0,1fr)_90px] gap-1.5">
                  <div className="flex min-h-0 flex-col">
                    <div className="space-y-1">
                      <div className="h-1.5 w-[78%] bg-[var(--project-accent)]/80 shadow-[0_0_12px_var(--project-accent)]" />
                      <div className="h-1.5 w-[58%] bg-white/20" />
                      <div className="h-1.5 w-[68%] bg-white/12" />
                    </div>

                    <div className="mt-auto space-y-1">
                      <div className="h-1.5 w-[78%] bg-[var(--project-accent)]/80 shadow-[0_0_12px_var(--project-accent)]" />
                      <div className="h-1.5 w-[54%] bg-white/12" />
                    </div>
                  </div>

                  <div className="grid grid-rows-3 gap-1">
                    {project.stats.map((stat) => (
                      <div key={stat} className="border border-[var(--project-accent)]/18 bg-black/25 p-0.5 flex items-center justify-center">
                        <p className="text-[7.5px] font-bold uppercase leading-none text-white/64 text-center truncate">{stat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <div className="min-h-0 pointer-events-none" />
            )}

            <footer className="project-footer-depth col-span-2 grid min-h-0 grid-cols-[minmax(0,1fr)_110px] items-end gap-1.5">
              <div className="grid max-w-[210px] grid-cols-3 gap-1">
                {project.stack.map((item, index) => (
                  <div key={`${project.id}-${item}`} className="min-w-0 border border-[var(--project-accent)]/18 bg-black/25 px-1 py-0.5">
                    <FiZap className="mb-0.5 text-[var(--project-accent)]" size={9} />
                    <p className="truncate text-[8.5px] font-bold uppercase text-white/72">{item}</p>
                    <div className="mt-0.5 h-0.5 bg-white/8">
                      <div
                        className="h-full bg-[var(--project-accent)]"
                        style={{ width: `${58 + index * 14}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex min-w-0 flex-col items-end gap-0.5 text-[8px] font-bold uppercase text-[var(--project-accent)]/78">
                <span className="max-w-full truncate">PJ-{project.channel}-{project.id.slice(0, 3).toUpperCase()}</span>
                <div className="flex items-center gap-1" aria-label="Project channels">
                  {projects.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onJump(index)}
                      className={`h-1 transition-all ${
                        index === activeIndex
                          ? 'w-5 bg-[var(--project-accent)] shadow-[0_0_6px_var(--project-accent)]'
                          : 'w-2 bg-[var(--project-accent)]/28 hover:bg-[var(--project-accent)]/55'
                      }`}
                      aria-label={`Show project channel ${item.channel}`}
                    />
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </motion.article>
      )}
    </div>
  );
}

function CompactProjectScreen({ project, activeIndex, isTuning, onJump, className = '' }) {
  return (
    <div
      className={`channel-screen project-compact-panel relative overflow-hidden border border-[#00FF66]/35 bg-[#020806]/70 text-white shadow-[0_0_34px_rgba(0,255,102,0.14),inset_0_0_42px_rgba(0,255,102,0.08)] backdrop-blur-[2px] ${className}`}
      style={{ '--project-accent': project.accent }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_16%,rgba(0,255,102,0.2),transparent_30%),linear-gradient(135deg,rgba(0,255,102,0.1),transparent_46%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.2] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:100%_5px]" />

      {project.live && (
        <a 
          href={getBufferedLiveUrl(project.live)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => openBufferedLive(event, project.live)}
          className="absolute inset-0 z-0 pointer-events-auto overflow-hidden block cursor-pointer"
        >
          <iframe
            src={`${project.live}?embed=portfolio-preview`}
            className="border-0 animate-fade-in"
            title={project.title}
            style={{
              width: '200%',
              height: '200%',
              transform: 'scale(0.5)',
              transformOrigin: 'top left',
              pointerEvents: 'none',
              opacity: 1
            }}
          />
        </a>
      )}

      <AnimatePresence>
        {isTuning && (
          <motion.div
            key="channel-tuning"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.55, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 z-30"
          >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.55)_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,rgba(0,255,102,0.22)_0_2px,transparent_2px_8px)] mix-blend-screen" />
          </motion.div>
        )}
      </AnimatePresence>

      {!project.live && (
        <div className="relative z-10 flex h-full flex-col px-3 py-4 sm:px-4 sm:py-5">
          <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase text-[#9BFFBD] sm:text-xs">
            <span className="flex items-center gap-2">
              <FiRadio className="text-[var(--project-accent)]" />
              CH {project.channel}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/65">
              Scroll signal
            </span>
          </div>

          <motion.article
            key={project.id}
            initial={false}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px) brightness(1)' }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-0 flex-1 flex-col"
          >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[var(--project-accent)]/45 bg-[var(--project-accent)]/10 px-3 py-1 text-[10px] font-semibold uppercase text-white sm:text-xs">
                  {project.status}
                </span>
                <span className="text-[10px] font-medium uppercase text-white/45 sm:text-xs">
                  {project.category}
                </span>
              </div>

              <h2 className="text-[clamp(1.45rem,7vw,2rem)] font-bold leading-tight text-white sm:text-3xl">
                {project.title}
              </h2>
              <p className="mt-2 max-w-prose text-xs leading-relaxed text-white/68 sm:text-sm">
                {project.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-white/10 bg-black/25 px-2.5 py-1 text-[10px] font-medium text-white/78 sm:text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {!project.live && (
                <div className="mt-auto pt-3">
                  <div className="grid grid-cols-3 gap-1.5">
                    {project.stats.map((stat) => (
                      <div key={stat} className="min-h-10 border border-white/10 bg-white/[0.035] p-1.5 sm:p-2">
                        <FiZap className="mb-1 text-[var(--project-accent)]" />
                        <p className="text-[8px] font-semibold uppercase leading-snug text-white/70 sm:text-[10px]">
                          {stat}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5" aria-label="Project channels">
                    {projects.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => onJump(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          index === activeIndex
                            ? 'w-8 bg-[var(--project-accent)] shadow-[0_0_14px_var(--project-accent)]'
                            : 'w-2.5 bg-white/24 hover:bg-white/45'
                        }`}
                        aria-label={`Show project channel ${item.channel}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold uppercase text-white/52">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--project-accent)] transition-colors p-1"
                      >
                        <FiGithub size={14} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={getBufferedLiveUrl(project.live)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => openBufferedLive(event, project.live)}
                        className="hover:text-[var(--project-accent)] transition-colors p-1"
                      >
                        <FiArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
          </motion.article>
        </div>
      )}
    </div>
  );
}

export default function ProjectsShowcase() {
  const sectionRef = useRef(null);
  const activeRef = useRef(0);
  const tuningTimerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTuning, setIsTuning] = useState(false);

  const [scale, setScale] = useState(1);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const handleProjectPointerMove = (event) => {
    if (!sectionRef.current || event.pointerType === 'touch') {
      return;
    }

    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    const tx = (-y * 4).toFixed(2);
    const ty = (x * 6).toFixed(2);
    const px = (x * 20).toFixed(2);
    const py = (y * 14).toFixed(2);

    sectionRef.current.style.setProperty('--project-tilt-x', `${tx}deg`);
    sectionRef.current.style.setProperty('--project-tilt-y', `${ty}deg`);
    sectionRef.current.style.setProperty('--project-parallax-x', `${px}px`);
    sectionRef.current.style.setProperty('--project-parallax-y', `${py}px`);
  };

  const resetProjectTilt = () => {
    if (!sectionRef.current) return;
    sectionRef.current.style.setProperty('--project-tilt-x', '0deg');
    sectionRef.current.style.setProperty('--project-tilt-y', '0deg');
    sectionRef.current.style.setProperty('--project-parallax-x', '0px');
    sectionRef.current.style.setProperty('--project-parallax-y', '0px');
  };

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(latest * (projects.length - 1))),
    );

    if (nextIndex === activeRef.current) {
      return;
    }

    activeRef.current = nextIndex;
    setActiveIndex(nextIndex);
    setIsTuning(true);

    window.clearTimeout(tuningTimerRef.current);
    tuningTimerRef.current = window.setTimeout(() => {
      setIsTuning(false);
    }, 520);
  });

  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const baseWidth = 1024;
      const baseHeight = 572;
      const scaleX = vw / baseWidth;
      const scaleY = vh / baseHeight;
      const newScale = Math.min(scaleX, scaleY) * 0.96;
      setScale(newScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(tuningTimerRef.current);
    };
  }, []);

  const jumpToProject = (index) => {
    if (!sectionRef.current) {
      return;
    }

    const sectionTop = window.scrollY + sectionRef.current.getBoundingClientRect().top;
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
    const targetProgress = projects.length === 1 ? 0 : index / (projects.length - 1);

    window.scrollTo({
      top: sectionTop + scrollableDistance * targetProgress,
      behavior: 'smooth',
    });
  };

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      onPointerMove={handleProjectPointerMove}
      onPointerLeave={resetProjectTilt}
      className="project-scene relative bg-[#020403] text-white"
      style={{
        height: `${100 + (projects.length - 1) * 78}svh`,
        '--project-tilt-x': '0deg',
        '--project-tilt-y': '0deg',
        '--project-parallax-x': '0px',
        '--project-parallax-y': '0px',
      }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="relative hidden h-[100svh] w-full overflow-hidden bg-[#020806] lg:block">
          <img
            src="/backdrop1.webp"
            alt=""
            className="absolute inset-0 h-full w-full scale-105 object-cover object-center opacity-35 blur-sm"
            loading="eager"
            decoding="async"
          />
          <div
            className="project-depth-scene relative left-1/2 top-1/2 overflow-visible"
            style={{
              '--project-accent': activeProject.accent,
              width: '1024px',
              height: '572px',
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          >
            <img
              src="/backdrop1.webp"
              alt=""
              className="project-backdrop-image absolute inset-0 h-full w-full object-contain object-center"
              loading="eager"
              decoding="async"
            />
            <div className="project-depth-overlay pointer-events-none absolute inset-0" />
            <motion.div
              className="project-avatar-layer pointer-events-none absolute bottom-[0%] right-[6%] z-20 h-[80%] w-[30%]"
              animate={{ y: [-7, 7, -7], rotateZ: [-0.45, 0.35, -0.45] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute bottom-[2%] left-[18%] h-[13%] w-[58%] rounded-[100%] border border-[#8cff00]/45 bg-[#00ff66]/10 shadow-[0_0_34px_rgba(0,255,102,0.48),inset_0_0_22px_rgba(34,211,238,0.14)] blur-[0.5px]" />
              <div className="absolute bottom-[4%] left-[27%] h-[8%] w-[40%] rounded-[100%] bg-[#00ff66]/18 blur-lg" />
              <img
                src="/project_avatar.webp"
                alt="Praneet avatar presenting projects"
                className="project-avatar-image relative z-10 h-full w-full object-contain object-bottom"
                loading="eager"
                decoding="async"
              />
            </motion.div>
            <div className="project-monitor-screen pointer-events-auto absolute z-30">
              <DesktopProjectScreen
                project={activeProject}
                activeIndex={activeIndex}
                isTuning={isTuning}
                onJump={jumpToProject}
                className="left-0 top-0 h-full w-full"
              />
            </div>
          </div>
        </div>

        <div className="relative h-[100svh] overflow-hidden bg-[#020806] lg:hidden">
          <img
            src="/backdrop1.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-65"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/50" />
          <img
            src="/project_avatar.webp"
            alt=""
            className="project-mobile-avatar pointer-events-none absolute right-[-18vw] top-[48vh] z-[3] h-[58vh] w-auto max-w-none object-contain opacity-90 sm:right-[-8vw]"
            loading="eager"
            decoding="async"
          />
          <div className="absolute left-0 top-[12vh] z-10 w-full px-0.5">
            <CompactProjectScreen
              project={activeProject}
              activeIndex={activeIndex}
              isTuning={isTuning}
              onJump={jumpToProject}
              className="h-[min(48vh,360px)] rounded-lg"
            />
          </div>
        </div>
      </div>

      <style>{`
        .project-depth-scene {
          perspective: 1500px;
          transform-style: preserve-3d;
        }

        .project-backdrop-image {
          transform: translate3d(calc(var(--project-parallax-x) * -0.035), calc(var(--project-parallax-y) * -0.025), -120px) scale(1.006);
          transform-origin: center center;
          transition: transform 180ms ease-out;
          will-change: transform;
        }

        .project-depth-overlay {
          background:
            linear-gradient(90deg, rgba(0, 0, 0, 0.2), transparent 42%, rgba(0, 0, 0, 0.16)),
            radial-gradient(circle at 48% 38%, rgba(0, 255, 102, 0.09), transparent 34%),
            radial-gradient(circle at 76% 52%, rgba(34, 211, 238, 0.08), transparent 28%);
          transform: translate3d(calc(var(--project-parallax-x) * -0.18), calc(var(--project-parallax-y) * -0.12), -80px);
        }

        .project-monitor-screen {
          left: 30.6%;
          top: 17.0%;
          width: 35.0%;
          height: 45.0%;
        }

        .project-avatar-layer {
          transform: perspective(1500px) rotateX(calc(var(--project-tilt-x) * -0.42)) rotateY(calc(var(--project-tilt-y) * -0.34)) translate3d(calc(var(--project-parallax-x) * -0.56), calc(var(--project-parallax-y) * -0.24), 40px);
          transform-origin: center bottom;
          transform-style: preserve-3d;
          transition: transform 180ms ease-out;
          will-change: transform;
        }

        .project-avatar-image {
          filter: drop-shadow(0 28px 32px rgba(0, 0, 0, 0.56)) drop-shadow(0 0 24px rgba(0, 255, 102, 0.24));
          transform: translateZ(15px);
        }

        .project-tilt-panel {
          transform: perspective(1500px) rotateX(var(--project-tilt-x)) rotateY(var(--project-tilt-y)) translate3d(var(--project-parallax-x), var(--project-parallax-y), 30px);
          transform-style: preserve-3d;
          transition: transform 180ms ease-out;
          will-change: transform;
        }

        .project-depth-article {
          transform-style: preserve-3d;
        }

        .project-card-depth {
          transform: translateZ(20px);
        }
 
        .project-side-depth {
          transform: translateZ(32px);
        }
 
        .project-preview-depth {
          transform: translateZ(25px);
        }
 
        .project-footer-depth {
          transform: translateZ(15px);
        }

        .project-compact-panel {
          transform: perspective(900px) rotateX(2deg);
          transform-origin: center top;
        }

        .project-mobile-avatar {
          filter: drop-shadow(0 20px 28px rgba(0, 0, 0, 0.58)) drop-shadow(0 0 22px rgba(0, 255, 102, 0.22));
        }

        @keyframes channelJitter {
          0% { transform: translateX(-4%); }
          50% { transform: translateX(3%); }
          100% { transform: translateX(-2%); }
        }

        .channel-screen {
          contain: paint;
          isolation: isolate;
          transform-style: preserve-3d;
        }

        .screen-projection {
          clip-path: polygon(1.91% 0, 98.09% 0, 100% 2.45%, 100% 97.55%, 98.09% 100%, 1.91% 100%, 0 97.55%, 0 2.45%);
        }

        @media (prefers-reduced-motion: reduce) {
          .project-backdrop-image,
          .project-depth-overlay,
          .project-avatar-layer,
          .project-avatar-image,
          .project-tilt-panel,
          .project-card-depth,
          .project-side-depth,
          .project-preview-depth,
          .project-footer-depth,
          .project-compact-panel {
            transform: none !important;
            transition: none !important;
          }

          .channel-screen * {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </section>
  );
}
