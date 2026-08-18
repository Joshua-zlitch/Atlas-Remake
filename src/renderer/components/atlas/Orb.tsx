import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type OrbState = "idle" | "listening" | "thinking" | "speaking" | "processing";

interface OrbProps {
  state?: OrbState;
  size?: number;
  className?: string;
  reflection?: boolean;
}

const stateTuning: Record<
  OrbState,
  {
    glow: number;
    breathe: string;
    ringSpin: number;
    core: number;
    ripple: boolean;
    travel: boolean;
    color: string;
    soft: string;
    rings: boolean;
    waves: boolean;
    particles: boolean;
    ringSweep: boolean;
    ringPulse: boolean;
    ringParticles: boolean;
    ringFlare: boolean;
  }
> = {
  idle: { glow: 0.72, breathe: "9s", ringSpin: 0, core: 0.85, ripple: false, travel: false, rings: false, waves: false, particles: false, ringSweep: false, ringPulse: false, ringParticles: false, ringFlare: false, color: "var(--orb-idle)", soft: "var(--orb-idle-soft)" },
  listening: { glow: 0.85, breathe: "3.4s", ringSpin: 0, core: 1, ripple: false, travel: false, rings: true, waves: true, particles: false, ringSweep: false, ringPulse: true, ringParticles: true, ringFlare: false, color: "var(--orb-listening)", soft: "var(--orb-listening-soft)" },
  thinking: { glow: 0.95, breathe: "7s", ringSpin: 26, core: 1.05, ripple: false, travel: true, rings: true, waves: false, particles: true, ringSweep: true, ringPulse: false, ringParticles: true, ringFlare: false, color: "var(--orb-thinking)", soft: "var(--orb-thinking-soft)" },
  speaking: { glow: 1, breathe: "1.9s", ringSpin: 34, core: 1.15, ripple: true, travel: false, rings: true, waves: false, particles: false, ringSweep: true, ringPulse: true, ringParticles: false, ringFlare: false, color: "var(--orb-speaking)", soft: "var(--orb-speaking-soft)" },
  processing: { glow: 1.2, breathe: "5s", ringSpin: 7, core: 1.25, ripple: false, travel: true, rings: true, particles: true, waves: false, ringSweep: true, ringPulse: true, ringParticles: true, ringFlare: true, color: "var(--orb-processing)", soft: "var(--orb-processing-soft)" },
};

/** The Orb — Atlas's presence. A layered CSS glass sphere. */
export function Orb({ state = "idle", size = 240, className, reflection = true }: OrbProps) {
  const t = stateTuning[state];
  const c = t.color;
  const cs = t.soft;

  // Idle blink — organic, randomized every 5–8s. Never while speaking.
  const [blink, setBlink] = useState(false);
  const canBlink = state === "idle" || state === "listening" || state === "thinking";
  useEffect(() => {
    if (!canBlink) {
      setBlink(false);
      return;
    }
    let blinkTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      nextTimer = setTimeout(() => {
        setBlink(true);
        blinkTimer = setTimeout(() => {
          setBlink(false);
          schedule();
        }, 200);
      }, 3000 + Math.random() * 2000);
    };
    schedule();
    return () => {
      clearTimeout(nextTimer);
      clearTimeout(blinkTimer);
    };
  }, [canBlink]);

  return (
    <div
      className={cn("relative select-none", className)}
      style={{ width: size, height: reflection ? size * 1.22 : size }}
      aria-hidden
    >
      <div
        className="relative"
        style={{ width: size, height: size, animation: `atlas-breathe ${t.breathe} ease-in-out infinite` }}
      >
        <div
          className="absolute rounded-full"
          style={{
            inset: -size * 0.42,
            background: `radial-gradient(circle, color-mix(in oklab, ${c} ${48 * t.glow}%, transparent) 0%, transparent 68%)`,
            filter: `blur(${size * 0.09}px)`,
            animation: `atlas-glow ${t.breathe} ease-in-out infinite`,
          }}
        />

        {t.rings && <SaturnRing half="back" size={size} t={t} />}

        <div
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{
            // Dark glass body: near-black tinted interior, bright thin rim, soft bloom
            background: `radial-gradient(circle at 50% 50%, color-mix(in oklab, ${c} 8%, oklch(0.09 0.035 265)) 0%, color-mix(in oklab, ${c} 10%, oklch(0.06 0.03 265)) 62%, color-mix(in oklab, ${c} 34%, oklch(0.08 0.03 265)) 88%, color-mix(in oklab, ${cs} 92%, transparent) 100%)`,
            boxShadow: `inset 0 0 ${size * 0.05}px color-mix(in oklab, ${cs} ${75 * t.glow}%, transparent), inset 0 ${size * 0.02}px ${size * 0.1}px oklch(0 0 0 / 55%), 0 0 ${size * 0.06}px color-mix(in oklab, ${cs} ${80 * t.glow}%, transparent), 0 0 ${size * 0.28}px color-mix(in oklab, ${c} ${55 * t.glow}%, transparent)`,
            border: `1.5px solid color-mix(in oklab, ${cs} ${88 * Math.min(1, t.glow)}%, transparent)`,
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              inset: "6%",
              background: `radial-gradient(circle at 50% 68%, color-mix(in oklab, ${c} ${16 * t.core}%, transparent) 0%, transparent 58%)`,
              boxShadow: `inset 0 0 ${size * 0.16}px oklch(0 0 0 / 78%)`,
            }}
          />


          {t.travel && (
            <div
              className="absolute rounded-full"
              style={{
                inset: "12%",
                background: `conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, ${cs} 65%, transparent) 40deg, transparent 110deg)`,
                animation: "atlas-orbit-light 4.5s linear infinite",
                filter: `blur(${size * 0.02}px)`,
                maskImage: "radial-gradient(circle, transparent 52%, black 62%, black 100%)",
              }}
            />
          )}

          <div
            className="absolute rounded-full"
            style={{
              top: "7%",
              left: "12%",
              width: "58%",
              height: "40%",
              borderRadius: "50% 50% 60% 40% / 60% 60% 40% 40%",
              transform: "rotate(-16deg)",
              background:
                "radial-gradient(ellipse at 38% 26%, oklch(1 0 0 / 78%) 0%, oklch(1 0 0 / 30%) 32%, oklch(1 0 0 / 6%) 58%, transparent 76%)",
              filter: `blur(${size * 0.016}px)`,
            }}
          />
          {/* tight specular dot */}
          <div
            className="absolute rounded-full"
            style={{
              top: "11%",
              left: "20%",
              width: "16%",
              height: "11%",
              transform: "rotate(-20deg)",
              background: "radial-gradient(ellipse, oklch(1 0 0 / 92%) 0%, oklch(1 0 0 / 25%) 55%, transparent 78%)",
              filter: `blur(${size * 0.008}px)`,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              bottom: "3%",
              left: "50%",
              marginLeft: "-30%",
              width: "60%",
              height: "20%",
              background: `radial-gradient(ellipse at 50% 100%, color-mix(in oklab, ${cs} ${70 * t.glow}%, transparent) 0%, transparent 72%)`,
              filter: `blur(${size * 0.035}px)`,
            }}
          />

          {/* Eyes — two vertical rounded pills in a lighter tint of the state color */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ gap: size * 0.13 }}
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: size * 0.085,
                  height: size * 0.2,
                  background: `linear-gradient(180deg, color-mix(in oklab, ${cs} 92%, white 30%), ${cs})`,
                  boxShadow: `0 0 ${size * 0.07}px color-mix(in oklab, ${cs} 85%, transparent), inset 0 0 ${size * 0.02}px oklch(1 0 0 / 60%)`,
                  transform: blink ? "scaleY(0.08)" : "scaleY(1)",
                  transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                  ...(state === "speaking"
                    ? { animation: `atlas-talk 1.9s ease-in-out ${i * 0.12}s infinite` }
                    : null),
                }}
              />
            ))}
          </div>
        </div>

        {t.rings && <SaturnRing half="front" size={size} t={t} />}

        {t.particles && (
          <div className="pointer-events-none absolute inset-0">
            {[
              { left: "8%", top: "22%", d: 0 },
              { left: "88%", top: "34%", d: 0.9 },
              { left: "18%", top: "76%", d: 1.7 },
              { left: "78%", top: "82%", d: 2.4 },
              { left: "50%", top: "4%", d: 3.1 },
            ].map((p, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: p.left,
                  top: p.top,
                  width: size * 0.022,
                  height: size * 0.022,
                  background: cs,
                  boxShadow: `0 0 ${size * 0.04}px color-mix(in oklab, ${c} 80%, transparent)`,
                  animation: `atlas-particle 3.6s ease-in-out ${p.d}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {t.waves && (
          <>
            {[
              { side: "left" as const, offset: -0.1 },
              { side: "right" as const, offset: -0.1 },
            ].map((w, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  [w.side]: size * w.offset,
                  width: size * 0.12,
                  height: size * 0.5,
                  borderRadius: "50%",
                  border: `1.5px solid color-mix(in oklab, ${cs} 70%, transparent)`,
                  borderTopColor: "transparent",
                  borderBottomColor: "transparent",
                  [w.side === "left" ? "borderRightColor" : "borderLeftColor"]: "transparent",
                  filter: `drop-shadow(0 0 ${size * 0.03}px color-mix(in oklab, ${c} 70%, transparent))`,
                  animation: `atlas-wave 1.8s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </>
        )}

        {t.ripple && (
          <>
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: `1px solid color-mix(in oklab, ${cs} 55%, transparent)`,
                animation: "atlas-ripple 2.6s ease-out infinite",
              }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: `1px solid color-mix(in oklab, ${c} 45%, transparent)`,
                animation: "atlas-ripple 2.6s ease-out 1.3s infinite",
              }}
            />
          </>
        )}
      </div>

      {reflection && (
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-[100%]"
          style={{
            bottom: 0,
            width: size * 0.9,
            height: size * 0.09,
            background: `radial-gradient(ellipse, color-mix(in oklab, ${c} ${55 * t.glow}%, transparent) 0%, transparent 72%)`,
            filter: `blur(${size * 0.02}px)`,
          }}
        />
      )}
    </div>
  );
}

type Tuning = (typeof stateTuning)[OrbState];

/** A 3D Saturn-style energy ring. Rendered twice: the far half behind the sphere,
 *  the near half in front of it, which creates true depth. */
function SaturnRing({ half, size, t }: { half: "back" | "front"; size: number; t: Tuning }) {
  const c = t.color;
  const cs = t.soft;
  const w = size * 1.68;
  const clip = half === "back" ? "inset(0 0 50% 0)" : "inset(50% 0 0 0)";
  const spin = t.ringSpin || 24;

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        width: w,
        height: w,
        marginLeft: -w / 2,
        marginTop: -w / 2,
        clipPath: clip,
        transform: "rotateX(74deg) rotateZ(-14deg)",
        transformStyle: "preserve-3d",
        zIndex: half === "back" ? 0 : 30,
      }}
    >
      {/* ring body + neon bloom */}
      {[
        { inset: "0%", border: 2, op: 0.95 },
        { inset: "5.5%", border: 1, op: 0.5 },
      ].map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            inset: r.inset,
            border: `${r.border}px solid color-mix(in oklab, ${cs} ${Math.min(96, r.op * 100 * t.glow)}%, transparent)`,
            boxShadow: `0 0 ${size * 0.045}px color-mix(in oklab, ${c} ${75 * t.glow}%, transparent), 0 0 ${size * 0.16}px color-mix(in oklab, ${c} ${38 * t.glow}%, transparent), inset 0 0 ${size * 0.05}px color-mix(in oklab, ${c} ${45 * t.glow}%, transparent)`,
            filter: `drop-shadow(0 0 ${size * 0.03}px color-mix(in oklab, ${c} 70%, transparent))`,
            ...(t.ringPulse
              ? { animation: `atlas-ring-pulse ${i === 0 ? 2.6 : 3.4}s ease-in-out ${i * 0.4}s infinite` }
              : null),
          }}
        />
      ))}

      {/* flowing energy sweep along the ring */}
      {t.ringSweep && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, color-mix(in oklab, ${cs} 85%, transparent) 55deg, transparent 130deg)`,
            maskImage: "radial-gradient(circle, transparent 46%, black 49%, black 51%, transparent 54%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 46%, black 49%, black 51%, transparent 54%)",
            filter: `blur(${size * 0.006}px)`,
            animation: `atlas-spin-slow ${spin}s linear infinite`,
          }}
        />
      )}

      {/* particles riding the ring */}
      {t.ringParticles &&
        [0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              animation: `atlas-spin-slow ${spin * (1 + i * 0.18)}s linear infinite`,
              transform: `rotate(${i * 90}deg)`,
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                left: "50%",
                top: `-${size * 0.008}px`,
                width: size * 0.024,
                height: size * 0.024,
                marginLeft: -size * 0.012,
                background: cs,
                boxShadow: `0 0 ${size * 0.05}px color-mix(in oklab, ${c} 85%, transparent)`,
                animation: `atlas-ring-particle ${2.2 + i * 0.4}s ease-in-out infinite`,
              }}
            />
          </div>
        ))}

      {/* occasional energy flare */}
      {t.ringFlare && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1.5px solid color-mix(in oklab, white 45%, ${cs})`,
            boxShadow: `0 0 ${size * 0.1}px color-mix(in oklab, ${c} 90%, transparent)`,
            animation: "atlas-ring-flare 4.4s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}
