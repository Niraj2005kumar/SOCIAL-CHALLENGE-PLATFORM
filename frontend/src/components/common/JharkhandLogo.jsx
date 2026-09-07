import React from 'react';


export function JharkhandLogoOuter({ className = '', size = 500, style = {} }) {

  const elephantsCount = 24;
  const elephants = Array.from({ length: elephantsCount }, (_, i) => {
    const angle = (i * 360) / elephantsCount;
    return angle;
  });


  const dancersCount = 24;
  const dancers = Array.from({ length: dancersCount }, (_, i) => {
    const angle = (i * 360) / dancersCount;
    return angle;
  });

  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Government of Jharkhand Emblem Outer Ring"
    >
      <defs>
        { }
        <path
          id="jh-text-path-top"
          d="M 55,250 A 195,195 0 1,1 445,250"
          fill="none"
        />
        <path
          id="jh-text-path-bottom"
          d="M 445,250 A 195,195 0 1,1 55,250"
          fill="none"
        />

        { }
        <g id="jh-elephant">
          <path
            d="M -12,-6 C -11,-12 -4,-15 5,-14 C 11,-13 14,-9 15,-4 C 16,1 14,7 12,12 C 10,14 8,15 6,15 C 4,15 3,11 4,7 C 2,7 0,8 -2,12 C -3,14 -4,14 -6,13 C -7,11 -6,8 -5,6 C -7,6 -9,8 -10,11 C -11,12 -13,11 -13,9 C -12,6 -10,3 -10,0 C -12,0 -14,-2 -12,-6 Z"
            fill="#FFFFFF"
          />
          { }
          <path
            d="M 12,-3 C 14,-5 16,-4 16,-2 C 15,1 12,0 12,-3 Z"
            fill="#CBD5E1"
          />
          <circle cx="9" cy="-7" r="1" fill="#1E293B" />
        </g>

        { }
        <g id="jh-tribal-dancer">
          {/* Head 1 */}
          <circle cx="-4" cy="-10" r="2.2" fill="#FFFFFF" />
          {/* Body 1 */}
          <path d="M -4,-8 L -7,1 L -1,1 Z" fill="#F97316" />
          {/* Legs 1 */}
          <line x1="-5.5" y1="1" x2="-6.5" y2="7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-2.5" y1="1" x2="-1.5" y2="7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

          {/* Linked Arms */}
          <path d="M -7,-5 Q 0,-2 7,-5" fill="none" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />

          {/* Head 2 */}
          <circle cx="4" cy="-10" r="2.2" fill="#FFFFFF" />
          {/* Body 2 */}
          <path d="M 4,-8 L 1,1 L 7,1 Z" fill="#991B1B" />
          {/* Legs 2 */}
          <line x1="2.5" y1="1" x2="1.5" y2="7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="5.5" y1="1" x2="6.5" y2="7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        { }
        <radialGradient id="jh-green-grad" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#0A6938" />
          <stop offset="95%" stopColor="#074D29" />
          <stop offset="100%" stopColor="#04321A" />
        </radialGradient>
      </defs>

      { }
      <circle cx="250" cy="250" r="244" fill="none" stroke="#D97706" strokeWidth="3" />
      <circle cx="250" cy="250" r="240" fill="url(#jh-green-grad)" stroke="#15803D" strokeWidth="2" />

      {/* Ring 2: Outer White Bead Ring */}
      <circle
        cx="250"
        cy="250"
        r="234"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeDasharray="2 6"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Ring 3: Deep Green Text Band (Radius 185 to 230) */}
      <circle cx="250" cy="250" r="218" fill="none" stroke="#04321A" strokeWidth="26" />
      <circle cx="250" cy="250" r="231" fill="none" stroke="#FBBF24" strokeWidth="1.5" />
      <circle cx="250" cy="250" r="205" fill="none" stroke="#FBBF24" strokeWidth="1.5" />

      {/* Text: Dual-Language Official Brand */}
      <text
        fill="#FFFFFF"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="17.5"
        fontWeight="800"
        letterSpacing="4.5"
      >
        <textPath href="#jh-text-path-top" startOffset="50%" textAnchor="middle">
          GOVERNMENT OF JHARKHAND
        </textPath>
      </text>

      <text
        fill="#FFFFFF"
        fontFamily="'Plus Jakarta Sans', 'Noto Sans Devanagari', sans-serif"
        fontSize="19"
        fontWeight="800"
        letterSpacing="3"
      >
        <textPath href="#jh-text-path-bottom" startOffset="50%" textAnchor="middle">
          झारखण्ड सरकार
        </textPath>
      </text>

      {/* Ring 4: 24 Elephants Ring (Radius ~182, on white/pale gold band) */}
      <circle cx="250" cy="250" r="182" fill="none" stroke="#074D29" strokeWidth="36" />
      <circle cx="250" cy="250" r="200" fill="none" stroke="#FDE68A" strokeWidth="1.2" />
      <circle cx="250" cy="250" r="164" fill="none" stroke="#FDE68A" strokeWidth="1.2" />

      {/* 24 Elephants rendered uniformly */}
      {elephants.map((angle, idx) => (
        <g key={`el-${idx}`} transform={`rotate(${angle} 250 250) translate(250, 68)`}>
          <use href="#jh-elephant" />
        </g>
      ))}

      {/* Ring 5: 24 Tribal Dancing Figures Ring (Sauria Paharia / Jadopatia dancers) */}
      <circle cx="250" cy="250" r="142" fill="none" stroke="#7C2D12" strokeWidth="32" />
      <circle cx="250" cy="250" r="158" fill="none" stroke="#FDE68A" strokeWidth="1.2" />
      <circle cx="250" cy="250" r="126" fill="none" stroke="#FDE68A" strokeWidth="1.5" />

      {/* 24 Dancers rendered uniformly */}
      {dancers.map((angle, idx) => (
        <g key={`dc-${idx}`} transform={`rotate(${angle} 250 250) translate(250, 108)`}>
          <use href="#jh-tribal-dancer" />
        </g>
      ))}

      {/* Ring 6: Inner Palash Flower / Golden Petals Ring (Radius 116 to 126) */}
      <circle cx="250" cy="250" r="116" fill="#0A6938" stroke="#D97706" strokeWidth="3" />
      <circle
        cx="250"
        cy="250"
        r="110"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeDasharray="4 6"
        opacity="0.9"
      />
      { }
      <circle cx="250" cy="250" r="100" fill="transparent" />
    </svg>
  );
}




export function JharkhandLogoCenter({ className = '', size = 500, style = {} }) {
  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Ashoka Pillar Capital Center Element"
    >
      <defs>
        {/* Ashoka Chakra Center Wheel */}
        <g id="jh-chakra-spokes">
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={`spoke-${i}`}
              x1="0"
              y1="-11"
              x2="0"
              y2="11"
              stroke="#0A6938"
              strokeWidth="1.2"
              transform={`rotate(${i * 15})`}
            />
          ))}
        </g>
      </defs>

      {/* Central Base Shield Background */}
      <circle cx="250" cy="250" r="99" fill="#FFFFFF" />

      {/* Outer rim for center shield */}
      <circle cx="250" cy="250" r="98" fill="none" stroke="#D97706" strokeWidth="2.5" />
      <circle cx="250" cy="250" r="95" fill="none" stroke="#0A6938" strokeWidth="1.5" />

      {/* ================= ASHOKA PILLAR LION CAPITAL ================= */}
      <g transform="translate(250, 240)">
        {/* --- Back Lion (Top subtle silhouette) --- */}
        <path
          d="M -10,-58 C -7,-64 7,-64 10,-58 C 12,-52 10,-48 8,-44 L -8,-44 C -10,-48 -12,-52 -10,-58 Z"
          fill="#1E293B"
        />

        {/* --- Left Lion --- */}
        <g transform="translate(-24, -40)">
          {/* Mane */}
          <path
            d="M -16,-10 C -18,-2 2,14 18,14 C 14,4 10,-8 4,-14 C -6,-16 -12,-16 -16,-10 Z"
            fill="#334155"
          />
          {/* Head & Face */}
          <path
            d="M -12,-16 C -8,-22 4,-18 6,-10 C 8,-2 4,4 -4,6 C -10,6 -14,-8 -12,-16 Z"
            fill="#1E293B"
          />
          {/* Eye & Brow */}
          <circle cx="-5" cy="-9" r="1.5" fill="#F8FAFC" />
          <path d="M -8,-12 Q -4,-14 -1,-11" fill="none" stroke="#F1F5F9" strokeWidth="1" />
          {/* Snout & Jaws */}
          <path d="M -10,-6 L -16,-4 L -11,-1 Z" fill="#0F172A" />
        </g>

        {/* --- Right Lion --- */}
        <g transform="translate(24, -40) scale(-1, 1)">
          {/* Mane */}
          <path
            d="M -16,-10 C -18,-2 2,14 18,14 C 14,4 10,-8 4,-14 C -6,-16 -12,-16 -16,-10 Z"
            fill="#334155"
          />
          {/* Head & Face */}
          <path
            d="M -12,-16 C -8,-22 4,-18 6,-10 C 8,-2 4,4 -4,6 C -10,6 -14,-8 -12,-16 Z"
            fill="#1E293B"
          />
          {/* Eye & Brow */}
          <circle cx="-5" cy="-9" r="1.5" fill="#F8FAFC" />
          <path d="M -8,-12 Q -4,-14 -1,-11" fill="none" stroke="#F1F5F9" strokeWidth="1" />
          {/* Snout & Jaws */}
          <path d="M -10,-6 L -16,-4 L -11,-1 Z" fill="#0F172A" />
        </g>

        {/* --- Front Center Lion (Prominent) --- */}
        <g transform="translate(0, -38)">
          {/* Elaborate Regal Mane */}
          <path
            d="M -26,-2 C -30,16 -12,28 0,28 C 12,28 30,16 26,-2 C 22,-14 14,-22 0,-24 C -14,-22 -22,-14 -26,-2 Z"
            fill="#1E293B"
          />
          {/* Crown & Forehead */}
          <path
            d="M -12,-20 C -6,-26 6,-26 12,-20 C 14,-14 10,-8 0,-6 C -10,-8 -14,-14 -12,-20 Z"
            fill="#0F172A"
          />
          {/* Eyes (Fierce, Alert) */}
          <ellipse cx="-6" cy="-12" rx="2.5" ry="1.8" fill="#F8FAFC" />
          <circle cx="-6" cy="-12" r="1" fill="#0F172A" />
          <ellipse cx="6" cy="-12" rx="2.5" ry="1.8" fill="#F8FAFC" />
          <circle cx="6" cy="-12" r="1" fill="#0F172A" />

          {/* Whisker pads & Muzzle */}
          <ellipse cx="-4" cy="-5" rx="4" ry="3" fill="#334155" />
          <ellipse cx="4" cy="-5" rx="4" ry="3" fill="#334155" />
          <polygon points="0,-7 -3,-5 3,-5" fill="#0F172A" />

          {/* Open Jaws with Fangs */}
          <path d="M -5,-1 Q 0,4 5,-1" fill="#991B1B" stroke="#0F172A" strokeWidth="1" />
          <polygon points="-3,-1 -2,2 -1,-1" fill="#FFFFFF" />
          <polygon points="1,-1 2,2 3,-1" fill="#FFFFFF" />

          {/* Chest & Front Paws */}
          <path
            d="M -16,14 C -14,24 -10,32 -6,34 L 6,34 C 10,32 14,24 16,14 Z"
            fill="#0F172A"
          />
        </g>

        {/* --- Capital Abacus (Circular Base with Carvings) --- */}
        <g transform="translate(0, 4)">
          {/* Abacus Band */}
          <rect x="-48" y="-4" width="96" height="24" rx="3" fill="#F1F5F9" stroke="#0A6938" strokeWidth="1.8" />

          {/* Central Ashoka Chakra in Abacus */}
          <g transform="translate(0, 8)">
            <circle cx="0" cy="0" r="11" fill="#FFFFFF" stroke="#0A6938" strokeWidth="2" />
            <circle cx="0" cy="0" r="2.5" fill="#0A6938" />
            <use href="#jh-chakra-spokes" />
          </g>

          {/* Galloping Horse (Left) */}
          <g transform="translate(-30, 8) scale(0.65)">
            <path
              d="M -12,-2 C -10,-8 -4,-7 0,-4 C 4,-2 8,2 6,8 C 4,10 0,9 -4,6 C -7,8 -10,7 -12,-2 Z"
              fill="#0A6938"
            />
          </g>

          {/* Charging Bull (Right) */}
          <g transform="translate(30, 8) scale(0.65)">
            <path
              d="M 12,-2 C 10,-8 4,-7 0,-4 C -4,-2 -8,2 -6,8 C -4,10 0,9 4,6 C 7,8 10,7 12,-2 Z"
              fill="#0A6938"
            />
          </g>
        </g>

        {/* --- Inverted Lotus Bell Base --- */}
        <g transform="translate(0, 26)">
          <path
            d="M -44,2 C -30,12 30,12 44,2 L 40,8 C 26,16 -26,16 -40,8 Z"
            fill="#E2E8F0"
            stroke="#64748B"
            strokeWidth="1"
          />
        </g>

        {/* --- Pedestal with "सत्यमेव जयते" (Satyameva Jayate) --- */}
        <g transform="translate(0, 40)">
          {/* Gold Inscription Plaque */}
          <rect x="-46" y="-3" width="92" height="15" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
          <text
            x="0"
            y="8.5"
            textAnchor="middle"
            fill="#0F172A"
            fontFamily="'Noto Sans Devanagari', 'Plus Jakarta Sans', sans-serif"
            fontSize="10"
            fontWeight="800"
            letterSpacing="0.8"
          >
            सत्यमेव जयते
          </text>
        </g>
      </g>
    </svg>
  );
}

/**
 * JharkhandLogo: Dual-purpose component.
 * - In 'navbar' mode: Renders standard, small, crisp, STATIC emblem.
 * - In 'watermark' mode: Stacked outer + center layers.
 *     OUTER ring rotates continuously via CSS (100s, linear, infinite).
 *     CENTER element stays strictly static (0deg).
 */
export default function JharkhandLogo({
  mode = 'navbar', // 'navbar' | 'watermark' | 'seal'
  size = 48,
  className = '',
  style = {}
}) {
  const isWatermark = mode === 'watermark';

  return (
    <div
      className={`${isWatermark ? 'jharkhand-watermark-container' : 'relative inline-flex'} pointer-events-none select-none ${className}`}
      style={{
        ...(isWatermark ? {
          position: 'fixed',
          top: '50%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          opacity: 'var(--watermark-opacity)',
          zIndex: 0,
        } : {}),
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        maxWidth: isWatermark ? '85vw' : undefined,
        maxHeight: isWatermark ? '85vh' : undefined,
        ...style
      }}
      title={isWatermark ? undefined : 'Government of Jharkhand'}
      aria-hidden={isWatermark}
    >
      <img
        src="/images/jharkhand-logo.png"
        alt={isWatermark ? '' : 'Government of Jharkhand emblem'}
        className={isWatermark ? 'absolute inset-0 animate-spin-outer' : ''}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
      {isWatermark && (
        <img
          src="/images/jharkhand-logo.png"
          alt=""
          className="absolute inset-0"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            clipPath: 'circle(29% at 50% 50%)',
          }}
        />
      )}
    </div>
  );
}
