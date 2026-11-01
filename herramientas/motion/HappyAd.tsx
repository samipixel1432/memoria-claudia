import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import {
  AbsoluteFill,
  Img,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ease, enterStyle, progress, springAt, springs } from "../lib/motion";
import { useScale } from "../lib/useScale";

// Anuncios del Happy Cleaner (Tovelya). Es un alimento: el texto habla de sabor y preparación, nunca de salud.
// Sin audio: Samuel le pone la música en Meta o CapCut.
// Colores de la sandía + botón naranja de Tovelya. Tipografía Inter Display local (no depende de internet).

const C = {
  rojo: "#C8102E",
  rojoOscuro: "#7A0A1C",
  blanco: "#FFFFFF",
  verde: "#2FBF71",
  naranja: "#FF8A1F",
  naranjaClaro: "#FFB547",
  tinta: "#0F223B",
};
const FONT = "InterDisplayLocal";
const T = 10; // frames de transición

const Fuentes: React.FC = () => (
  <style>{`
    @font-face { font-family: ${FONT}; font-weight: 800; src: url(${staticFile("fonts/InterDisplay-ExtraBold.otf")}); }
    @font-face { font-family: ${FONT}; font-weight: 700; src: url(${staticFile("fonts/InterDisplay-Bold.otf")}); }
    @font-face { font-family: ${FONT}; font-weight: 500; src: url(${staticFile("fonts/InterDisplay-Medium.otf")}); }
  `}</style>
);

/** Fondo de clip a pantalla completa, con un zoom muy lento para que no se sienta quieto. */
const Clip: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const s = interpolate(frame, [0, durationInFrames], [1.02, 1.08]);
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: C.rojoOscuro }}>
      <OffthreadVideo
        src={staticFile(`happy/${src}`)}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${s})` }}
      />
    </AbsoluteFill>
  );
};

/** Foto cuadrada: fondo borroso de la misma foto y la foto en una tarjeta, para no cortar el tarro. */
const Foto: React.FC<{ src: string; zoomIn?: boolean }> = ({ src, zoomIn }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { u, isVertical } = useScale();
  const entra = springAt(frame, fps, 0, springs.smooth);
  const pan = interpolate(frame, [0, durationInFrames], zoomIn ? [1.12, 1.0] : [1.0, 1.06], { easing: ease.inOut });
  const lado = isVertical ? 960 * u : 720 * u;
  return (
    <AbsoluteFill style={{ backgroundColor: C.rojoOscuro }}>
      <Img
        src={staticFile(`happy/${src}`)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(40px) brightness(0.7)", transform: "scale(1.2)" }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: isVertical ? "40%" : "36%",
          width: lado,
          height: lado,
          marginLeft: -lado / 2,
          marginTop: -lado / 2,
          borderRadius: 44 * u,
          overflow: "hidden",
          boxShadow: `0 ${30 * u}px ${80 * u}px rgba(0,0,0,.45)`,
          opacity: entra,
          transform: `translateY(${(1 - entra) * 30 * u}px) scale(${0.96 + 0.04 * entra})`,
        }}
      >
        <Img src={staticFile(`happy/${src}`)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${pan})` }} />
      </div>
    </AbsoluteFill>
  );
};

/** Texto principal: cápsula roja que entra palabra por palabra. Va en la zona segura (ni arriba ni en el 20 % de abajo).
 *  Un "|" en el texto marca el salto de línea, para que no quede una palabra sola abajo. */
const Titular: React.FC<{ texto: string; delay?: number }> = ({ texto, delay = 6 }) => {
  const frame = useCurrentFrame();
  const { u, isVertical } = useScale();
  const palabras = texto.replace(/\|/g, " | ").split(" ").filter(Boolean);
  const caja = progress(frame, delay - 4, 14);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: isVertical ? "24%" : "9%" }}>
      <div
        style={{
          maxWidth: "88%",
          padding: `${22 * u}px ${38 * u}px`,
          borderRadius: 34 * u,
          background: C.rojo,
          boxShadow: `0 ${18 * u}px ${50 * u}px rgba(0,0,0,.35)`,
          textAlign: "center",
          opacity: caja,
          transform: `translateY(${(1 - caja) * 20 * u}px) scale(${0.96 + 0.04 * caja})`,
        }}
      >
        {palabras.map((p, i) => {
          if (p === "|") return <br key={i} />;
          const pp = progress(frame, delay + i * 4, 16);
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: i < palabras.length - 1 ? 18 * u : 0,
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: (isVertical ? 92 : 84) * u,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: C.blanco,
                ...enterStyle(pp, 18 * u),
              }}
            >
              {p}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Cierre: título, botón naranja con un pulso suave y la línea de pago contra entrega. */
const Cierre: React.FC<{ foto: string; titulo: string }> = ({ foto, titulo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, isVertical } = useScale();
  const a = springAt(frame, fps, 4, springs.snappy);
  const b = springAt(frame, fps, 12, springs.snappy);
  const c = progress(frame, 20, 14);
  const pulso = 1 + 0.035 * Math.max(0, Math.sin(((frame - 40) / 18) * Math.PI)) * (frame > 40 ? 1 : 0);
  const lado = isVertical ? 880 * u : 500 * u;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(70% 55% at 50% 30%, #E8344F 0%, ${C.rojo} 55%, ${C.rojoOscuro} 100%)`,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: isVertical ? "15%" : "5%",
      }}
    >
      <div
        style={{
          width: lado,
          height: lado,
          borderRadius: 48 * u,
          overflow: "hidden",
          boxShadow: `0 ${30 * u}px ${80 * u}px rgba(0,0,0,.4)`,
          opacity: a,
          transform: `translateY(${(1 - a) * 40 * u}px) scale(${0.96 + 0.04 * a})`,
        }}
      >
        <Img src={staticFile(`happy/${foto}`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div
        style={{
          marginTop: 44 * u,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: (isVertical ? 86 : 64) * u,
          color: C.blanco,
          letterSpacing: "-0.02em",
          textAlign: "center",
          ...enterStyle(b, 20 * u),
        }}
      >
        {titulo}
      </div>
      <div
        style={{
          marginTop: 30 * u,
          padding: `${26 * u}px ${56 * u}px`,
          borderRadius: 999,
          background: `linear-gradient(135deg, ${C.naranjaClaro} 0%, ${C.naranja} 100%)`,
          color: C.tinta,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: (isVertical ? 66 : 50) * u,
          boxShadow: `0 ${16 * u}px ${40 * u}px rgba(0,0,0,.3)`,
          opacity: b,
          transform: `translateY(${(1 - b) * 24 * u}px) scale(${(0.96 + 0.04 * b) * pulso})`,
        }}
      >
        Pídelo hoy · $89.900
      </div>
      <div
        style={{
          marginTop: 26 * u,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: (isVertical ? 46 : 36) * u,
          color: C.blanco,
          opacity: c * 0.95,
          transform: `translateY(${(1 - c) * 12 * u}px)`,
        }}
      >
        Pagas al recibir · Envío gratis
      </div>
    </AbsoluteFill>
  );
};

type Escena = { dur: number; fondo: React.ReactNode; texto?: string; cierre?: { foto: string; titulo: string } };

const Anuncio: React.FC<{ escenas: Escena[]; transiciones: ("fade" | "slide")[] }> = ({ escenas, transiciones }) => (
  <AbsoluteFill style={{ backgroundColor: C.rojoOscuro }}>
    <Fuentes />
    <TransitionSeries>
      {escenas.flatMap((e, i) => {
        const seq = (
          <TransitionSeries.Sequence key={`s${i}`} durationInFrames={e.dur}>
            {e.cierre ? (
              <Cierre {...e.cierre} />
            ) : (
              <AbsoluteFill>
                {e.fondo}
                {e.texto ? <Titular texto={e.texto} /> : null}
              </AbsoluteFill>
            )}
          </TransitionSeries.Sequence>
        );
        if (i === escenas.length - 1) return [seq];
        const t = transiciones[i] === "slide" ? slide({ direction: "from-bottom" }) : fade();
        return [
          seq,
          <TransitionSeries.Transition key={`t${i}`} presentation={t} timing={linearTiming({ durationInFrames: T })} />,
        ];
      })}
    </TransitionSeries>
  </AbsoluteFill>
);

const total = (dur: number[]) => dur.reduce((a, b) => a + b, 0) - (dur.length - 1) * T;

// Anuncio A — "El tarro": con los tramos limpios del video del tarro real.
const DUR_A = [84, 114, 98, 98, 96];
export const HAPPY_TARRO_DURATION = total(DUR_A);
export const HappyTarro: React.FC = () => (
  <Anuncio
    transiciones={["slide", "fade", "slide", "fade"]}
    escenas={[
      { dur: DUR_A[0], fondo: <Clip src="happy-clip-tarro.mp4" />, texto: "Tu bebida de sandía" },
      { dur: DUR_A[1], fondo: <Clip src="happy-clip-preparando.mp4" />, texto: "Una copa + agua fría" },
      { dur: DUR_A[2], fondo: <Foto src="vaso.jpg" />, texto: "Revuelves y listo" },
      { dur: DUR_A[3], fondo: <Clip src="happy-clip-tomando.mp4" />, texto: "Rica y refrescante" },
      { dur: DUR_A[4], fondo: null, cierre: { foto: "splash.jpg", titulo: "Happy Cleaner · 250 g" } },
    ]}
  />
);

// Anuncio B — "Verano": fotos de estilo de vida, más energía.
const DUR_B = [84, 94, 94, 104, 104];
export const HAPPY_VERANO_DURATION = total(DUR_B);
export const HappyVerano: React.FC = () => (
  <Anuncio
    transiciones={["fade", "slide", "fade", "slide"]}
    escenas={[
      { dur: DUR_B[0], fondo: <Foto src="splash.jpg" zoomIn />, texto: "Pura sandía|en cada vaso" },
      { dur: DUR_B[1], fondo: <Foto src="verano.jpg" />, texto: "Fría y con hielo" },
      { dur: DUR_B[2], fondo: <Foto src="amigas.jpg" />, texto: "Para compartir" },
      { dur: DUR_B[3], fondo: <Clip src="happy-clip-preparando.mp4" />, texto: "Lista en segundos" },
      { dur: DUR_B[4], fondo: null, cierre: { foto: "termo.jpg", titulo: "25 porciones por tarro" } },
    ]}
  />
);
