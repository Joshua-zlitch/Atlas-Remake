import { Orb } from "./Orb";

export function Splash({ hiding }: { hiding: boolean }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700"
      style={{
        opacity: hiding ? 0 : 1,
        pointerEvents: hiding ? "none" : "auto",
        transitionTimingFunction: "var(--ease-calm)",
      }}
    >
      <Orb size={190} state="idle" />
      <h1 className="mt-6 font-display text-3xl font-light tracking-[0.32em] text-foreground">
        ATLAS
      </h1>
      <p className="mt-3 text-[13px] text-muted-foreground">Preparing your workspace...</p>
    </div>
  );
}
