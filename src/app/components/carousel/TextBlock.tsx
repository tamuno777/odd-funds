import PrimaryLink from "../Link";

interface SlideData {
  badge: string;
  title: string[];
  titleAccent: boolean[];
  sub: string;
  cta1: string;
  cta1Route: string;
  cta2: string;
  cta2Route: string;
  stats: { num: string; label: string }[];
  image: string;
  floatLeft: { icon: React.ElementType; label: string; val: string };
  floatRight: { icon: React.ElementType; label: string; val: string };
}

export const TextBlock = ({ slide }: { slide: SlideData }) => (
  <>
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5 border text-customPrimary"
      style={{ background: "#eff4ff", borderColor: "#c7d7fc" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
      {slide.badge}
    </div>

    <h1
      className="font-bold leading-tight mb-4"
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "clamp(1.85rem, 4vw, 3.25rem)",
        color: "#111827",
      }}
    >
      {slide.title.map((part, i) =>
        slide.titleAccent[i] ? (
          <span key={i} className="text-customPrimary">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </h1>

    <p className="text-sm md:text-base leading-relaxed mb-8 max-w-md" style={{ color: "#6b7280" }}>
      {slide.sub}
    </p>

    <div className="flex gap-3 flex-wrap">
      <PrimaryLink href={slide.cta1Route} variant="primary">{slide.cta1}</PrimaryLink>
      <PrimaryLink href={slide.cta2Route} variant="secondary">{slide.cta2}</PrimaryLink>
    </div>

    <div className="flex gap-8 mt-8 pt-6 border-t flex-wrap" style={{ borderColor: "#e5e7eb" }}>
      {slide.stats.map((s, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#111827" }}>
            {s.num}
          </span>
          <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>{s.label}</span>
        </div>
      ))}
    </div>
  </>
);

export const MobileTextBlock = ({ slide }: { slide: SlideData }) => (
  <div className="w-full max-w-lg">
    <div className="flex justify-center mb-5">
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border text-customPrimary"
        style={{ background: "#eff4ff", borderColor: "#c7d7fc" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
        {slide.badge}
      </div>
    </div>

    <h1
      className="font-bold leading-tight mb-4"
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "clamp(1.85rem, 6vw, 2.5rem)",
        color: "#111827",
      }}
    >
      {slide.title.map((part, i) =>
        slide.titleAccent[i] ? (
          <span key={i} className="text-customPrimary">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </h1>

    <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto" style={{ color: "#6b7280" }}>
      {slide.sub}
    </p>

    <div className="flex gap-3 flex-wrap justify-center">
      <PrimaryLink href={slide.cta1Route} variant="primary">{slide.cta1}</PrimaryLink>
      <PrimaryLink href={slide.cta2Route} variant="secondary">{slide.cta2}</PrimaryLink>
    </div>

    <div className="flex gap-8 mt-8 pt-6 border-t justify-center flex-wrap" style={{ borderColor: "#e5e7eb" }}>
      {slide.stats.map((s, i) => (
        <div key={i} className="flex flex-col gap-0.5 items-center">
          <span className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#111827" }}>
            {s.num}
          </span>
          <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>{s.label}</span>
        </div>
      ))}
    </div>
  </div>
);


