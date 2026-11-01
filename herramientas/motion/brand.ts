import raw from "../../brand.json";

// En la nube no hay acceso a Google Fonts (@remotion/google-fonts falla al cargar),
// así que se usa Inter Display local (public/fonts, declarada en cada composición).
// Para volver a Google Fonts en el computador: importa loadFont de @remotion/google-fonts/<Fuente>
// y usa su fontFamily aquí. Ver skills/motion-architect/references/brand.md
export const brand = {
  ...raw,
  fontDisplay: "InterDisplayLocal, system-ui, sans-serif",
  fontBody: "InterDisplayLocal, system-ui, sans-serif",
};

export type Brand = typeof brand;
