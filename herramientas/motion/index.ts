import { Demo, DEMO_DURATION } from "./Demo";
import { HAPPY_TARRO_DURATION, HAPPY_VERANO_DURATION, HappyTarro, HappyVerano } from "./HappyAd";

// Registro de composiciones. Cada entrada se publica en los formatos que indiques
// con el id "<id>-<formato>" (p. ej. "Demo-vertical").
// Para agregar un video nuevo: crea src/compositions/MiVideo.tsx y añádelo aquí.
export const compositions = [
  {
    id: "Demo",
    component: Demo,
    durationInFrames: DEMO_DURATION,
    formats: ["landscape", "vertical", "square", "portrait"],
  },
  {
    id: "HappyTarro",
    component: HappyTarro,
    durationInFrames: HAPPY_TARRO_DURATION,
    formats: ["vertical", "portrait"],
  },
  {
    id: "HappyVerano",
    component: HappyVerano,
    durationInFrames: HAPPY_VERANO_DURATION,
    formats: ["vertical", "portrait"],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  component: React.FC;
  durationInFrames: number;
  formats: ReadonlyArray<"landscape" | "vertical" | "square" | "portrait">;
}>;
