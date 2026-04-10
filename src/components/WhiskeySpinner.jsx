import { useId } from 'react'
import './WhiskeySpinner.css'

/**
 * WhiskeySpinner (Beer Glass Fill)
 * Props:
 *   size  — rendered width in px (height is 1.92×). Default 120.
 *   label — text below the glass. Pass false to hide. Default "Loading…"
 */
export default function WhiskeySpinner({ size = 120, label = 'Loading…' }) {
  const uid        = useId().replace(/:/g, 'x')
  const clipId     = `wsp-clip-${uid}`       // full clip (sides + top + bottom) — keeps beer inside
  const clipFoamId = `wsp-foam-clip-${uid}`  // open-top clip (sides + bottom only) — foam can overflow
  const gradBeer   = `wsp-beer-${uid}`

  return (
    <div className="wsp-wrap">
      <svg
        viewBox="0 -22 100 214"
        width={size}
        height={Math.round(size * 2.14)}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Loading"
      >
        <defs>
          <linearGradient id={gradBeer} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#d9940e" />
            <stop offset="45%"  stopColor="#b86c12" />
            <stop offset="100%" stopColor="#7a3d08" />
          </linearGradient>
          {/* Full clip — side walls + top rim + bottom — used for beer fill */}
          <clipPath id={clipId}>
            <path d="M 10,20 C 15,53 20,74 22,98 Q 22,128 23,152 L 77,152 Q 78,128 78,98 C 80,74 85,53 90,20 Z" />
          </clipPath>
          {/* Open-top clip — side walls + bottom only — foam can spill above rim */}
          <clipPath id={clipFoamId}>
            <path d="M 10,-200 L 10,20 C 15,53 20,74 22,98 Q 22,128 23,152 L 77,152 Q 78,128 78,98 C 80,74 85,53 90,20 L 90,-200 Z" />
          </clipPath>
        </defs>

        {/* Beer fill — full clip keeps liquid strictly inside the glass */}
        <g clipPath={`url(#${clipId})`}>
          <rect className="wsp-liquid" x="0" y="20" width="100" height="132" fill={`url(#${gradBeer})`} />
          <rect className="wsp-liquid" x="16" y="20" width="9"   height="132" fill="rgba(255,215,80,0.22)" rx="4.5" />
          <rect className="wsp-liquid" x="28" y="20" width="4"   height="132" fill="rgba(255,215,80,0.10)" rx="2" />
          <circle className="wsp-b wsp-b1" cx="38" cy="146" r="2.4" fill="rgba(255,205,70,0.65)" />
          <circle className="wsp-b wsp-b2" cx="60" cy="142" r="1.8" fill="rgba(255,205,70,0.60)" />
          <circle className="wsp-b wsp-b3" cx="50" cy="149" r="2.2" fill="rgba(255,205,70,0.55)" />
          <circle className="wsp-b wsp-b4" cx="33" cy="144" r="1.5" fill="rgba(255,205,70,0.50)" />
          <circle className="wsp-b wsp-b5" cx="68" cy="147" r="1.8" fill="rgba(255,205,70,0.55)" />
        </g>

        {/* Foam — open-top clip: side walls + bottom clip but NO top cap
            so foam proudly overflows above the rim once the glass is full */}
        <g clipPath={`url(#${clipFoamId})`}>
          <g className="wsp-foam-group">
            <ellipse cx="50" cy="44" rx="40" ry="18" fill="rgba(255,253,242,0.98)" />
            <ellipse cx="26" cy="31" rx="15" ry="12" fill="rgba(255,252,238,0.96)" />
            <ellipse cx="50" cy="27" rx="17" ry="13" fill="rgba(255,251,236,0.97)" />
            <ellipse cx="74" cy="31" rx="15" ry="12" fill="rgba(255,252,238,0.96)" />
            <ellipse cx="37" cy="22" rx="11" ry="8"  fill="rgba(255,250,233,0.93)" />
            <ellipse cx="63" cy="22" rx="11" ry="8"  fill="rgba(255,250,233,0.93)" />
            <ellipse cx="50" cy="18" rx="9"  ry="7"  fill="rgba(255,248,230,0.90)" />
            <circle cx="29" cy="27" r="3.2" fill="rgba(255,255,255,0.82)" />
            <circle cx="52" cy="22" r="2.8" fill="rgba(255,255,255,0.78)" />
            <circle cx="72" cy="27" r="3.2" fill="rgba(255,255,255,0.82)" />
            <circle cx="40" cy="19" r="2.2" fill="rgba(255,255,255,0.72)" />
            <circle cx="63" cy="19" r="2.2" fill="rgba(255,255,255,0.72)" />
          </g>
        </g>

        {/* GLASS OUTLINE */}
        <path
          d="M 8,18 C 13,52 19,73 21,97 Q 20,128 22,152 L 24,163 Q 50,169 76,163 L 78,152 Q 80,128 79,97 C 81,73 87,52 92,18"
          fill="none" stroke="#3d2008" strokeWidth="3"
          strokeLinejoin="round" strokeLinecap="round"
        />
        <path d="M 8,18 Q 50,13 92,18" fill="none" stroke="#3d2008" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="50" cy="166" rx="27" ry="6" fill="rgba(61,32,8,0.18)" stroke="#3d2008" strokeWidth="2.5" />
        <path d="M 14,22 C 17,55 21,76 23,100" fill="none" stroke="rgba(255,230,140,0.28)" strokeWidth="5" strokeLinecap="round" />
        <path d="M 19,22 C 22,55 25,76 27,100" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {label && <p className="wsp-label">{label}</p>}
    </div>
  )
}
