import { useEffect, useRef, useState, type ReactNode } from "react";
import { createTopDockController, type TopDockOptions } from "./topDockController";
import { dbsTrackingUrl } from "../../data/siteContent";

export const ANIMATED_TOP_DOCK_VARIANTS = ["sable", "modern", "retro", "glass"] as const;
export type AnimatedTopDockVariant = (typeof ANIMATED_TOP_DOCK_VARIANTS)[number];

export type AnimatedTopDockProps = {
  variant?: AnimatedTopDockVariant;
  proximity?: number;
  spring?: number;
  damping?: number;
  widthGrowth?: number;
  heightGrowth?: number;
  drop?: number;
  /* retro field */
  pixelSize?: number;
  speed?: number;
  noise?: number;
  levels?: number;
  scanlines?: number;
  /* glass field */
  particles?: number;
  thickness?: number;
  dispersion?: number;
  specular?: number;
  rim?: number;
  drift?: number;
  className?: string;
};

export const ANIMATED_TOP_DOCK_DEFAULTS = {
  variant: "sable" as AnimatedTopDockVariant,
  proximity: 122,
  spring: 0.19,
  damping: 0.7,
  widthGrowth: 17,
  heightGrowth: 16,
  drop: 3.5,
  pixelSize: 4,
  speed: 1,
  noise: 1,
  levels: 7,
  scanlines: 0.32,
  particles: 22,
  thickness: 0.115,
  dispersion: 0.05,
  specular: 0.85,
  rim: 0.5,
  drift: 1,
} as const;

type DockItem = {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  sectionId?: string;
};

const ITEMS: readonly DockItem[] = [
  { id: "services", label: "DBS checks", href: "/#services", sectionId: "services", icon: <><rect x="2.25" y="2.25" width="4.5" height="4.5" rx=".8" /><rect x="9.25" y="2.25" width="4.5" height="4.5" rx=".8" /><rect x="2.25" y="9.25" width="4.5" height="4.5" rx=".8" /><rect x="9.25" y="9.25" width="4.5" height="4.5" rx=".8" /></> },
  { id: "workflow", label: "How it works", href: "/#workflow", sectionId: "workflow", icon: <><circle cx="3" cy="8" r="1.5" /><circle cx="12.5" cy="3.5" r="1.5" /><circle cx="12.5" cy="12.5" r="1.5" /><path d="M4.5 7.3 11 4.2M4.5 8.7l6.5 3.1" /></> },
  { id: "pricing", label: "Pricing", href: "/pricing", sectionId: "pricing", icon: <><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M2 6h12M5 4.5h.01M7 4.5h.01" /></> },
  { id: "faq", label: "FAQs", href: "/faq", sectionId: "faq", icon: <><circle cx="5.2" cy="6.2" r="2.7" /><path d="m7.2 8.2 5.9 5.1M10.2 10.8l1.5-1.5M12 12.4l1.4-1.4" /></> },
  { id: "contact", label: "Contact", href: "/contact", sectionId: "contact", icon: <><path d="M4 2.25h5.4L12 4.85v8.9H4z" /><path d="M9.25 2.25V5h2.7M6 8h4M6 10.5h4" /></> },
  { id: "track", label: "Track my DBS", href: dbsTrackingUrl, icon: <><circle cx="8" cy="8" r="5.5" /><path d="M8 2.5v11M2.5 8h11" /><circle cx="8" cy="8" r="2" /></> },
];

const MODERN_ITEMS: readonly DockItem[] = [
  { id: "services", label: "DBS checks", href: "/#services", sectionId: "services", icon: <><path d="M8 1.9 14.1 5v6L8 14.1 1.9 11V5z" /><path d="M1.9 5 8 8.1 14.1 5M8 8.1v6" /></> },
  { id: "workflow", label: "How it works", href: "/#workflow", sectionId: "workflow", icon: <><path d="M8 1.9 14.4 5.6 8 9.3 1.6 5.6z" /><path d="m2.6 8 5.4 3.1L13.4 8M2.6 10.7 8 13.8l5.4-3.1" /></> },
  { id: "pricing", label: "Pricing", href: "/pricing", sectionId: "pricing", icon: <><path d="M8.6 2.2H13v4.4l-6.6 6.6a1.2 1.2 0 0 1-1.7 0L2.2 10.5a1.2 1.2 0 0 1 0-1.7z" /><circle cx="10.6" cy="4.6" r=".9" /></> },
  { id: "faq", label: "FAQs", href: "/faq", sectionId: "faq", icon: <><path d="M3.4 2.4h5.4l3.8 3.8v7.4H3.4z" /><path d="M8.8 2.4v3.8h3.8M5.9 9h4.2M5.9 11.2h3" /></> },
  { id: "contact", label: "Contact", href: "/contact", sectionId: "contact", icon: <><circle cx="8" cy="8" r="5.9" /><path d="M8 4.6V8l2.4 1.5" /></> },
  { id: "track", label: "Track my DBS", href: dbsTrackingUrl, icon: <><circle cx="8" cy="8" r="5.8" /><path d="M8 2.5v2.2M8 11.3V13.5M2.5 8h2.2M11.3 8h2.2" /><circle cx="8" cy="8" r="1.8" /></> },
];

/* every retro glyph is drawn on a 7x7 lattice of whole units so the icons stay
   on the same pixel grid as the dithered field behind them */
const RETRO_ITEMS: readonly DockItem[] = [
  { id: "services", label: "DBS checks", href: "/#services", sectionId: "services", icon: <><rect x="1" y="1" width="2" height="2" /><rect x="4" y="1" width="2" height="2" /><rect x="1" y="4" width="2" height="2" /><rect x="4" y="4" width="2" height="2" /></> },
  { id: "workflow", label: "How it works", href: "/#workflow", sectionId: "workflow", icon: <><rect x="1" y="0" width="4" height="1" /><rect x="1" y="1" width="1" height="5" /><rect x="5" y="1" width="1" height="5" /><rect x="1" y="6" width="5" height="1" /><rect x="2" y="2" width="3" height="1" /><rect x="2" y="4" width="3" height="1" /></> },
  { id: "pricing", label: "Pricing", href: "/pricing", sectionId: "pricing", icon: <><rect x="3" y="0" width="1" height="7" /><rect x="0" y="3" width="7" height="1" /><rect x="1" y="1" width="1" height="1" /><rect x="5" y="1" width="1" height="1" /><rect x="1" y="5" width="1" height="1" /><rect x="5" y="5" width="1" height="1" /></> },
  { id: "faq", label: "FAQs", href: "/faq", sectionId: "faq", icon: <><rect x="0" y="1" width="7" height="5" /><rect x="2" y="0" width="3" height="2" /><rect x="1" y="4" width="5" height="1" /></> },
  { id: "contact", label: "Contact", href: "/contact", sectionId: "contact", icon: <><rect x="2" y="0" width="3" height="1" /><rect x="4" y="1" width="2" height="2" /><rect x="3" y="3" width="2" height="1" /><rect x="3" y="4" width="1" height="1" /><rect x="3" y="6" width="1" height="1" /></> },
  { id: "track", label: "Track my DBS", href: dbsTrackingUrl, icon: <><rect x="1" y="1" width="5" height="5" /><rect x="2" y="2" width="3" height="3" /><rect x="3" y="3" width="1" height="1" /></> },
];

const GLASS_ITEMS: readonly DockItem[] = [
  { id: "services", label: "DBS checks", href: "/#services", sectionId: "services", icon: <><circle cx="8" cy="8" r="5.8" /><path d="M2.4 8c2.4-3.5 9-3.5 11.3 0" /></> },
  { id: "workflow", label: "How it works", href: "/#workflow", sectionId: "workflow", icon: <><rect x="2.2" y="2.2" width="11.6" height="11.6" rx="3.6" /><circle cx="8" cy="8" r="2.5" /></> },
  { id: "pricing", label: "Pricing", href: "/pricing", sectionId: "pricing", icon: <><rect x="2.1" y="2.6" width="3" height="10.8" rx="1" /><rect x="6.4" y="2.6" width="3" height="10.8" rx="1" /><path d="m10.9 3.7 2.9 1-2.4 8.6-2.2-.8" /></> },
  { id: "faq", label: "FAQs", href: "/faq", sectionId: "faq", icon: <><path d="M1.8 10.6c2.6 0 3-5.2 6.2-5.2s3.6 5.2 6.2 5.2" /><circle cx="8" cy="5.4" r=".9" /></> },
  { id: "contact", label: "Contact", href: "/contact", sectionId: "contact", icon: <><path d="M6.4 2.2v4L3 12.1a1.3 1.3 0 0 0 1.1 2h7.8a1.3 1.3 0 0 0 1.1-2L9.6 6.2v-4" /><path d="M5.6 2.2h4.8M4.9 9.6h6.2" /></> },
  { id: "track", label: "Track my DBS", href: dbsTrackingUrl, icon: <><circle cx="8" cy="8" r="5.5" /><circle cx="8" cy="8" r="2" /><path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3" /></> },
];

const VARIANT_ITEMS: Record<AnimatedTopDockVariant, readonly DockItem[]> = {
  sable: ITEMS,
  modern: MODERN_ITEMS,
  retro: RETRO_ITEMS,
  glass: GLASS_ITEMS,
};

const BRAND_MARK = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect width="24" height="24" rx="4.5" fill="#E8E8E3" />
    <path d="M6 6h8.6L18 9.35v8.15H9.15L6 14.35V6Z" fill="#111" />
    <path d="M9 9h5.15L15 9.85V15H9.85L9 14.15V9Z" fill="#E8E8E3" />
    <path d="M12 9v6M9 12h6" stroke="#111" strokeWidth=".7" />
  </svg>
);

function useDockController(getOptions: () => TopDockOptions) {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    return createTopDockController(root, getOptions);
    /* the getter is a stable ref reader, so the controller is built once */
  }, []);
  return rootRef;
}

type ShaderField = {
  resize: (width: number, height: number) => void;
  render: (now: number) => void;
  setPointer?: (x: number, y: number) => void;
  dispose: () => void;
};

/* both shader variants share the same host lifecycle: measure from the shell,
   pause off-screen and on a hidden tab, and hand the renderer a css-pixel box.
   The module is resolved in its own effect so the effect that owns the GL
   context can create and tear it down synchronously — an async create survives
   its own cleanup and leaves two renderers fighting over one canvas. */
function useShaderField(active: boolean, load: () => Promise<(canvas: HTMLCanvasElement) => ShaderField>) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [factory, setFactory] = useState<{ create: (canvas: HTMLCanvasElement) => ShaderField } | null>(null);

  useEffect(() => {
    if (!active) return undefined;
    let cancelled = false;
    load().then((create) => { if (!cancelled) setFactory({ create }); });
    return () => { cancelled = true; };
  }, [active]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!active || !factory || !host || !canvas) return undefined;
    const field = factory.create(canvas);
    let frame = 0;
    let visible = true;
    let bounds = host.getBoundingClientRect();
    const resize = () => {
      bounds = host.getBoundingClientRect();
      field.resize(bounds.width, bounds.height);
    };
    const tick = (now: number) => {
      field.resize(bounds.width, bounds.height);
      field.render(now);
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };
    const onPointerMove = (event: PointerEvent) => {
      field.setPointer?.(
        ((event.clientX - bounds.left) / Math.max(1, bounds.width)) * 2 - 1,
        -((((event.clientY - bounds.top) / Math.max(1, bounds.height)) * 2) - 1),
      );
    };
    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame) frame = requestAnimationFrame(tick);
      if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; }
    });
    resizeObserver.observe(host);
    intersection.observe(host);
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    resize();
    frame = requestAnimationFrame(tick);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      field.dispose();
    };
  }, [active, factory]);

  return { hostRef, canvasRef };
}

export function AnimatedTopDock({ className = "", ...props }: AnimatedTopDockProps) {
  const optionsRef = useRef({ ...ANIMATED_TOP_DOCK_DEFAULTS, ...props });
  optionsRef.current = { ...ANIMATED_TOP_DOCK_DEFAULTS, ...props };
  const variant = optionsRef.current.variant;
  const items = VARIANT_ITEMS[variant] ?? ITEMS;
  const getActiveId = () => {
    if (typeof window === "undefined") return items[0]?.id ?? "services";
    const path = window.location.pathname;
    const hash = window.location.hash.toLowerCase();
    if (path === "/pricing" || hash === "#pricing") return "pricing";
    if (path === "/faq" || hash === "#faq" || hash === "#faqs") return "faq";
    if (path === "/contact" || hash === "#contact") return "contact";
    if (path === "/employers" || hash === "#services" || hash === "#dbs-checks") return "services";
    if (hash === "#workflow" || hash === "#how-it-works") return "workflow";
    return items[0]?.id ?? "services";
  };

  const [active, setActive] = useState(getActiveId);

  useEffect(() => {
    const handleLocationChange = () => {
      setActive(getActiveId());
    };
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, [items]);

  /* one spring, three fits: the command bar pins its track so a bar sized to its
     own content never moves, the terminal renormalises its cells across the
     strip, and the glass rail runs the proximity field down the y axis */
  const rootRef = useDockController(() => ({
    ...optionsRef.current,
    axis: variant === "glass" ? ("y" as const) : ("x" as const),
    distribute: variant === "retro",
    lockTrack: variant === "modern",
  }));

  const retro = useShaderField(variant === "retro", async () => {
    const { createRetroPixelField } = await import("./retroPixelField");
    return (canvas: HTMLCanvasElement) =>
      createRetroPixelField(canvas, () => ({
        pixelSize: optionsRef.current.pixelSize,
        noise: optionsRef.current.noise,
        levels: optionsRef.current.levels,
        speed: optionsRef.current.speed,
      }));
  });
  const glass = useShaderField(variant === "glass", async () => {
    const { createGlassParticleField } = await import("./glassParticleField");
    return (canvas: HTMLCanvasElement) =>
      createGlassParticleField(canvas, () => ({
        count: optionsRef.current.particles,
        thickness: optionsRef.current.thickness,
        dispersion: optionsRef.current.dispersion,
        specular: optionsRef.current.specular,
        rim: optionsRef.current.rim,
        drift: optionsRef.current.drift,
      }));
  });

  const navigateTo = (e: React.MouseEvent, item: DockItem) => {
    setActive(item.id);
    const isHomePage =
      typeof window !== "undefined" &&
      (window.location.pathname === "/" || window.location.pathname.endsWith("/index.html"));

    // Case 1: If on home page and clicking a section on the home page
    if (item.sectionId && isHomePage) {
      const el =
        document.getElementById(item.sectionId) ||
        document.querySelector(`#${item.sectionId}`);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `#${item.sectionId}`);
        return;
      }
    }

    // Case 2: Hash link meant for the home page (e.g. "/#services", "/#workflow")
    if (item.href?.startsWith("/#")) {
      e.preventDefault();
      if (isHomePage) {
        const hash = item.href.replace("/#", "");
        const el = document.getElementById(hash) || document.querySelector(`#${hash}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${hash}`);
        }
      } else {
        window.history.pushState(null, "", item.href);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
      return;
    }

    // Case 3: Page route (e.g. "/pricing", "/faq", "/contact")
    if (item.href?.startsWith("/")) {
      e.preventDefault();
      if (window.location.pathname !== item.href) {
        window.history.pushState(null, "", item.href);
        window.dispatchEvent(new PopStateEvent("popstate"));
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Case 4: External URL (e.g. "https://www.dbs-express.co.uk/app/login_direct")
    if (item.href?.startsWith("http")) {
      return;
    }
  };

  const dockItems = (itemClass: string, iconClass: string, viewBox: string) =>
    items.map((item) => {
      const isExternal = item.href?.startsWith("http");
      return (
        <a
          key={item.id}
          href={item.href ?? "#"}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
          className={itemClass}
          data-dock-item
          role="button"
          tabIndex={0}
          aria-label={item.label}
          title={item.label}
          aria-pressed={active === item.id}
          onClick={(e) => navigateTo(e, item)}
        >
          <span className={iconClass} aria-hidden="true">
            <svg viewBox={viewBox}>{item.icon}</svg>
          </span>
          <span>{item.label}</span>
        </a>
      );
    });

  if (variant === "modern") {
    return (
      <div className={`animated-top-dock-component atd-modern${className ? ` ${className}` : ""}`}>
        <div className="atd-modern__aurora" aria-hidden="true" />
        <header className="atd-modern__bar">
          <a
            className="atd-modern__brand"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              if (window.location.pathname !== "/" && !window.location.pathname.endsWith("/index.html")) {
                window.history.pushState(null, "", "/");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="atd-modern__mark" aria-hidden="true">{BRAND_MARK}</span>
            <span className="atd-modern__word">Lumina</span>
          </a>
          <nav ref={rootRef} className="atd-modern__dock" aria-label="Primary" data-dock-state="idle" data-dock-max="0.00">
            {dockItems("atd-modern__item", "atd-modern__icon", "0 0 16 16")}
          </nav>
          <div className="atd-modern__actions">
            <a
              className="atd-modern__ghost"
              href="https://www.dbs-express.co.uk/app/login_direct"
              target="_blank"
              rel="noreferrer"
            >
              Sign in
            </a>
            <a
              className="atd-modern__cta"
              href="/contact"
              onClick={(event) => {
                const isHomePage =
                  window.location.pathname === "/" || window.location.pathname.endsWith("/index.html");
                const contactEl = document.getElementById("contact");
                if (isHomePage && contactEl) {
                  event.preventDefault();
                  contactEl.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", "#contact");
                } else if (!isHomePage) {
                  event.preventDefault();
                  window.history.pushState(null, "", "/contact");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <span>Start building</span>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.2 8h9.1M8.6 4.3 12.4 8l-3.8 3.7" /></svg>
            </a>
          </div>
        </header>
        <div className="atd-modern__stage" aria-hidden="true">
          <p className="atd-modern__eyebrow">Interface systems</p>
          <p className="atd-modern__headline">Everything above the fold</p>
        </div>
        <p className="animated-top-dock-component__caption">LOGO LEFT · DOCK CENTRE · ACTION RIGHT</p>
      </div>
    );
  }

  if (variant === "retro") {
    return (
      <div
        ref={retro.hostRef}
        className={`animated-top-dock-component atd-retro${className ? ` ${className}` : ""}`}
        style={{ "--atd-retro-scan": optionsRef.current.scanlines } as React.CSSProperties}
      >
        <canvas ref={retro.canvasRef} className="atd-retro__field" aria-hidden="true" />
        <div className="atd-retro__vignette" aria-hidden="true" />
        <header className="atd-retro__bar">
          <div className="atd-retro__brand">
            <span className="atd-retro__badge" aria-hidden="true">
              <svg viewBox="0 0 7 7"><rect x="0" y="2" width="7" height="3" /><rect x="2" y="0" width="3" height="7" /></svg>
            </span>
            SABLE//OS
          </div>
          <nav ref={rootRef} className="atd-retro__dock" aria-label="Primary" data-dock-state="idle" data-dock-max="0.00">
            {dockItems("atd-retro__item", "atd-retro__icon", "0 0 7 7")}
          </nav>
          <button className="atd-retro__cta" type="button">
            <span aria-hidden="true">▶</span>
            RUN
          </button>
        </header>
        <p className="atd-retro__readout">
          <span>MEM 640K</span>
          <span>DITHER 8×8</span>
          <span>PAL 8</span>
        </p>
        <p className="animated-top-dock-component__caption">FITTED STRIP · ORDERED DITHER</p>
      </div>
    );
  }

  if (variant === "glass") {
    return (
      <div ref={glass.hostRef} className={`animated-top-dock-component atd-glass${className ? ` ${className}` : ""}`} data-dock-frame>
        <canvas ref={glass.canvasRef} className="atd-glass__field" aria-hidden="true" />
        <header className="atd-glass__rail">
          <a className="atd-glass__brand" href="#top-dock" onClick={(event) => event.preventDefault()}>
            <span className="atd-glass__mark" aria-hidden="true">{BRAND_MARK}</span>
            <span className="atd-glass__word">Aperture</span>
          </a>
          <span className="atd-glass__hairline" aria-hidden="true" />
          <nav ref={rootRef} className="atd-glass__dock" aria-label="Primary" data-dock-state="idle" data-dock-max="0.00">
            {dockItems("atd-glass__item", "atd-glass__icon", "0 0 16 16")}
          </nav>
          <span className="atd-glass__hairline" aria-hidden="true" />
          <button className="atd-glass__cta" type="button">
            Get the app
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.4 8h9.2M8.8 4.2 12.6 8l-3.8 3.8" /></svg>
          </button>
        </header>
        <p className="animated-top-dock-component__caption">VERTICAL RAIL · SCREEN-SPACE DISPERSION</p>
      </div>
    );
  }

  return (
    <div className={`animated-top-dock-component${className ? ` ${className}` : ""}`}>
      <nav ref={rootRef} className="animated-top-dock__nav" aria-label="Animated top dock" data-dock-state="idle" data-dock-max="0.00">
        <button className="animated-top-dock__item animated-top-dock__logo" data-dock-item type="button" aria-label="Home" onClick={() => setActive("system")}>
          {BRAND_MARK}
        </button>
        {items.map((item) => (
          <button key={item.id} className="animated-top-dock__item animated-top-dock__link" data-dock-item type="button" aria-pressed={active === item.id} onClick={() => setActive(item.id)}>
            <span className="animated-top-dock__icon" aria-hidden="true"><svg viewBox="0 0 16 16">{item.icon}</svg></span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <p className="animated-top-dock-component__caption">MOVE ACROSS THE DOCK · FOCUS WITH TAB</p>
    </div>
  );
}
