export function LiquidBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#0a0d20]">
      {/* Deep gradient base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #172460 0%, #0c1236 45%, #070919 100%)'
        }}
      />

      {/* Luminous dynamic ambient curves imitating the user's reference image */}
      <div 
        className="absolute -top-[20%] -left-[15%] w-[85vw] h-[85vw] rounded-full blur-[90px] opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, #2f4bf2 0%, #1c2a80 50%, transparent 80%)'
        }}
      />

      <div 
        className="absolute top-[20%] -right-[15%] w-[70vw] h-[70vw] rounded-full blur-[100px] opacity-35 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, #4338ca 0%, #221e68 60%, transparent 80%)'
        }}
      />

      <div 
        className="absolute -bottom-[20%] left-[20%] w-[65vw] h-[55vw] rounded-full blur-[95px] opacity-30 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, #3b82f6 0%, #1d35a6 50%, transparent 75%)'
        }}
      />

      {/* Diagonal geometric refraction sweep matching the dock's backdrop */}
      <div 
        className="absolute inset-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(ellipse 120% 80% at 70% 30%, rgba(255, 255, 255, 0.15), transparent 60%)'
        }}
      />

      {/* Fine ambient noise / texture */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-color-dodge pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
