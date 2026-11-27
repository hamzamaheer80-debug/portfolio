import { useEffect, useRef } from "react";

export function PrecisionCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;
    let visible = false;
    let hovering = false;
    let clicking = false;
    let frameId = 0;

    const applyStates = () => {
      dot.style.opacity = visible ? "1" : "0";
      ring.style.opacity = visible ? (hovering ? "1" : "0.55") : "0";

      const dotSize = clicking ? 4 : hovering ? 46 : 8;
      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      dot.style.backgroundColor = hovering
        ? "rgba(197, 160, 89, 0.12)"
        : clicking
        ? "#e8d0a3"
        : "#c5a059";

      const ringSize = clicking ? 72 : hovering ? 64 : 40;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
      ring.style.borderColor = hovering
        ? "#FF6B50"
        : "rgba(197, 160, 89, 0.45)";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        dotX = ringX = e.clientX;
        dotY = ringY = e.clientY;
        applyStates();
      }
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      const inFormField = Boolean(target?.closest("input, textarea, select"));
      if (inFormField) {
        visible = false;
        applyStates();
        return;
      }

      const interactive = Boolean(
        target?.closest("a, button, [data-interactive]")
      );
      if (interactive !== hovering) {
        hovering = interactive;
        applyStates();
      }
    };

    const onMouseLeave = () => {
      visible = false;
      applyStates();
    };

    const onMouseDown = () => {
      clicking = true;
      applyStates();
    };

    const onMouseUp = () => {
      clicking = false;
      applyStates();
    };

    const tick = () => {
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      frameId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block rounded-full opacity-0 transition-[width,height,background-color,opacity] duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-[0_0_16px_rgba(197,160,89,0.45)]"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block rounded-full border opacity-0 transition-[width,height,border-color,opacity] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
      />
    </>
  );
}
