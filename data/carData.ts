export interface HudPhase {
  id: string;
  title: string;
  subtitle: string;
  body: string[];
  alignment: 'left' | 'right' | 'center';
  scrollStart: number;
  scrollEnd: number;
}

export interface Spec {
  label: string;
  value: string;
  unit: string;
  icon: string;
}

export interface Feature {
  title: string;
  description: string;
  detail: string;
}

export const HUD_PHASES: HudPhase[] = [
  {
    id: 'hero',
    title: 'BMW',
    subtitle: 'M5 COMPETITION',
    body: [
      'The ultimate driving machine',
      'Track-ready precision.',
      'Uncompromising luxury.',
    ],
    alignment: 'left',
    scrollStart: 0,
    scrollEnd: 0.33,
  },
  {
    id: 'design',
    title: 'INNOVATION',
    subtitle: 'M xDrive System',
    body: [
      'Power sent to where it matters.',
      'Unrelenting grip on every apex.',
      'Drift at the push of a button.',
    ],
    alignment: 'left',
    scrollStart: 0.33,
    scrollEnd: 0.66,
  },
  {
    id: 'engine',
    title: 'HEART OF M',
    subtitle: 'M TwinPower Turbo V8 • 617 HP',
    body: [
      'Relentless acceleration.',
      'Symphonic exhaust note.',
      '4.4L V8 at your absolute command.',
    ],
    alignment: 'right',
    scrollStart: 0.66,
    scrollEnd: 1.0,
  },
];

export const ENGINE_SPECS: Spec[] = [
  { label: 'ENGINE', value: '4.4L V8', unit: 'Twin-Turbo', icon: '⚙' },
  { label: 'POWER', value: '617', unit: 'HP', icon: '⚡' },
  { label: 'TORQUE', value: '750', unit: 'Nm', icon: '🔄' },
  { label: '0–100', value: '3.3', unit: 'sec', icon: '⏱' },
  { label: 'TOP SPEED', value: '305', unit: 'km/h', icon: '🏁' },
  { label: 'WEIGHT', value: '1,970', unit: 'kg', icon: '⚖' },
];

export const FEATURES: Feature[] = [
  {
    title: 'M xDRIVE',
    description: 'Intelligent All-Wheel Drive',
    detail:
      'Seamlessly shifting power between the front and rear axles, the M xDrive system ensures maximum traction out of corners, with the ability to switch to pure RWD mode for purist drifting.',
  },
  {
    title: 'PERFORMANCE',
    description: 'Track-Ready Dynamics',
    detail:
      'Featuring M-specific adaptive suspension, massive M Compound brakes, and a lightning-fast 8-speed M Steptronic transmission, the M5 delivers unyielding precision at all speeds.',
  },
  {
    title: 'LUXURY',
    description: 'Executive Aggression',
    detail:
      'Inside, the cabin blends ultimate performance with daily drivability. Full Merino leather, carbon fiber trim, and unmatched technological presence wrap the driver in sophisticated power.',
  },
];

export const PRICE = '€ 140,000';
export const PRODUCTION_COUNT = 0; // Or whatever large number
export const YEAR = 2021;
