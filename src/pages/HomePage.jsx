import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import designerImg from '../assets/designer2.png'
import BottleSVG, { CATEGORY_FALLBACK } from '@/components/BottleSVG'
import { products as REAL_PRODUCTS } from '@/utils'
import { useCart } from '@/context/CartContext'

/* ================================================================
   SVG GLASS COMPONENTS
   ================================================================ */

const G = '#c9a84c'
const GL = '#f0d080'

function WineGlass({ active }) {
  const c = active ? GL : G
  return (
    <svg viewBox="0 0 80 170" xmlns="http://www.w3.org/2000/svg" className="glass-svg">
      <path d="M14 10 Q14 72 40 88 Q66 72 66 10 Z" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M19 44 Q19 72 40 85 Q61 72 61 44 Z" fill={c} fillOpacity="0.32"/>
      <line x1="40" y1="88" x2="40" y2="140" stroke={c} strokeWidth="2.5"/>
      <ellipse cx="40" cy="143" rx="20" ry="5" fill="none" stroke={c} strokeWidth="2.5"/>
    </svg>
  )
}

function WhiskeyGlass({ active }) {
  const c = active ? GL : G
  return (
    <svg viewBox="0 0 80 170" xmlns="http://www.w3.org/2000/svg" className="glass-svg">
      <path d="M14 55 L19 135 L61 135 L66 55 Z" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="2"/>
      <path d="M17 90 L19 135 L61 135 L63 90 Z" fill={c} fillOpacity="0.4"/>
      <rect x="27" y="98" width="13" height="13" rx="2" fill="white" fillOpacity="0.25" stroke={c} strokeWidth="1"/>
      <rect x="45" y="103" width="11" height="11" rx="2" fill="white" fillOpacity="0.2" stroke={c} strokeWidth="1"/>
      <line x1="14" y1="55" x2="66" y2="55" stroke={c} strokeWidth="2.5"/>
      <rect x="17" y="135" width="46" height="6" rx="3" fill={c} fillOpacity="0.45" stroke={c} strokeWidth="1"/>
      <line x1="22" y1="65" x2="22" y2="130" stroke="white" strokeWidth="1.5" strokeOpacity="0.15"/>
    </svg>
  )
}

function BeerGlass({ active }) {
  const c = active ? GL : G
  return (
    <svg viewBox="0 0 80 170" xmlns="http://www.w3.org/2000/svg" className="glass-svg">
      <path d="M14 38 L17 138 L59 138 L63 38 Z" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="2"/>
      <path d="M16 68 L17 138 L59 138 L62 68 Z" fill={c} fillOpacity="0.45"/>
      <ellipse cx="38" cy="68" rx="23" ry="8" fill="white" fillOpacity="0.65"/>
      <ellipse cx="28" cy="64" rx="9" ry="6" fill="white" fillOpacity="0.85"/>
      <ellipse cx="49" cy="63" rx="8" ry="5" fill="white" fillOpacity="0.85"/>
      <path d="M63 55 Q88 55 88 88 Q88 122 63 122" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round"/>
      <circle cx="30" cy="98" r="2" fill={c} fillOpacity="0.5"/>
      <circle cx="45" cy="112" r="2" fill={c} fillOpacity="0.5"/>
      <circle cx="34" cy="122" r="1.5" fill={c} fillOpacity="0.5"/>
    </svg>
  )
}

function RumGlass({ active }) {
  const c = active ? GL : G
  return (
    <svg viewBox="0 0 80 170" xmlns="http://www.w3.org/2000/svg" className="glass-svg">
      <rect x="18" y="20" width="44" height="118" rx="4" fill={c} fillOpacity="0.1" stroke={c} strokeWidth="2"/>
      <rect x="18" y="78" width="44" height="60" fill={c} fillOpacity="0.4"/>
      <rect x="23" y="84" width="13" height="13" rx="2" fill="white" fillOpacity="0.25" stroke={c} strokeWidth="1"/>
      <rect x="44" y="90" width="11" height="11" rx="2" fill="white" fillOpacity="0.2" stroke={c} strokeWidth="1"/>
      <line x1="54" y1="18" x2="50" y2="138" stroke={c} strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="27" cy="24" r="9" fill="#4a7a00" fillOpacity="0.75" stroke={c} strokeWidth="1"/>
    </svg>
  )
}

function VodkaGlass({ active }) {
  const c = active ? GL : G
  return (
    <svg viewBox="0 0 80 170" xmlns="http://www.w3.org/2000/svg" className="glass-svg">
      <path d="M24 72 L27 138 L53 138 L56 72 Z" fill={c} fillOpacity="0.1" stroke={c} strokeWidth="2"/>
      <path d="M25 102 L27 138 L53 138 L55 102 Z" fill={c} fillOpacity="0.5"/>
      <line x1="24" y1="72" x2="56" y2="72" stroke={c} strokeWidth="2.5"/>
      <rect x="25" y="138" width="30" height="6" rx="3" fill={c} fillOpacity="0.45"/>
      <line x1="30" y1="78" x2="30" y2="132" stroke="white" strokeWidth="2" strokeOpacity="0.2"/>
    </svg>
  )
}

function TequilaGlass({ active }) {
  const c = active ? GL : G
  return (
    <svg viewBox="0 0 80 170" xmlns="http://www.w3.org/2000/svg" className="glass-svg">
      <path d="M4 48 L40 92 L76 48" fill="none" stroke={c} strokeWidth="2.5"/>
      <path d="M4 48 Q40 56 76 48 Q62 82 40 92 Q18 82 4 48 Z" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="2"/>
      <path d="M11 68 Q40 76 69 68 Q58 84 40 89 Q22 84 11 68 Z" fill={c} fillOpacity="0.42"/>
      <line x1="40" y1="92" x2="40" y2="134" stroke={c} strokeWidth="2.5"/>
      <ellipse cx="40" cy="137" rx="19" ry="5" fill="none" stroke={c} strokeWidth="2"/>
      <path d="M4 48 L76 48" stroke="white" strokeWidth="3" strokeOpacity="0.35" strokeDasharray="5,4"/>
      <path d="M60 43 Q70 33 78 40 Q73 50 62 49 Z" fill="#4a7a00" fillOpacity="0.8"/>
    </svg>
  )
}

function ChampagneGlass({ active }) {
  const c = active ? GL : G
  return (
    <svg viewBox="0 0 80 170" xmlns="http://www.w3.org/2000/svg" className="glass-svg">
      <path d="M27 12 L24 94 L56 94 L53 12 Z" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="2"/>
      <path d="M26 46 L24 94 L56 94 L54 46 Z" fill={c} fillOpacity="0.38"/>
      <circle cx="37" cy="84" r="1.5" fill={c} fillOpacity="0.9"/>
      <circle cx="43" cy="74" r="1.5" fill={c} fillOpacity="0.9"/>
      <circle cx="35" cy="62" r="1.5" fill={c} fillOpacity="0.9"/>
      <circle cx="45" cy="52" r="1" fill={c} fillOpacity="0.9"/>
      <circle cx="39" cy="56" r="1" fill={c} fillOpacity="0.9"/>
      <line x1="40" y1="94" x2="40" y2="142" stroke={c} strokeWidth="2"/>
      <ellipse cx="40" cy="145" rx="19" ry="4.5" fill="none" stroke={c} strokeWidth="2"/>
      <line x1="27" y1="12" x2="53" y2="12" stroke={c} strokeWidth="2"/>
    </svg>
  )
}

function GinGlass({ active }) {
  const c = active ? GL : G
  return (
    <svg viewBox="0 0 80 170" xmlns="http://www.w3.org/2000/svg" className="glass-svg">
      <path d="M18 18 Q4 50 8 82 Q14 114 40 118 Q66 114 72 82 Q76 50 62 18 Z" fill={c} fillOpacity="0.1" stroke={c} strokeWidth="2"/>
      <path d="M11 78 Q14 110 40 116 Q66 110 69 78 Q52 86 40 86 Q28 86 11 78 Z" fill={c} fillOpacity="0.38"/>
      <line x1="40" y1="118" x2="40" y2="144" stroke={c} strokeWidth="2.5"/>
      <ellipse cx="40" cy="147" rx="19" ry="4.5" fill="none" stroke={c} strokeWidth="2"/>
      <circle cx="57" cy="28" r="7" fill="#4a7a00" fillOpacity="0.7"/>
      <circle cx="24" cy="26" r="6" fill="#4a7a00" fillOpacity="0.7"/>
    </svg>
  )
}

function CognacGlass({ active }) {
  const c = active ? GL : G
  return (
    <svg viewBox="0 0 80 170" xmlns="http://www.w3.org/2000/svg" className="glass-svg">
      <path d="M28 12 Q8 18 8 56 Q8 94 40 100 Q72 94 72 56 Q72 18 52 12 Z" fill={c} fillOpacity="0.1" stroke={c} strokeWidth="2"/>
      <path d="M11 66 Q14 92 40 98 Q66 92 69 66 Q55 74 40 74 Q25 74 11 66 Z" fill={c} fillOpacity="0.48"/>
      <path d="M28 12 Q35 8 40 8 Q45 8 52 12" stroke={c} strokeWidth="2" fill="none"/>
      <line x1="40" y1="100" x2="40" y2="136" stroke={c} strokeWidth="2.5"/>
      <ellipse cx="40" cy="139" rx="23" ry="6" fill="none" stroke={c} strokeWidth="2.5"/>
    </svg>
  )
}

function ScotchGlass({ active }) {
  const c = active ? GL : G
  return (
    <svg viewBox="0 0 80 170" xmlns="http://www.w3.org/2000/svg" className="glass-svg">
      <path d="M23 26 Q12 52 16 86 Q20 114 40 118 Q60 114 64 86 Q68 52 57 26 Z" fill={c} fillOpacity="0.1" stroke={c} strokeWidth="2"/>
      <path d="M32 118 L30 138 L50 138 L48 118 Z" fill={c} fillOpacity="0.18" stroke={c} strokeWidth="1.5"/>
      <ellipse cx="40" cy="141" rx="17" ry="5.5" fill={c} fillOpacity="0.38" stroke={c} strokeWidth="2"/>
      <path d="M20 82 Q22 110 40 116 Q58 110 60 82 Q52 90 40 90 Q28 90 20 82 Z" fill={c} fillOpacity="0.52"/>
      <path d="M23 26 Q34 22 40 22 Q46 22 57 26" stroke={c} strokeWidth="2" fill="none"/>
    </svg>
  )
}

/* ================================================================
   RABBIT LOGO
   ================================================================ */

function RabbitLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-label="Rabbit Liquor logo">
      <ellipse cx="20" cy="17" rx="6.5" ry="14" fill="#c9a84c"/>
      <ellipse cx="20" cy="17" rx="3.8" ry="10" fill="#7a5c10"/>
      <ellipse cx="44" cy="15" rx="6.5" ry="14" fill="#c9a84c"/>
      <ellipse cx="44" cy="15" rx="3.8" ry="10" fill="#7a5c10"/>
      <circle cx="32" cy="40" r="19" fill="#c9a84c"/>
      <circle cx="24.5" cy="36" r="3.8" fill="#1a1a1a"/>
      <circle cx="39.5" cy="36" r="3.8" fill="#1a1a1a"/>
      <circle cx="25.5" cy="34.5" r="1.6" fill="white"/>
      <circle cx="40.5" cy="34.5" r="1.6" fill="white"/>
      <ellipse cx="32" cy="44" rx="3.2" ry="2.2" fill="#ffaaaa"/>
      <path d="M28.5 46.5 Q32 50 35.5 46.5" stroke="#cc8888" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <line x1="11" y1="43" x2="23" y2="44" stroke="#7a5c10" strokeWidth="1" strokeOpacity="0.6"/>
      <line x1="11" y1="46.5" x2="23" y2="45.5" stroke="#7a5c10" strokeWidth="1" strokeOpacity="0.6"/>
      <line x1="41" y1="44" x2="53" y2="43" stroke="#7a5c10" strokeWidth="1" strokeOpacity="0.6"/>
      <line x1="41" y1="45.5" x2="53" y2="46.5" stroke="#7a5c10" strokeWidth="1" strokeOpacity="0.6"/>
    </svg>
  )
}

/* ================================================================
   DATA
   ================================================================ */

const CATEGORIES = [
  { name: 'Wine',      Glass: WineGlass,      accent: '#c0364a', bg: 'rgba(110,15,25,0.6)',  desc: 'Reds, whites & rosés',        count: '120+' },
  { name: 'Whiskey',   Glass: WhiskeyGlass,   accent: '#c9a84c', bg: 'rgba(80,55,0,0.6)',    desc: 'Single malt & blended',       count: '90+'  },
  { name: 'Beer',      Glass: BeerGlass,      accent: '#f5a623', bg: 'rgba(80,50,0,0.6)',    desc: 'Craft & premium ales',        count: '60+'  },
  { name: 'Rum',       Glass: RumGlass,       accent: '#b85c2a', bg: 'rgba(70,22,0,0.6)',    desc: 'Dark, white & spiced',        count: '45+'  },
  { name: 'Vodka',     Glass: VodkaGlass,     accent: '#8ab8d8', bg: 'rgba(10,30,68,0.6)',   desc: 'Premium & flavoured',         count: '50+'  },
  { name: 'Tequila',   Glass: TequilaGlass,   accent: '#7ec850', bg: 'rgba(18,52,8,0.6)',    desc: 'Blanco, reposado & añejo',    count: '35+'  },
  { name: 'Champagne', Glass: ChampagneGlass, accent: '#d4b84a', bg: 'rgba(70,55,0,0.6)',    desc: 'Brut, rosé & vintage',        count: '28+'  },
  { name: 'Gin',       Glass: GinGlass,       accent: '#5ca8c8', bg: 'rgba(8,34,56,0.6)',    desc: 'London dry & botanical',      count: '55+'  },
  { name: 'Cognac',    Glass: CognacGlass,    accent: '#c47022', bg: 'rgba(62,28,0,0.6)',    desc: 'VS, VSOP & XO',               count: '30+'  },
  { name: 'Scotch',    Glass: ScotchGlass,    accent: '#c8a87c', bg: 'rgba(52,40,14,0.6)',   desc: 'Highland, Speyside & Islay',  count: '70+'  },
]

/* PRODUCTS constant removed — TrendingSection uses REAL_PRODUCTS from @/utils */

const REVIEWS = [
  { id: 1, name: 'Alexander M.', rating: 5, avatar: 'A', text: "Rabbit Liquor's Reserve collection is simply unparalleled. The curation and quality speak of deep expertise and passion. Every bottle is a masterpiece." },
  { id: 2, name: 'Sophie L.',    rating: 5, avatar: 'S', text: "From the moment I discovered Rabbit Liquor, my appreciation for fine spirits has grown tenfold. Their whiskey selection is extraordinary." },
  { id: 3, name: 'James R.',     rating: 5, avatar: 'J', text: "The most refined liquor experience I've encountered. The dark aesthetic and product quality perfectly reflect the brand's premium positioning." },
  { id: 4, name: 'Priya K.',     rating: 5, avatar: 'P', text: "The champagne I ordered for my anniversary was perfect — elegant, celebratory, and worth every penny. Rabbit Liquor never disappoints." },
]

/* ================================================================
   NAVBAR
   ================================================================ */

function Navbar({ onNavigate, currentPage }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount]             = useState(0)

  const goHome = (hash = '') => { onNavigate('home'); setTimeout(() => { if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }) }, 50) }

  return (
    <nav className="rl-nav">
      {/* LEFT */}
      <div className="rl-nav__left">
        <button onClick={() => goHome()} className="rl-nav__brand">
          <RabbitLogo size={40} />
          <span className="rl-nav__brand-name">Rabbit Liquor</span>
        </button>
        <div className={`rl-nav__links${menuOpen ? ' open' : ''}`}>
          <button onClick={() => { goHome(); setMenuOpen(false) }} className={`rl-nav__link${currentPage === 'home' ? ' active' : ''}`}>Home</button>
          <button onClick={() => { goHome('#range'); setMenuOpen(false) }} className="rl-nav__link">Reserve</button>
          <button onClick={() => { onNavigate('story'); setMenuOpen(false) }} className={`rl-nav__link${currentPage === 'story' ? ' active' : ''}`}>About Us</button>
        </div>
      </div>

      {/* CENTER */}
      <div className="rl-nav__center">
        <div className="rl-search">
          <svg className="rl-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search spirits, wines…" className="rl-search__input" aria-label="Search"/>
        </div>
      </div>

      {/* RIGHT */}
      <div className="rl-nav__right">
        <button className="rl-nav__cart" aria-label="Cart" onClick={() => navigate('/cart')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          {cartCount > 0 && <span className="rl-nav__cart-count">{cartCount}</span>}
        </button>
        <button className="rl-btn rl-btn--outline" onClick={() => navigate('/')}>Sign In</button>
        <button className="rl-btn rl-btn--gold" onClick={() => navigate('/')}>Sign Up</button>
        <button
          className={`rl-nav__hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  )
}

/* ================================================================
   HERO SECTION
   ================================================================ */

function HeroSection() {
  const navigate = useNavigate()
  const scrollToRange = () => document.getElementById('range')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="rl-hero" id="home">
      <div className="rl-hero-splash-wrap" aria-hidden="true">
        <img
          src={designerImg}
          alt="Premium Whiskey Splash"
          className="rl-hero-splash-img"
        />
      </div>

      <div className="rl-hero__content">
        <div className="rl-hero__pill">
          <span className="rl-hero__pill-dot"/>
          <span>500+ Premium Labels In Stock</span>
        </div>
        <h1 className="rl-hero__title">
          The Finest<br/>
          <em className="rl-gold">Spirits, Available.</em>
        </h1>
        <p className="rl-hero__desc">
          Reserve the Rare scotches, aged cognacs, premier wines — curated by experts and collect from store.
        </p>
        <div className="rl-hero__actions">
          <button className="rl-btn rl-btn--gold rl-btn--lg" onClick={() => navigate('/products')}>Reserve now</button>
          <button className="rl-btn rl-btn--outline rl-btn--lg" onClick={scrollToRange}>Browse Categories</button>
        </div>
        <div className="rl-hero__stats">
          <div className="rl-stat">
            <span className="rl-stat__num">500+</span>
            <span className="rl-stat__label">Premium Labels</span>
          </div>
          <div className="rl-stat__divider"/>
          <div className="rl-stat">
            <span className="rl-stat__num">20+</span>
            <span className="rl-stat__label">Countries Sourced</span>
          </div>
          <div className="rl-stat__divider"/>
          <div className="rl-stat">
            <span className="rl-stat__num">15K+</span>
            <span className="rl-stat__label">Happy Customers</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================
   STORY PAGE
   ================================================================ */

function StoryPage() {
  return (
    <div className="rl-story-page">
      <div className="rl-story-page__hero">
        <div className="rl-story-page__hero-inner">
          <p className="rl-section-pre">OUR STORY</p>
          <h1 className="rl-story-page__title">More Than a Store.<br/><span className="rl-gold">A Destination.</span></h1>
          <p className="rl-story-page__lead">Founded in pursuit of perfection — Rabbit Liquor brings the world's rarest spirits to those who truly appreciate them.</p>
        </div>
      </div>

      <div className="rl-story-page__body">
        <div className="rl-story-page__text-block">
          <h2 className="rl-story-page__h2">The Beginning</h2>
          <p>Founded in the rolling vineyards of Napa Valley, Rabbit Liquor began as a passionate
          pursuit of perfection. We believe every occasion deserves a spirit that matches its
          significance — whether that's a whisky aged fifteen years in charred oak, a champagne
          harvested from a single exceptional vintage, or a gin distilled with rare botanicals.</p>
          <p>Our sommeliers and spirit masters travel the world to source bottles that represent
          the pinnacle of their craft. We partner only with producers who share our obsession
          with quality, provenance, and the art of patience.</p>
        </div>

        <div className="rl-story-page__text-block">
          <h2 className="rl-story-page__h2">Our Philosophy</h2>
          <p>Every bottle on our shelves has earned its place. We taste blind, judge on merit,
          and champion the underdog as readily as the legend. From a single-village mezcal
          to a century-old cognac, if it moves us — it moves to our collection.</p>
        </div>

        <div className="rl-intro__pillars" style={{ marginTop: '0' }}>
          {[
            { icon: '🏆', title: 'Award-Winning Curation', desc: 'Handpicked by certified sommeliers and master distillers.' },
            { icon: '🌍', title: 'Global Sourcing',         desc: 'Labels from over 20 countries, representing the finest terroirs.' },
            { icon: '📦', title: 'White-Glove Delivery',    desc: 'Temperature-controlled, discreet, and always on time.' },
            { icon: '🔒', title: 'Secure & Verified',       desc: 'Every bottle authenticated and sealed. No compromises.' },
            { icon: '🍃', title: 'Sustainable Sourcing',    desc: 'Partnering with producers who respect the land they work.' },
            { icon: '🎁', title: 'Gift Concierge',          desc: 'Bespoke gifting packages curated for every occasion.' },
          ].map(p => (
            <div className="rl-pillar" key={p.title}>
              <span className="rl-pillar__icon">{p.icon}</span>
              <h3 className="rl-pillar__title">{p.title}</h3>
              <p className="rl-pillar__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   OUR RANGE — Single-row carousel with chevrons
   ================================================================ */

function RangeSection() {
  const [active, setActive] = useState(null)
  const scrollRef = useRef(null)
  const [canLeft, setCanLeft]   = useState(false)
  const [canRight, setCanRight] = useState(true)
  const navigate = useNavigate()

  const scrollBy = (dir) => scrollRef.current?.scrollBy({ left: dir * 210, behavior: 'smooth' })

  const onScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft: sl, scrollWidth: sw, clientWidth: cw } = scrollRef.current
    setCanLeft(sl > 2)
    setCanRight(sl < sw - cw - 2)
  }

  return (
    <section className="rl-range" id="range">
      <div className="rl-section-header">
        <p className="rl-section-pre">DISCOVER</p>
        <h2 className="rl-section-title">Our <span className="rl-gold">Range</span></h2>
        <p className="rl-section-sub">Ten magnificent categories — scroll to explore</p>
      </div>

      <div className="rl-range-carousel-wrap">
        <button
          className={`rl-range-btn rl-range-btn--left${!canLeft ? ' rl-range-btn--hidden' : ''}`}
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="rl-range-carousel" ref={scrollRef} onScroll={onScroll}>
          {CATEGORIES.map((cat, i) => (
          <button
            key={cat.name}
            className={`rl-range-card${active === i ? ' rl-range-card--active' : ''}`}
            style={{
              '--cat-accent': cat.accent,
              '--cat-bg':     cat.bg,
              '--cat-glow':   cat.accent + '33',
            }}
            onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
            aria-pressed={active === i}
          >
            <div className="rl-range-card__shine"/>
            <div className="rl-range-card__glow"/>
            <div className="rl-range-card__icon">
              <cat.Glass active={active === i}/>
            </div>
            <span className="rl-range-card__count">{cat.count}</span>
            <span className="rl-range-card__name">{cat.name}</span>
            <span className="rl-range-card__desc">{cat.desc}</span>
            {active === i && (
              <span className="rl-range-card__arrow">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" aria-hidden="true">
                  <line x1="0" y1="8" x2="12" y2="8"/>
                  <polyline points="7,3 12,8 7,13"/>
                </svg>
                Shop {cat.name}
              </span>
            )}
          </button>
        ))}
        </div>

        <button
          className={`rl-range-btn rl-range-btn--right${!canRight ? ' rl-range-btn--hidden' : ''}`}
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </section>
  )
}

/* ================================================================
   TRENDING PRODUCTS
   ================================================================ */

function TrendingCard({ product }) {
  const [imgError, setImgError] = useState(false)
  const fallback = CATEGORY_FALLBACK[product.category] || CATEGORY_FALLBACK.default
  const { addToCart, removeFromCart, getProductCount } = useCart() || {}
  const count = getProductCount ? getProductCount(product.id) : 0

  return (
    <div className="rl-prod-card">
      <div className="rl-prod-card__visual">
        <span className="rl-prod-card__badge">{product.category}</span>
        {!imgError && product.image_url ? (
          <img
            src={product.image_url}
            alt={product.item_name}
            className="rl-prod-card__img"
            onError={() => setImgError(true)}
          />
        ) : (
          <BottleSVG
            color={fallback.color}
            label={product.category.toUpperCase()}
            isBeer={fallback.isBeer}
          />
        )}
      </div>
      <div className="rl-prod-card__info">
        <h3 className="rl-prod-card__name">{product.item_name}</h3>
        <p className="rl-prod-card__meta">{product.origin} · {product.category}</p>
        <div className="rl-prod-card__footer">
          <span className="rl-prod-card__price">${product.price.toFixed(2)}</span>
          {count === 0 ? (
            <button className="rl-prod-card__add" onClick={() => addToCart?.(product)}>+ Add</button>
          ) : (
            <div className="rl-prod-card__qty">
              <button className="rl-prod-card__qty-btn" onClick={() => removeFromCart?.(product)}>−</button>
              <span className="rl-prod-card__qty-count">{count}</span>
              <button className="rl-prod-card__qty-btn" onClick={() => addToCart?.(product)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TrendingSection() {
  const scrollRef = useRef(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' })

  const onScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft: sl, scrollWidth: sw, clientWidth: cw } = scrollRef.current
    setCanLeft(sl > 2)
    setCanRight(sl < sw - cw - 2)
  }

  return (
    <section className="rl-trending" id="trending">
      <div className="rl-section-header">
        <p className="rl-section-pre">FEATURED</p>
        <h2 className="rl-section-title">Trending <span className="rl-gold">Products</span></h2>
        <p className="rl-section-sub">Our most sought-after spirits this season</p>
      </div>
      <div className="rl-carousel-wrap">
        {canLeft && (
          <button className="rl-carousel-btn rl-carousel-btn--left" onClick={() => scroll(-1)} aria-label="Scroll left">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
        )}
        <div className="rl-carousel" ref={scrollRef} onScroll={onScroll}>
          {REAL_PRODUCTS.map(p => (
            <TrendingCard key={p.id} product={p} />
          ))}
        </div>
        {canRight && (
          <button className="rl-carousel-btn rl-carousel-btn--right" onClick={() => scroll(1)} aria-label="Scroll right">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        )}
      </div>
    </section>
  )
}

/* ================================================================
   REVIEWS
   ================================================================ */

function ReviewsSection() {
  return (
    <section className="rl-reviews" id="reviews">
      <div className="rl-section-header">
        <p className="rl-section-pre">TESTIMONIALS</p>
        <h2 className="rl-section-title">What Our <span className="rl-gold">Connoisseurs</span> Say</h2>
      </div>
      <div className="rl-reviews__grid">
        {REVIEWS.map(r => (
          <div key={r.id} className="rl-review-card">
            <div className="rl-review-card__stars">{'★'.repeat(r.rating)}</div>
            <p className="rl-review-card__text">"{r.text}"</p>
            <div className="rl-review-card__author">
              <div className="rl-review-card__avatar">{r.avatar}</div>
              <span className="rl-review-card__name">{r.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ================================================================
   FOOTER
   ================================================================ */

function Footer({ onNavigate }) {
  return (
    <footer className="rl-footer" id="about">
      <div className="rl-footer__top">
        <div className="rl-footer__brand">
          <div className="rl-footer__logo">
            <RabbitLogo size={48}/>
            <span className="rl-footer__brand-name">Rabbit Liquor</span>
          </div>
          <p className="rl-footer__tagline">
            Curating the world's finest spirits for those who appreciate the extraordinary.
          </p>
          <div className="rl-footer__social">
            {[
              { label: 'Instagram', d: 'M2 2h20v20H2z M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M17.5 6.5h.01', rx: true },
              { label: 'Facebook',  d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
              { label: 'Twitter',   d: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
            ].map(s => (
              <a href="#" key={s.label} className="rl-social-link" aria-label={s.label}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
                  {s.rx
                    ? <><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></>
                    : <path d={s.d}/>
                  }
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="rl-footer__links">
          <div className="rl-footer__col">
            <h4>Navigate</h4>
            <a href="#home">Home</a>
            <a href="#range">Our Range</a>
            <a href="#trending">Trending</a>
            <a href="#reserve">Reserve Collection</a>
          </div>
          <div className="rl-footer__col">
            <h4>About</h4>
            <button className="rl-footer__nav-btn" onClick={() => onNavigate('story')}>Our Story</button>
            <button className="rl-footer__nav-btn" onClick={() => onNavigate('story')}>Sourcing Philosophy</button>
            <a href="#">Blog</a>
            <a href="#">Press</a>
          </div>
          <div className="rl-footer__col">
            <h4>Contact</h4>
            <p className="rl-footer__contact">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              123 Reserve Lane, Napa Valley, CA
            </p>
            <p className="rl-footer__contact">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.47 2 2 0 0 1 3.54 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6 6l1.06-1.06a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
              </svg>
              +1 (800) RABBIT-LQ
            </p>
            <p className="rl-footer__contact">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              hello@rabbitliquor.com
            </p>
          </div>
        </div>
      </div>

      <div className="rl-footer__bottom">
        <p>© 2026 Rabbit Liquor · All rights reserved · Drink Responsibly · Must be 21+ to purchase.</p>
        <div className="rl-footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Age Verification</a>
        </div>
      </div>
    </footer>
  )
}

/* ================================================================
   HOME PAGE
   ================================================================ */

export default function HomePage() {
  const [page, setPage] = useState('home')

  return (
    <div className="rl-app">
      <Navbar onNavigate={setPage} currentPage={page}/>
      {page === 'story' ? (
        <main>
          <StoryPage/>
        </main>
      ) : (
        <main>
          <HeroSection/>
          <RangeSection/>
          <TrendingSection/>
          <ReviewsSection/>
        </main>
      )}
      <Footer onNavigate={setPage}/>
    </div>
  )
}
