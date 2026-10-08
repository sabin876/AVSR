import ayuvPhoto from '../assets/Ayuv Bastola.jpg';
import barshadPhoto from '../assets/Brasad.jpg';
import sabinPhoto from '../assets/Sabin.jpg';

export const PHILOSOPHY_PILLARS = [
  {
    number: '01',
    title: 'Light Before Sensor',
    desc: 'Equipment is only as potent as the light that enters it. We sculpt chiaroscuro contrast, natural alpenglow, and architectural shapes to evoke raw emotion.'
  },
  {
    number: '02',
    title: 'Motion with Purpose',
    desc: 'Every camera move is motivated by narrative rhythm. Whether a slow 60-second anamorphic push-in or a 140km/h FPV dive, every millimeter tells a story.'
  },
  {
    number: '03',
    title: 'Color as Atmosphere',
    desc: 'Our proprietary film print emulation LUTs and nuanced DaVinci grading turn digital pixels into rich, tactile cinematic film stock that never dates.'
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Ayuv Bastola',
    role: 'Director / Videographer',
    bio: 'Lead director and visual architect behind AVSR Vision, specializing in narrative brand commercials, luxury visual storytelling, and high-impact cinema productions.',
    image: ayuvPhoto,
    awards: 'Executive Director • AVSR Vision',
    signatureGear: 'RED V-Raptor 8K VV • Cooke Anamorphic'
  },
  {
    name: 'Barshad',
    role: 'Editor and videographer',
    bio: 'Cinematographer and master editor crafting rhythmic narrative pacing, seamless visual transitions, and high-energy commercial and cinematic cuts.',
    image: barshadPhoto,
    awards: 'Lead Cinematography & Post',
    signatureGear: 'Sony FX6 Cinema Line • DaVinci Studio'
  },
  {
    name: 'Sabin Siwakoti',
    role: 'Graphics and Design',
    bio: 'Creative visual designer heading brand identity, cinematic title sequence design, motion graphics, and state-of-the-art visual communication.',
    image: sabinPhoto,
    awards: 'Lead Brand & Motion Design',
    signatureGear: 'Cinema 4D • After Effects • Figma'
  }
];

export const GEAR_VAULT = [
  {
    category: 'Cinema Cameras',
    items: [
      { name: 'RED V-Raptor 8K VV', spec: '8192 x 4320 @ 120fps • 17+ Stops Dynamic Range' },
      { name: 'Sony FX6 Cinema Line', spec: 'Full-Frame 4K 120fps • Dual Base ISO 800/12800' },
      { name: 'Sony FX3 Cinema Rig', spec: 'Compact B-Cam with Tilta Cage & XLR Handle' },
      { name: 'Hasselblad X2D 100C', spec: '100-Megapixel Medium Format 16-Bit RAW' },
    ]
  },
  {
    category: 'Optics & Anamorphic Lenses',
    items: [
      { name: 'Cooke Anamorphic /i Full Frame Plus', spec: '2x Squeeze • Signature Cooke Look & Flares' },
      { name: 'Arri Zeiss Ultra Primes (16, 24, 32, 50, 85mm)', spec: 'T1.9 Cinema Primes with unmatched resolving power' },
      { name: 'Laowa 24mm T14 2X PeriProbe', spec: 'Waterproof 90° Probe Macro for extreme product details' },
      { name: 'Sony G-Master II Trio (16-35, 24-70, 70-200)', spec: 'f/2.8 Constant Aperture with blazing XD Linear Motors' },
    ]
  },
  {
    category: 'Aerial & FPV Rigs',
    items: [
      { name: 'DJI Inspire 3 Cinema Drone', spec: 'Zenmuse X9-8K Air CinemaDNG & ProRes RAW' },
      { name: 'Custom 6S X-Class Cinelifter FPV', spec: 'Carries RED Komodo at up to 150 km/h' },
      { name: 'DJI Mavic 3 Cine Edition', spec: 'Dual Camera Hasselblad with Apple ProRes 422 HQ' },
      { name: 'DJI Transmission & High-Bright Monitors', spec: 'Zero-latency wireless video director monitoring' },
    ]
  },
  {
    category: 'Lighting & Grip',
    items: [
      { name: 'Aputure Electro Storm CS15', spec: '1500W Full-Color Point Source Cinema Light' },
      { name: 'Astera Titan Sound-Reactive Tubes (Kit of 8)', spec: 'Wireless CRMX RGBMintAmber tubes' },
      { name: 'DJI Ronin 4D 4-Axis Stabilizer', spec: 'Z-Axis active stabilization with LiDAR focusing' },
      { name: 'EasyRig Vario 5 with Cinema Gimbal Rig', spec: 'Ergonomic support for heavy handheld operations' },
    ]
  }
];

export const BTS_GALLERY = [
  {
    id: 'bts-1',
    title: 'Rigging RED V-Raptor on Pursuit Vehicle',
    location: 'Yas Marina Circuit, UAE',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
    caption: 'Mounting the gyro-stabilized carbon arm before a 160km/h sprint tracking shot.'
  },
  {
    id: 'bts-2',
    title: 'Glacier Basecamp Pilot Prep',
    location: 'Vatnajökull Highlands, Iceland',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    caption: 'Pre-heating drone batteries and checking wind telemetry in sub-zero Arctic conditions.'
  },
  {
    id: 'bts-3',
    title: 'DaVinci Resolve Color Grading Suite',
    location: 'Studio Post-Suite A',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80',
    caption: 'Balancing skin tones and tailoring custom 35mm film grain on calibrated reference OLEDs.'
  },
  {
    id: 'bts-4',
    title: 'Lake Como Riva Boat Chase',
    location: 'Villa d’Este, Italy',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    caption: 'Dual camera chase sequence catching golden hour light across the alpine waters.'
  }
];

export const CLIENT_TESTIMONIALS = [
  {
    id: 't-1',
    quote: "AYUV Studios delivered a commercial film that completely redefined our brand identity. The dynamic high-speed camera work and cinematic color grading felt straight out of a Hollywood feature.",
    author: 'Julian Weber',
    title: 'Head of Global Brand & Media',
    company: 'Porsche Motorsport',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    tag: 'Automotive Commercial',
    views: '18M+ Views'
  },
  {
    id: 't-2',
    quote: "Finding an agency that masters both 100MP still editorial and fluid 8K drone cinematography is exceedingly rare. Ayuv and his crew operate with calm precision even under high fashion week pressure.",
    author: 'Clara Delacroix',
    title: 'Senior Fashion Director',
    company: 'Condé Nast / Vogue',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    tag: 'Haute Couture Editorial',
    views: '12-Page Spread'
  },
  {
    id: 't-3',
    quote: "Our wedding film in Lake Como brought tears to everyone who watched it. It was not just a wedding video; it was an authentic heirloom film that felt deeply personal and visually magnificent.",
    author: 'Sophia & Julian Rossi',
    title: 'Private Clients',
    company: 'Destination Wedding, Villa d’Este',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    tag: 'Luxury Wedding Film',
    views: 'Heirloom Feature'
  },
  {
    id: 't-4',
    quote: "The drone footage captured in Iceland was nothing short of miraculous. Flying in 40-knot sub-zero winds and capturing butter-smooth 8K ProRes RAW footage elevated our entire documentary series.",
    author: 'Harrison Thorne',
    title: 'Senior Supervising Producer',
    company: 'National Geographic Expeditions',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    tag: 'Expedition Documentary',
    views: 'Broadcast Premiere'
  }
];

export const BRAND_LOGOS = [
  { name: 'Porsche Motorsport', label: 'PORSCHE' },
  { name: 'Vogue Magazine', label: 'VOGUE' },
  { name: 'National Geographic', label: 'NAT GEO' },
  { name: 'Audemars Piguet', label: 'AUDEMARS PIGUET' },
  { name: 'Red Bull Media', label: 'RED BULL' },
  { name: 'The Luxury Collection', label: 'THE LUXURY COLLECTION' },
  { name: 'Sony CineAlta', label: 'SONY CINE' },
  { name: 'DJI Enterprise', label: 'DJI' }
];
