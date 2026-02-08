export default function Background() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#140B29]"
      aria-hidden="true"
    >
      {/* Primary teal blob - top left area */}
      <div
        data-blob
        className="absolute -top-[20%] -left-[15%] w-[70%] h-[60%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(18, 65, 80, 0.12) 0%, rgba(18, 65, 80, 0.04) 40%, transparent 70%)",
        }}
      />

      {/* Secondary deep blue blob - center right */}
      <div
        data-blob
        className="absolute top-[15%] -right-[10%] w-[60%] h-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20, 45, 75, 0.1) 0%, rgba(20, 45, 75, 0.03) 45%, transparent 70%)",
        }}
      />

      {/* Tertiary subtle glow - bottom center */}
      <div
        data-blob
        className="absolute -bottom-[15%] left-[20%] w-[50%] h-[45%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(25, 70, 65, 0.08) 0%, rgba(25, 70, 65, 0.02) 40%, transparent 65%)",
        }}
      />

      {/* Small accent glow - mid left */}
      <div
        data-blob
        className="absolute top-[45%] -left-[5%] w-[35%] h-[30%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(30, 55, 70, 0.6) 0%, transparent 50%)",
        }}
      />

      {/* Tiny accent - top right */}
      <div
        data-blob
        className="absolute top-[5%] right-[15%] w-[25%] h-[20%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(15, 50, 60, 0.05) 0%, transparent 55%)",
        }}
      />
    </div>
  )
}
