export function LiquidBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Sky Base Gradient - Lilac, lavender, and soft periwinkle */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(145deg, #cbd5e1 0%, #dbeafe 25%, #e0e7ff 50%, #ede9fe 75%, #c7d2fe 100%)'
        }}
      />

      {/* Atmospheric misty mountain landscape using SVG layers */}
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-85"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ddd6fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="farMountain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="midMountain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="nearPines" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#312e81" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="lakeWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#a5b4fc" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Far misty ridges */}
        <path
          d="M-50 480 Q 200 280, 480 370 T 960 320 T 1500 450 L 1500 900 L -50 900 Z"
          fill="url(#farMountain)"
          filter="blur(18px)"
        />

        {/* Mid-range mountains (left & right peaks like in image) */}
        <path
          d="M-100 520 Q 180 320, 360 410 Q 520 490, 720 460 Q 920 410, 1100 340 Q 1280 290, 1550 510 L 1550 900 L -100 900 Z"
          fill="url(#midMountain)"
          filter="blur(10px)"
          opacity="0.85"
        />

        {/* Near wooded shoreline on sides */}
        <path
          d="M-50 650 Q 120 480, 260 550 Q 320 620, 400 680 L -50 780 Z"
          fill="url(#nearPines)"
          filter="blur(6px)"
          opacity="0.9"
        />
        <path
          d="M1500 650 Q 1340 460, 1200 540 Q 1120 620, 1020 690 L 1500 800 Z"
          fill="url(#nearPines)"
          filter="blur(6px)"
          opacity="0.9"
        />

        {/* Lake water surface */}
        <rect y="580" width="1440" height="320" fill="url(#lakeWater)" opacity="0.8" />

        {/* Water specular reflection ripples */}
        <ellipse cx="720" cy="670" rx="650" ry="80" fill="white" opacity="0.22" filter="blur(25px)" />
      </svg>

      {/* Atmospheric mist overlays */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% 55%, rgba(255, 255, 255, 0.6) 0%, rgba(224, 231, 255, 0.3) 50%, transparent 80%)'
        }}
      />

      {/* Vignette with subtle purple/blue tint */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(99, 102, 241, 0.12) 100%)'
        }}
      />
    </div>
  );
}
