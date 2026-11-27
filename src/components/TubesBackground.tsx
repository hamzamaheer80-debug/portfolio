import React, { useEffect, useRef, useState } from "react";

export interface TubesPalette {
  name: string;
  tubes: [string, string, string];
  lights: [string, string, string, string];
  intensity: number;
}

export const PORTFOLIO_PALETTES: TubesPalette[] = [
  {
    name: "LUMINA GOLD",
    tubes: ["#c5a059", "#b8860b", "#333333"],
    lights: ["#c5a059", "#e8d0a3", "#b8860b", "#FF6B50"],
    intensity: 200,
  },
  {
    name: "OBSIDIAN SILVER",
    tubes: ["#ebebeb", "#888888", "#333333"],
    lights: ["#ffffff", "#c0c0c0", "#888888", "#c5a059"],
    intensity: 220,
  },
  {
    name: "MIDNIGHT CORAL",
    tubes: ["#FF6B50", "#c5a059", "#1a1a1a"],
    lights: ["#FF6B50", "#c5a059", "#e8d0a3", "#ff8570"],
    intensity: 210,
  },
  {
    name: "WARM CHAMPAGNE",
    tubes: ["#e8d0a3", "#c5a059", "#1a1a1a"],
    lights: ["#e8d0a3", "#c5a059", "#b8860b", "#ebebeb"],
    intensity: 200,
  },
];

interface TubesApp {
  tubes: {
    setColors: (colors: string[]) => void;
    setLightsColors: (colors: string[]) => void;
    setLightsIntensity?: (intensity: number) => void;
  };
  dispose?: () => void;
}

export interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
  palettes?: TubesPalette[];
  onPaletteChange?: (palette: TubesPalette) => void;
}

export function TubesBackground({
  children,
  className,
  enableClickInteraction = true,
  palettes = PORTFOLIO_PALETTES,
  onPaletteChange,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesRef = useRef<TubesApp | null>(null);
  const paletteIndexRef = useRef(0);
  const spikeTimeoutRef = useRef<number | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      // Skip the 3D engine on devices without WebGL (keeps the gradient backdrop)
      const probe = document.createElement("canvas");
      const hasWebGL = Boolean(
        probe.getContext("webgl2") || probe.getContext("webgl")
      );
      if (!hasWebGL) {
        if (mounted) setHasError(true);
        return;
      }

      try {
        // Bundled locally (no third-party CDN) and code-split into its own chunk
        const module = (await import(
          "threejs-components/build/cursors/tubes1.min.js"
        )) as {
          default: (
            canvas: HTMLCanvasElement,
            options: Record<string, unknown>
          ) => TubesApp;
        };

        if (!mounted || !canvasRef.current) return;

        const initial = palettes[0];
        const app = module.default(canvasRef.current, {
          bloom: {
            threshold: 0.05,
            strength: 1.15,
            radius: 0.45,
          },
          tubes: {
            colors: initial.tubes,
            lights: {
              intensity: initial.intensity,
              colors: initial.lights,
            },
          },
        });

        tubesRef.current = app;
        onPaletteChange?.(initial);
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
        if (mounted) setHasError(true);
      }
    };

    // Defer the heavy WebGL engine until the page has painted: start on the
    // first user interaction, or once the browser is idle after load.
    const events = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"];
    let started = false;
    let idleId = 0;
    let timerId = 0;
    const start = () => {
      if (started) return;
      started = true;
      events.forEach((ev) => window.removeEventListener(ev, start));
      window.clearTimeout(timerId);
      initTubes();
    };
    events.forEach((ev) =>
      window.addEventListener(ev, start, { once: true, passive: true })
    );
    const scheduleIdle = () => {
      timerId = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(start, { timeout: 1500 });
        } else {
          start();
        }
      }, 6000);
    };
    if (document.readyState === "complete") scheduleIdle();
    else window.addEventListener("load", scheduleIdle, { once: true });

    return () => {
      mounted = false;
      events.forEach((ev) => window.removeEventListener(ev, start));
      window.removeEventListener("load", scheduleIdle);
      window.clearTimeout(timerId);
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (spikeTimeoutRef.current !== null) {
        window.clearTimeout(spikeTimeoutRef.current);
      }
      tubesRef.current?.dispose?.();
      tubesRef.current = null;
    };
  }, [palettes]);

  const cyclePalette = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableClickInteraction || !tubesRef.current) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("form, input, textarea, select")) return;

    paletteIndexRef.current = (paletteIndexRef.current + 1) % palettes.length;
    const next = palettes[paletteIndexRef.current];

    tubesRef.current.tubes.setColors(next.tubes);
    tubesRef.current.tubes.setLightsColors(next.lights);

    if (typeof tubesRef.current.tubes.setLightsIntensity === "function") {
      tubesRef.current.tubes.setLightsIntensity(next.intensity * 1.8);
      if (spikeTimeoutRef.current !== null) {
        window.clearTimeout(spikeTimeoutRef.current);
      }
      spikeTimeoutRef.current = window.setTimeout(() => {
        tubesRef.current?.tubes.setLightsIntensity?.(next.intensity);
      }, 350);
    }

    onPaletteChange?.(next);
  };

  return (
    <div
      className={["relative w-full min-h-screen bg-[#080808]", className]
        .filter(Boolean)
        .join(" ")}
      onClick={cyclePalette}
    >
      {/* Fixed full-viewport canvas layer so size:"parent" stays crisp at 100vw x 100vh while scrolling */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, rgba(26, 26, 26, 0.75) 0%, rgba(5, 5, 5, 0.95) 75%)",
          }}
        />
        {!hasError && (
          <canvas
            ref={canvasRef}
            className="relative w-full h-full block"
            style={{
              touchAction: "none",
              filter: "brightness(0.6)",
            }}
          />
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

export default TubesBackground;
