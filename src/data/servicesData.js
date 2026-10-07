export const SERVICES_LIST = [
  {
    id: 'videography',
    title: 'Cinematic Videography',
    category: 'Commercial • Narrative • Events',
    subtitle: 'Cinema-grade storytelling captured on RED & Sony Cinema Line.',
    description: 'From multi-million view commercial campaigns to emotive narrative brand films. We provide complete production including scriptwriting, dynamic camera movements, gimbal operations, and cinematic lighting.',
    icon: 'Video',
    deliverables: [
      '8K / 4K DCI master cinema files',
      'Dynamic multi-camera shoot configurations',
      'Anamorphic & prime lens sets',
      'Social media aspect ratios (9:16, 1:1, 16:9)',
      'Professional audio & wireless lavalier setup'
    ],
    startingPrice: 'Custom Scope',
    turnaround: '10 - 14 Business Days'
  },
  {
    id: 'photography',
    title: 'Editorial & Campaign Photography',
    category: 'Fashion • Architecture • Portraits',
    subtitle: 'High-resolution imagery crafted with sculptural lighting.',
    description: 'We craft iconic, timeless imagery with 100-megapixel medium format cameras and studio strobe systems. Designed for luxury brands, high-profile weddings, and high-fashion editorial covers.',
    icon: 'Camera',
    deliverables: [
      '100MP Hasselblad & 50MP Sony A1 RAW files',
      'High-end magazine skin retouching & dodge/burn',
      'Private online client proofing gallery',
      'Commercial usage licensing included',
      'Archival print-ready TIFF & web formats'
    ],
    startingPrice: 'Custom Scope',
    turnaround: '5 - 7 Business Days'
  },
  {
    id: 'drone',
    title: 'Heavy-Lift Drone & High-Speed FPV',
    category: 'Aerial • Pursuit • Landscape',
    subtitle: 'FAA-certified pilots operating cutting-edge cinema drones.',
    description: 'Breathtaking aerial perspectives from the flagship DJI Inspire 3 (X9-8K) and custom 140 km/h acrobatic FPV cinelifters. Smooth tracking of fast vehicles, sprawling estates, and majestic landscapes.',
    icon: 'Plane',
    deliverables: [
      '8K ProRes RAW aerial footage',
      'High-speed FPV dynamic proximity flying',
      'Dual-operator flight & gimbal tracking',
      'Fully insured FAA Part 107 commercial pilots',
      'Airspace authorization & permit acquisition'
    ],
    startingPrice: 'Custom Scope',
    turnaround: '3 - 5 Business Days'
  },
  {
    id: 'post-production',
    title: 'DaVinci Color Grading & Sound Design',
    category: 'Editing • Color Science • Foley',
    subtitle: 'Hollywood-level color transformation and Dolby Atmos audio.',
    description: 'Bring raw footage to life with tailored film print emulation (Kodak 2383 / Fuji 3513), custom LUT development, dialogue denoiser, foley recording, and cinematic orchestral mixing.',
    icon: 'Sliders',
    deliverables: [
      'DaVinci Resolve Studio color grading',
      'ACES / Rec.709 & HDR10 color delivery',
      'Dolby Atmos & 5.1 Surround sound mix',
      'Visual effects, object removal & title design',
      'Uncompressed master archives'
    ],
    startingPrice: 'Custom Scope',
    turnaround: '4 - 7 Business Days'
  }
];

export const PRICING_TIERS = [
  {
    id: 'essential',
    name: 'The Essential',
    badge: 'Emerging Brands',
    price: 3800,
    priceLabel: '$3,800',
    description: 'Ideal for boutique product launches, portrait editorial sets, or focused single-day brand shoots.',
    features: [
      '1 Lead Cinematographer or Photographer',
      '1 Full Day (8 Hours) on-location shooting',
      'Sony FX6 / FX3 4K 10-Bit Setup',
      '1 Hero 60-90s Brand Film + 20 Stills',
      'Full DaVinci Color Grading & Sound Mix',
      'Delivery in 10 business days',
      '1 Round of revisions included'
    ],
    recommendedFor: 'Boutique launches & single-day projects'
  },
  {
    id: 'signature',
    name: 'The Signature',
    badge: 'Most Popular',
    popular: true,
    price: 7500,
    priceLabel: '$7,500',
    description: 'Our award-winning comprehensive production package for high-stakes brand campaigns and luxury weddings.',
    features: [
      'Director + Lead DOP + Second Camera Operator',
      '2 Full Days production coverage',
      'RED V-Raptor 8K VV + Cooke Anamorphic Lenses',
      'DJI Inspire 3 (8K Aerial) 1-Day Flight Included',
      '3-Minute Hero Film + 3x 9:16 Social Cuts',
      '50 Curated High-End Editorial Stills',
      'Bespoke Dolby Atmos Sound Score',
      'Express 7-Day rough cut delivery',
      'Unlimited minor revisions'
    ],
    recommendedFor: 'High-end commercial campaigns & luxury events'
  },
  {
    id: 'masterpiece',
    name: 'The Masterpiece',
    badge: 'Bespoke Cinema',
    price: 14500,
    priceLabel: '$14,500',
    description: 'Uncompromising multi-day world-class cinema production with full crew, pursuit vehicles, and custom scoring.',
    features: [
      'Full Cinematic Crew (Director, 2x DOP, Gaffer, Sound)',
      'Up to 4 Days multi-location shoot (Global Travel Ready)',
      'Dual RED V-Raptor 8K VV + Hasselblad 100MP Stills',
      'Heavy-Lift Drone + 140km/h Custom FPV Rig',
      'Full Brand Narrative Film (5-10 Mins) + 10x Social Cuts',
      'Complete 150+ Image Master Editorial Portfolio',
      'Custom Orchestral Composition & Dolby Atmos 5.1',
      'Rugged Sandisk 2TB SSD with all RAW footage',
      '48-Hour VIP Rush Delivery available'
    ],
    recommendedFor: 'Global brands, feature commercials & multi-day luxury weddings'
  }
];

export const PRICING_ADDONS = [
  { id: 'fpv', name: 'High-Speed FPV Drone Pilot (Half Day)', price: 950 },
  { id: 'rush', name: '48-Hour VIP Rush Delivery', price: 1200 },
  { id: 'raw_ssd', name: 'Raw Cinema Footage on 2TB Rugged SSD', price: 450 },
  { id: 'teleprompter', name: 'Studio Teleprompter & Soundproof Lavalier Kit', price: 350 },
  { id: 'second_dop', name: 'Additional Second Director of Photography', price: 800 },
];
