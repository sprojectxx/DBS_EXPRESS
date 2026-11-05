export const sourceSite = 'https://db-ssubmit.vercel.app'
export const signUpUrl = 'https://www.dbs-express.co.uk/app/ci/index_controller/sign_up'
export const loginUrl = 'https://www.dbs-express.co.uk/app/login_direct'
export const dbsTrackingUrl =
  'https://disclosure.homeoffice.gov.uk/HomeOfficeExternalPortal/faces/oracle/webcenter/portalapp/pages/StandAloneService.jspx?_adf.ctrl-state=169pj2cuqr_1&_afrLoop=5111340145309177&_afrWindowMode=0&_afrWindowId=null#!%40%40%3F_afrWindowId%3Dnull%26_afrLoop%3D5111340145309177%26_afrWindowMode%3D0%26_adf.ctrl-state%3D169pj2cuqr_5'

export const navigation = [
  { label: 'Employers', href: '/employers' },
  { label: 'Individuals', href: '/individuals' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Track my DBS', href: dbsTrackingUrl },
]

// Archived Direct Channels Information (preserved for future reference per client request)
export const directChannelsArchive = {
  title: 'Direct channels',
  description: 'Reach our team by phone, email, or post for guidance on organisational registration and eligibility.',
  officeAddress: 'Talaty Group Ltd, London, United Kingdom',
  phoneSupport: '01254 432655 (Lines open 9am–5pm, Mon–Fri)',
  emailEnquiry: 'contact@dbs-express.co.uk (Mon–Fri responses within 24 hours)',
  dashboardNotice: 'If you have already submitted an application through our platform, please log in directly to your dashboard to view real-time tracking updates.',
  paragraphs: [
    'Reach our team by phone, email, or post for guidance on organisational registration and eligibility.',
    'Office address: Talaty Group Ltd, London, United Kingdom',
    'Phone support: 01254 432655. Lines open 9am–5pm, Mon–Fri',
    'Email enquiry: contact@dbs-express.co.uk. Mon–Fri responses within 24 hours',
    'If you have already submitted an application through our platform, please log in directly to your dashboard to view real-time tracking updates.',
  ],
}

// Client verification required before display: these promotional claims are retained as source material.
export const benefits = [
  {
    title: 'Built for SMEs & high-volume teams',
    description: 'Pay for what you use, with no contracts',
  },
  {
    title: 'Turnaround times',
    description: 'Same-day processing before 4pm',
  },
  {
    title: 'UK compliance made simple',
    description: 'DBS certificate dispatch information',
  },
]

// Authenticity, attribution, and publication permission must be confirmed before display.
export const testimonials: Array<{
  quote: string
  name: string
  role: string
  image?: string
  initials?: string
}> = [
  {
    quote:
      'DBS-Express took the guesswork out of screening new starters: the pricing is upfront and the checks come back quickly.',
    name: 'Sarah Whitfield',
    role: 'HR Manager, Northgate Care Group',
  },
  {
    quote: 'Setup took ten minutes and our first check was back in three days.',
    name: 'Michael Ossai',
    image: '/assets/michael-ossai.png',
    initials: 'MO',
    role: 'Operations Lead · Fenwick Logistics',
  },
  {
    quote: 'Finally a DBS provider that publishes its prices upfront.',
    name: 'Priya Anand',
    image: '/assets/priya-anand.png',
    initials: 'PA',
    role: 'People Partner · Anand & Co Recruitment',
  },
  {
    quote: 'Support actually replies, which is rare in this industry.',
    name: 'Tom Beckett',
    initials: 'TB',
    role: 'Founder · Beckett Property Management',
  },
]

// Preserve the original values; do not display until the client verifies source and context.
export const statistics = [
  {
    value: '99.4%',
    label: 'First-time application accuracy rate across all sectors',
  },
  {
    value: '< 24h',
    label: 'Average turnaround for electronic Basic check results',
  },
  {
    value: '50k+',
    label: 'UK criminal record checks processed annually',
  },
]

// Public-page values retained for comparison; confirm the current approved fee schedule before display.
export const pricingTiers = [
  {
    tier: 'Tier 1',
    volume: '1 to 99 checks per year',
    basicStandard: '£42.00',
    enhanced: '£73.00',
  },
  {
    tier: 'Tier 2',
    volume: '100 to 499 checks per year',
    basicStandard: '£39.50',
    enhanced: '£70.50',
  },
  {
    tier: 'Tier 3',
    volume: '500 to 1,499 checks per year',
    basicStandard: '£38.00',
    enhanced: '£69.00',
  },
]

export const pricingPageUrl = `${sourceSite}/pricing`

// Confirm current availability and wording with the client before display.
export const integrations = [
  {
    number: '01',
    title: 'Build with API',
    description: 'Developer-First Automation',
    details: [
      'Direct REST endpoints for applicant dispatch and tracking',
      'Instant webhook notifications as soon as certificates are issued',
    ],
  },
  {
    number: '02',
    title: 'Partner integrations',
    description: 'Prebuilt Zero-Code Connectors',
    details: [
      'Plug-and-play connectors for leading HR and ATS platforms',
      'Automated candidate status sync with zero manual re-entry',
    ],
  },
  {
    number: '03',
    title: 'Native web portal',
    description: 'Zero Setup or Coding',
    details: [
      'Dedicated cloud portal to invite candidates and monitor progress',
      'Automated candidate SMS reminders and instant digital downloads',
    ],
  },
]

// Confirm process steps and service details with the client before display.
export const workflow = [
  {
    title: 'Candidate & Role Setup',
    description:
      'Enter applicant details, assign company departments, and use our smart eligibility questionnaire to determine the lawful DBS level (Basic, Standard, or Enhanced).',
  },
  {
    title: 'Bundle Checks & Digital ID',
    description:
      'Select DBS checks and available additional services, including Right to Work verification, Digital ID, and reference checks.',
  },
  {
    title: 'Track & Receive Results',
    description:
      'Follow application status, export compliance records, and receive results. The website says paper certificates are dispatched.',
  },
]

export const footerGroups = [
  {
    title: 'Services',
    links: [
      ['Basic DBS check', '/pricing'],
      ['Standard DBS check', '/pricing'],
      ['Enhanced DBS check', '/pricing'],
      ['Rate matrix & pricing', '/pricing'],
    ],
  },
  {
    title: 'Solutions',
    links: [
      ['Employers & HR teams', '/employers'],
      ['Individual applicants', '/individuals'],
      ['Portal login →', loginUrl],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Blog & guidance', '/resources'],
      ['Knowledge base & FAQ', '/faq'],
      ['System status', '/maintenance'],
      ['Offline & connectivity help', '/offline'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About DBS-Express', '/about'],
      ['Contact support', '/contact'],
      ['Meet the team', '/team'],
    ],
  },
  {
    title: 'Legal & compliance',
    links: [
      ['Company policies', '/policies'],
      ['Privacy policy', '/privacy-policy'],
      ['Terms & conditions', '/terms'],
      ['Cookie policy', '/privacy-policy'],
    ],
  },
]

export function sourceLink(path: string) {
  return path.startsWith('https://') ? path : path
}
