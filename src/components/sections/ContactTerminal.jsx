import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';
import {
  FiActivity,
  FiArrowRight,
  FiClock,
  FiCpu,
  FiFolder,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiLock,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiRadio,
  FiSend,
  FiTerminal,
  FiUser,
  FiWifi,
  FiZap,
} from 'react-icons/fi';

const socials = [
  { label: 'GitHub', value: '/praneetkamble', href: 'https://github.com/praneetkamble', icon: <FiGithub /> },
  { label: 'LinkedIn', value: '/in/praneet-kamble', href: 'https://www.linkedin.com/in/praneet-kamble-1b03b13a5/', icon: <FiLinkedin /> },
  { label: 'Email', value: 'praneetkamble051112@gmail.com', href: 'mailto:praneetkamble051112@gmail.com', icon: <FiMail /> },
  { label: 'Instagram', value: '@kamblepraneet', href: 'https://www.instagram.com/kamblepraneet/', icon: <FiInstagram /> },
  { label: 'Discord', value: 'praneet.dev', href: 'https://discord.com', icon: <FaDiscord /> },
];

const systemStatus = [
  { label: 'Status', value: 'Online', icon: <FiRadio /> },
  { label: 'Location', value: 'India', icon: <FiMapPin /> },
  { label: 'Response time', value: '< 24 hours', icon: <FiClock /> },
  { label: 'Availability', value: 'Open for projects', icon: <FiZap /> },
];

const mapNodes = [
  [47, 58],
  [78, 48],
  [112, 68],
  [143, 52],
  [176, 72],
  [214, 57],
  [252, 79],
  [296, 61],
];

const mapLinks = [
  [0, 1],
  [1, 2],
  [2, 4],
  [1, 3],
  [3, 5],
  [4, 6],
  [5, 7],
];

function StatusPanel() {
  return (
    <div className="contact-glass contact-corner relative overflow-hidden border border-[#00ff99]/28 bg-[#02100e]/42 p-3 shadow-[inset_0_0_28px_rgba(0,255,153,0.06)]">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-normal text-[#00ffbf]">System Status</p>
        <span className="h-1.5 w-1.5 rounded-full bg-[#00ff66] shadow-[0_0_12px_#00ff66]" />
      </div>

      <div className="grid gap-2.5 text-[11px] uppercase text-white/68">
        {systemStatus.map((item) => (
          <div key={item.label} className="grid grid-cols-[18px_1fr_auto] items-center gap-2">
            <span className="text-[#00ffbf]">{item.icon}</span>
            <span>{item.label}</span>
            <span className="text-right font-semibold text-[#00ff66]">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-4 right-4 h-20 w-20 rounded-full border border-[#00ff66]/20">
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff66] shadow-[0_0_18px_#00ff66]" />
        <span className="absolute inset-4 rounded-full border border-[#00ff66]/24" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#00ff66]/30" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#00ff66]/30" />
      </div>
    </div>
  );
}

function SocialPanel() {
  return (
    <div className="contact-glass contact-corner border border-[#00ff99]/28 bg-[#02100e]/42 p-3">
      <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-normal text-[#00ffbf]">
        <FiTerminal />
        Connect Through
      </p>
      <div className="grid overflow-hidden border border-[#00ff99]/26 bg-black/18">
        {socials.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
            className="group grid grid-cols-[28px_1fr_auto_18px] items-center gap-2 border-b border-[#00ff99]/18 px-3 py-2 text-sm text-white/82 transition-colors last:border-b-0 hover:bg-[#00ff99]/10"
          >
            <span className="text-lg text-[#75ffe3] transition-transform group-hover:scale-110">{item.icon}</span>
            <span>{item.label}</span>
            <span className="hidden text-[10px] text-[#75ffe3]/78 sm:inline">{item.value}</span>
            <FiArrowRight className="text-[#00ff99] transition-transform group-hover:translate-x-1" />
          </a>
        ))}
      </div>
    </div>
  );
}

function NetworkMapPanel({ className = '' }) {
  return (
    <div className={`network-map-panel contact-corner relative min-h-[112px] overflow-hidden border border-[#00ff99]/18 bg-black/18 ${className}`}>
      <svg
        className="absolute inset-x-3 top-2 h-[72%] w-[calc(100%-1.5rem)] overflow-visible"
        viewBox="0 0 340 128"
        aria-hidden="true"
      >
        <g className="map-continents">
          <path d="M20 48 36 36 62 34 77 45 65 58 82 70 68 82 45 79 33 65 Z" />
          <path d="M86 42 115 34 151 41 159 60 143 73 122 68 105 82 91 70 Z" />
          <path d="M154 42 184 35 218 42 226 58 207 68 179 64 162 76 145 62 Z" />
          <path d="M222 48 249 36 283 43 309 58 296 76 263 74 246 86 224 72 Z" />
          <path d="M146 78 167 86 181 108 168 123 151 106 Z" />
          <path d="M260 83 282 91 293 112 276 119 254 104 Z" />
        </g>

        <g className="map-links">
          {mapLinks.map(([from, to]) => (
            <line
              key={`${from}-${to}`}
              x1={mapNodes[from][0]}
              y1={mapNodes[from][1]}
              x2={mapNodes[to][0]}
              y2={mapNodes[to][1]}
            />
          ))}
        </g>

        <g className="map-nodes">
          {mapNodes.map(([cx, cy], index) => (
            <g key={`${cx}-${cy}`}>
              <circle className="map-node-pulse" cx={cx} cy={cy} r="8" style={{ animationDelay: `${index * 0.2}s` }} />
              <circle className="map-node-core" cx={cx} cy={cy} r="2.6" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

function ContactField({ icon, label, children }) {
  return (
    <label className="group block">
      <span className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-normal text-[#00ffbf]">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function ContactForm({ className = '' }) {
  const [form, setForm] = useState({
    name: '',
    subject: '',
    message: '',
  });

  const mailtoLink = useMemo(() => {
    const subject = encodeURIComponent(form.subject || 'Project collaboration');
    const body = encodeURIComponent(
      `Hi Praneet,\n\n${form.message || 'I would like to connect about a project.'}\n\nFrom: ${form.name || 'Visitor'}`,
    );
    return `mailto:praneetkamble051112@gmail.com?subject=${subject}&body=${body}`;
  }, [form]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = mailtoLink;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`contact-form-panel contact-corner relative overflow-hidden border border-[#00ffbf]/36 bg-[#03110f]/48 p-4 shadow-[0_0_42px_rgba(0,255,153,0.08),inset_0_0_50px_rgba(0,255,153,0.06)] backdrop-blur-[2px] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,191,0.08)_1px,transparent_1px)] [background-size:100%_6px,42px_42px]" />
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between gap-4 text-[11px] font-bold uppercase text-[#00ffbf]">
          <span className="flex items-center gap-2">
            <FiLock />
            Secure Communication Channel
          </span>
          <span className="hidden md:inline-flex items-center rounded-full border border-[#00ffbf]/24 bg-[#00ffbf]/8 px-3.5 py-1 text-[#8ffff0] shrink-0" style={{ gap: '6px' }}>
            <span>M-10</span><span className="h-1.5 w-1.5 rounded-full bg-[#00ff66] shadow-[0_0_10px_#00ff66] shrink-0" />
          </span>
        </div>

        <ContactField icon={<FiUser />} label="User Identification">
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            required
            placeholder="Enter your name..."
            className="terminal-input h-12 w-full border border-[#00ffbf]/22 bg-black/24 px-3.5 font-mono text-sm text-[#bffff6] outline-none transition-colors placeholder:text-[#bffff6]/58 focus:border-[#00ffbf]/70"
          />
        </ContactField>

        <ContactField icon={<FiFolder />} label="Transmission Subject">
          <input
            name="subject"
            value={form.subject}
            onChange={updateField}
            required
            placeholder="Project collaboration / inquiry / other..."
            className="terminal-input h-12 w-full border border-[#00ffbf]/22 bg-black/24 px-3.5 font-mono text-sm text-[#bffff6] outline-none transition-colors placeholder:text-[#bffff6]/58 focus:border-[#00ffbf]/70"
          />
        </ContactField>

        <ContactField icon={<FiMessageSquare />} label="Message Payload">
          <textarea
            name="message"
            value={form.message}
            onChange={updateField}
            required
            placeholder="Type your message here..."
            rows={5}
            className="terminal-input min-h-[128px] w-full resize-none border border-[#00ffbf]/22 bg-black/24 px-3.5 py-3 font-mono text-sm leading-relaxed text-[#bffff6] outline-none transition-colors placeholder:text-[#bffff6]/58 focus:border-[#00ffbf]/70"
          />
        </ContactField>

        <button
          type="submit"
          className="group relative flex h-14 w-full items-center justify-center overflow-hidden border border-[#00ff66]/50 bg-[#00ff66]/14 px-6 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_34px_rgba(0,255,102,0.22),inset_0_0_28px_rgba(0,255,102,0.18)] transition-all hover:border-[#7cffb0] hover:bg-[#00ff66]/24 hover:shadow-[0_0_52px_rgba(0,255,102,0.34)]"
        >
          <span className="absolute inset-y-0 left-[-24%] w-[22%] skew-x-[-18deg] bg-white/35 blur-sm transition-transform duration-700 group-hover:translate-x-[620%]" />
          <span className="relative flex items-center gap-3">
            Initiate Transmission
            <FiSend className="text-lg text-[#baffd2] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </button>
      </div>
    </form>
  );
}

export default function ContactTerminal() {
  const sectionRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, px: 0, py: 0 });

  const handlePointerMove = (event) => {
    if (!sectionRef.current || event.pointerType === 'touch') {
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: Number((-y * 4.5).toFixed(2)),
      y: Number((x * 6).toFixed(2)),
      px: Number((x * 18).toFixed(2)),
      py: Number((y * 12).toFixed(2)),
    });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0, px: 0, py: 0 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="relative min-h-[100svh] overflow-hidden bg-[#020403] text-white"
      style={{
        '--contact-tilt-x': `${tilt.x}deg`,
        '--contact-tilt-y': `${tilt.y}deg`,
        '--contact-parallax-x': `${tilt.px}px`,
        '--contact-parallax-y': `${tilt.py}px`,
      }}
    >
      <div className="relative hidden h-[100svh] w-full overflow-hidden bg-black lg:block">
        <img
          src="/info_backdrop.png"
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center opacity-30 blur-sm"
          loading="eager"
          decoding="async"
        />
        <div
          className="contact-scene relative left-1/2 top-1/2 z-10 aspect-[1024/572] w-full max-w-[179svh] -translate-x-1/2 -translate-y-1/2 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/info_backdrop.png)' }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[12] h-[90px] bg-gradient-to-b from-[#020403] via-[#020403]/95 to-[#020403]/12" />
          <div className="pointer-events-none absolute inset-0 z-[11] bg-[radial-gradient(circle_at_72%_36%,rgba(0,255,153,0.08),transparent_22%),linear-gradient(90deg,rgba(0,0,0,0.2),transparent_42%,rgba(0,0,0,0.22))]" />

          <motion.div
            initial={{ opacity: 0, x: -24, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[11.8%] top-[12.4%] z-30 w-[25.4%]"
          >
            <div className="contact-tilt contact-left-console w-full">
              <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00ffbf]">
                <FiActivity />
                Contact Terminal
              </p>
              <h2 className="text-[clamp(2.25rem,3.2vw,4rem)] font-black uppercase leading-[0.96] tracking-normal text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.18)]">
                Establish
                <span className="block text-[#00ff99] drop-shadow-[0_0_22px_rgba(0,255,153,0.46)]">
                  Connection
                </span>
              </h2>
              <p className="mt-4 max-w-[300px] text-sm leading-relaxed text-white/74">
                Have a project in mind? Let's build something futuristic together.
              </p>

              <div className="mt-5 space-y-3">
                <StatusPanel />
                <SocialPanel />
                <NetworkMapPanel />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="absolute left-[41%] top-[18.2%] z-40 w-[34.2%]"
          >
            <div className="contact-tilt contact-form-console w-full">
              <ContactForm />
            </div>
          </motion.div>
          <div className="contact-avatar-frame pointer-events-none absolute right-[3.6%] top-[13.8%] z-30 h-[76%] w-[28.4%] overflow-visible">
            <img
              src="/info_avatar.png"
              alt="Praneet contact avatar"
              className="contact-avatar h-full w-full max-w-none object-cover object-[100%_48%] mix-blend-screen drop-shadow-[0_0_34px_rgba(0,255,102,0.22)]"
            />
          </div>
        </div>
      </div>

      <div className="relative min-h-[100svh] overflow-hidden px-4 pb-12 pt-28 lg:hidden">
        <img
          src="/info_backdrop.png"
          alt=""
          className="absolute inset-x-0 top-0 mx-auto h-auto max-h-[100svh] w-full object-contain object-top opacity-70"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[#020403]/72" />
        <img
          src="/info_avatar.png"
          alt=""
          className="pointer-events-none absolute bottom-0 right-[-62vw] z-[1] h-[76vh] w-auto max-w-none object-contain opacity-80 mix-blend-screen sm:right-[-34vw]"
        />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
            className="contact-glass contact-corner border border-[#00ff99]/28 bg-black/42 p-5 backdrop-blur-md"
          >
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#00ffbf]">
              <FiActivity />
              Contact Terminal
            </p>
            <h2 className="text-[clamp(2.35rem,12vw,4.1rem)] font-black uppercase leading-[0.92] tracking-normal">
              Establish
              <span className="block text-[#00ff99] drop-shadow-[0_0_22px_rgba(0,255,153,0.42)]">
                Connection
              </span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/72">
              Have a project in mind? Let's build something futuristic together.
            </p>
          </motion.div>

          <ContactForm className="backdrop-blur-md" />

          <div className="grid gap-4 sm:grid-cols-2">
            <StatusPanel />
            <SocialPanel />
          </div>

          <NetworkMapPanel className="min-h-[150px] backdrop-blur-md" />

          <div className="grid grid-cols-3 gap-2 text-[10px] uppercase text-white/70">
            {[
              { label: 'Server', value: 'Online', icon: <FiCpu /> },
              { label: 'Network', value: '98%', icon: <FiWifi /> },
              { label: 'Reply', value: 'Live', icon: <FiActivity /> },
            ].map((item) => (
              <div key={item.label} className="border border-[#00ff99]/22 bg-black/36 p-3">
                <span className="mb-2 block text-[#00ffbf]">{item.icon}</span>
                <p className="text-white/48">{item.label}</p>
                <p className="mt-1 font-bold text-[#00ff66]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .contact-scene {
          perspective: 1400px;
          transform-style: preserve-3d;
        }

        .contact-tilt {
          transform: perspective(1400px) rotateX(var(--contact-tilt-x)) rotateY(var(--contact-tilt-y)) translate3d(var(--contact-parallax-x), var(--contact-parallax-y), 42px) scale(var(--contact-tilt-scale, 1));
          transform-origin: top left;
          transform-style: preserve-3d;
          transition: transform 180ms ease-out;
        }

        .contact-avatar-frame {
          transform: translate3d(calc(var(--contact-parallax-x) * -0.42), calc(var(--contact-parallax-y) * -0.28), 80px);
          transition: transform 180ms ease-out;
          will-change: transform;
        }

        .contact-avatar {
          transform: translate3d(calc(var(--contact-parallax-x) * -0.42), calc(var(--contact-parallax-y) * -0.28), 80px);
          transition: transform 180ms ease-out;
          will-change: transform;
        }

        .contact-glass,
        .contact-form-panel {
          position: relative;
        }

        .contact-corner {
          clip-path: polygon(4% 0, 96% 0, 100% 8%, 100% 92%, 96% 100%, 4% 100%, 0 92%, 0 8%);
        }

        .network-map-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.24;
          background-image: linear-gradient(rgba(0, 255, 191, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 191, 0.12) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .network-map-panel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 28% 54%, rgba(0, 255, 191, 0.16), transparent 32%), linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.18));
          pointer-events: none;
        }

        .map-continents path {
          fill: rgba(0, 255, 191, 0.07);
          stroke: rgba(0, 255, 191, 0.72);
          stroke-width: 1;
          filter: drop-shadow(0 0 5px rgba(0, 255, 191, 0.55));
        }

        .map-links line {
          stroke: rgba(0, 255, 191, 0.46);
          stroke-width: 0.9;
          stroke-dasharray: 4 7;
          animation: mapDash 8s linear infinite;
        }

        .map-node-core {
          fill: #00ff99;
          filter: drop-shadow(0 0 6px #00ff99);
        }

        .map-node-pulse {
          fill: rgba(0, 255, 153, 0.15);
          stroke: rgba(0, 255, 153, 0.52);
          animation: mapPulse 2.8s ease-out infinite;
          transform-origin: center;
        }

        .terminal-input {
          box-shadow: inset 0 0 18px rgba(0, 255, 191, 0.035);
        }

        .terminal-input:focus {
          box-shadow: 0 0 22px rgba(0, 255, 191, 0.12), inset 0 0 24px rgba(0, 255, 191, 0.055);
        }

        @media (min-width: 1024px) and (max-height: 850px) {
          .contact-left-console {
            --contact-tilt-scale: 0.84;
          }

          .contact-form-console {
            --contact-tilt-scale: 0.94;
          }

          .contact-avatar-frame {
            top: 14%;
            height: 74%;
          }
        }

        @media (min-width: 1024px) and (max-height: 760px) {
          .contact-left-console {
            --contact-tilt-scale: 0.78;
          }

          .contact-form-console {
            --contact-tilt-scale: 0.86;
          }

          .contact-avatar-frame {
            top: 15%;
            height: 72%;
          }
        }

        @media (min-width: 1024px) and (max-height: 660px) {
          .contact-left-console {
            --contact-tilt-scale: 0.72;
          }

          .contact-form-console {
            --contact-tilt-scale: 0.74;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .map-links line,
          .map-node-pulse {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
          }

          .contact-tilt,
          .contact-avatar,
          .contact-avatar-frame {
            transform: none !important;
            transition: none !important;
          }
        }

        @keyframes mapDash {
          to { stroke-dashoffset: -44; }
        }

        @keyframes mapPulse {
          0% { opacity: 0.85; transform: scale(0.65); }
          75%, 100% { opacity: 0; transform: scale(1.85); }
        }
      `}</style>
    </section>
  );
}
