import { motion } from 'framer-motion';

const statusText = [
  { at: 0, text: 'Initializing visual shell' },
  { at: 22, text: 'Buffering interface assets' },
  { at: 46, text: 'Decoding portfolio imagery' },
  { at: 68, text: 'Priming interaction layer' },
  { at: 88, text: 'Synchronizing final frame' },
  { at: 100, text: 'Launch ready' },
];

export default function BufferLoader({ progress }) {
  const currentStatus = statusText.reduce((active, item) => (
    progress >= item.at ? item : active
  ), statusText[0]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#050505] px-5 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.015, filter: 'blur(10px)' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Portfolio loading buffer"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,255,102,0.18),transparent_34%),radial-gradient(circle_at_18%_78%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,#050505_0%,#020704_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(0,255,102,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,102,0.045)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_74%_70%_at_50%_50%,#000_18%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-35" />

      <div className="relative z-10 w-full max-w-[620px]">
        <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
          <span>Praneet.dev</span>
          <span className="text-[#00FF66]">Buffer online</span>
        </div>

        <div className="relative overflow-hidden border border-[#00FF66]/25 bg-black/45 p-6 shadow-[0_0_55px_rgba(0,255,102,0.12),inset_0_0_32px_rgba(0,255,102,0.04)] backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#00FF66] to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

          <div className="mb-7 flex items-start justify-between gap-5">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.32em] text-[#00FF66]">
                Loading portfolio
              </p>
              <h1 className="text-4xl font-black leading-none tracking-normal text-white sm:text-6xl">
                BUFFER
                <span className="block text-[#00FF66] drop-shadow-[0_0_24px_rgba(0,255,102,0.35)]">
                  {progress}%
                </span>
              </h1>
            </div>

            <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
              <div className="absolute inset-0 rounded-full border border-[#00FF66]/20" />
              <div className="absolute inset-2 animate-[spin_5s_linear_infinite] rounded-full border border-dashed border-[#00FF66]/45" />
              <div className="absolute inset-5 animate-[spin_8s_linear_infinite_reverse] rounded-full border border-cyan-400/30" />
              <div className="absolute inset-[2.05rem] rounded-full bg-[#00FF66] shadow-[0_0_30px_rgba(0,255,102,0.85)]" />
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            <span>{currentStatus.text}</span>
            <span>{progress < 100 ? 'Streaming assets' : 'Ready'}</span>
          </div>

          <div className="relative h-2 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00FF66] via-cyan-300 to-white shadow-[0_0_28px_rgba(0,255,102,0.55)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <div className="absolute inset-y-0 w-24 animate-[bufferSweep_1.3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
            <span className="truncate">Images decoded</span>
            <span className="truncate text-center">Fonts ready</span>
            <span className="truncate text-right">UI staged</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
