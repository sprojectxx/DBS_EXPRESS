import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { signUpUrl } from '../data/siteContent'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'

type PageSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

const articleSummaries = [
  {
    category: 'Guides',
    readTime: '4 min read',
    date: 'August 10, 2026',
    title: 'Understanding DBS Check Levels: Basic vs Standard vs Enhanced',
    summary: 'Which DBS check does your role or employee require? Learn the key differences and legal guidelines for 2026.',
    path: '/resources/understanding-dbs-check-levels-2026',
  },
  {
    category: 'Compliance',
    readTime: '5 min read',
    date: 'August 05, 2026',
    title: 'How Fast Are DBS Checks Processed?',
    summary: 'Discover current government processing times and tips for avoiding delays with your DBS application.',
    path: '/resources/how-fast-are-dbs-checks-processed',
  },
  {
    category: 'Legal',
    readTime: '6 min read',
    date: 'July 28, 2026',
    title: 'Data Protection Compliance when Storing Candidate Record Checks',
    summary: 'Important legal rules every employer must follow when managing DBS certificate information.',
    path: '/resources/gdpr-and-criminal-record-checks',
  },
  {
    category: 'Guides',
    readTime: '4 min read',
    date: 'July 15, 2026',
    title: 'DBS Update Service: How It Works & Benefits for Employers',
    summary: 'Learn how registering certificates on the DBS Update Service saves time and money on annual checks.',
    path: '/resources/dbs-update-service-explained',
  },
]

const faqItems = [
  ['What is the difference between Basic, Standard, and Enhanced checks?', 'Each level can show different information, and Standard and Enhanced checks are only available for roles that meet legal eligibility requirements.'],
  ['Can I apply for a Basic DBS check myself?', 'Yes. A person can apply for a Basic check directly; an employer can also apply with the applicant’s consent.'],
  ['Can anyone request a Standard or Enhanced check?', 'No. These checks are limited to roles that meet the legal eligibility criteria. The recruiting organisation should confirm the correct level for the role.'],
  ['Do I need an employer to apply for a Basic DBS check?', 'No. Any individual in England or Wales can request a Basic DBS check for themselves online without employer sponsorship.'],
  ['What documents do I need to verify my identity?', 'You will need a valid Passport or Photocard Driving Licence, plus proof of address such as a bank statement or utility bill issued within the last 3 months.'],
  ['How long does individual processing take?', 'Most Basic checks are completed in under 24–48 hours when submitted using digital ID verification before 4pm UK time.'],
  ['Will I receive an official paper certificate?', 'Yes. An official DBS paper certificate is dispatched by post to your home address, and a digital summary is accessible online.'],
  ['What is the Update Service?', 'The DBS Update Service allows you to keep your certificate up to date online for £13/year, letting future employers check your status instantly.'],
  ['Where can I get help with my application?', 'Contact the DBS-Express team for support with choosing a check or completing an application.'],
]

function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description: string }) {
  return (
    <header className="route-page__hero">
      {eyebrow && <p className="eyebrow"><span /> {eyebrow}</p>}
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  )
}

function CtaBand({ title, description, href = signUpUrl, label = 'Start an application' }: { title: string; description: string; href?: string; label?: string }) {
  const external = href.startsWith('http')
  return (
    <section className="route-page__cta section-pad">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <a className="button button-primary" href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {label} <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}

function SectionList({ sections, className = '' }: { sections: PageSection[]; className?: string }) {
  return (
    <div className={`route-page__sections${className ? ` ${className}` : ''}`}>
      {sections.map((section) => (
        <section className="route-page__section" key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && (
            <ul>
              {section.bullets.map((bullet) => <li key={bullet}><span aria-hidden="true">✓</span>{bullet}</li>)}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}

function EmployersPage() {
  return <RouteLayout pageClassName="route-page--employers">
    <PageHero eyebrow="EMPLOYERS" title="Workforce DBS screening & onboarding" description="Order and track candidate checks from an all-in-one employer portal. Combine Basic, Standard, and Enhanced DBS with free Right to Work verification, biometric Digital ID, and automated referee tracking." />
    <SectionList sections={[
      { title: 'How candidate checks work on our platform', paragraphs: ['Take a look at the actual 4-step workflow inside our accredited portal. From user creation to automated referee reminders and government submission.'], bullets: ['Candidate Setup — Add candidate details, assign internal departments, and enter targeted job roles in seconds.', 'Service Bundling — Select DBS checks and available additional services.', 'Eligibility Check — Confirm the lawful DBS level for the role.', 'Billing & Split — Configure how the organisation and candidate pay.'] },
      { title: 'Select required check tier', paragraphs: ['Compare Basic, Standard, and Enhanced eligibility criteria for your candidate roles.', 'Basic DBS checks show unspent convictions and conditional cautions. They are available for any job role, self-employed individuals, and personal reference. Standard and Enhanced checks require an eligible role and employer request.'] },
      { title: 'Beyond DBS: Complete workforce compliance', bullets: ['Free Right to Work Checks — Fully compliant UK Home Office Right to Work checks provided at zero extra cost alongside candidate DBS applications.', 'Automated Reference Checks (£2.95) — Hands-off referee management with automated chase reminders.', 'Digital ID Verification (£6.50) — Candidates scan biometric chips from smartphones.', 'Flexible Payment Splitting — Configure whether your organisation pays 100%, splits costs, or has the candidate pay.', 'Role-Based Team Access — Assign Company Admins and departmental Evidence Checkers.', 'One-Click Excel Reports — Export compliance matrices and candidate progress trackers directly to Excel.'] },
    ]} />
    <CtaBand title="Set up your employer account" description="Create your organization profile in under 5 minutes with zero setup fees. Start issuing candidate checks immediately with volume discount rates." label="Open Employer Account" />
  </RouteLayout>
}

const individualPricingRows = [
  ['Basic', '£20.00', '£22.00', '£42.00'],
  ['Volunteer', '£0.00', '£18.00', '£18.00'],
  ['Digital ID', 'None', '£6.50', '£6.50'],
]

function IndividualsPricingTable() {
  return (
    <div className="route-table-wrap" tabIndex={0} aria-label="Individual DBS check pricing">
      <table className="route-table">
        <thead>
          <tr>
            <th>Check</th>
            <th>Gov fee</th>
            <th>Admin fee</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {individualPricingRows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, idx) => (
                <td key={idx} style={idx === 3 ? { fontWeight: 700 } : undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function IndividualsPage() {
  return <RouteLayout pageClassName="route-page--individuals">
    <PageHero eyebrow="INDIVIDUALS" title="Apply for your individual DBS check" description="Starting a new job, applying for a voluntary role, or completing a university placement? Apply online for your official DBS certificate in under 10 minutes with same-day processing for submissions before 4pm UK time." />
    <div className="route-page__pricing section-pad" style={{ maxWidth: '820px', marginInline: 'auto' }}>
      <section className="route-price-card">
        <h2>Individual check pricing</h2>
        <p>Fixed, upfront fees with zero hidden charges. All government statutory charges included.</p>
        <IndividualsPricingTable />
      </section>
    </div>
    <SectionList sections={[
      { title: 'Transparent individual rates', paragraphs: ['Fixed, upfront fees with zero hidden charges. All government statutory charges included.', 'Basic DBS Check — £42.00 (£20.00 Gov Fee + £22.00 Admin Fee). Unspent criminal convictions and conditional cautions. Anyone can apply directly online.', 'Volunteer DBS Check — £18.00 (£0.00 Gov Fee waived + £18.00 Admin Fee). Eligible non-remunerated voluntary roles with charities, schools, and community groups.', 'Digital ID Verification — £6.50. Verifies your passport or driving licence digitally in 3 minutes without posting physical documents.'] },
      { title: 'Check eligibility & options', paragraphs: ['Under statutory rules, individuals can apply directly for a Basic DBS check. Standard and Enhanced checks require an employer request.'] },
      { title: 'Fast & paperless online applications', paragraphs: ['Our online application form takes under 10 minutes to complete. Digital identity checks eliminate the need to post original identity documents.'] },
    ]} />
    <CtaBand title="Start your Basic DBS application online" description="Complete your online form in under 10 minutes with secure digital identity verification." />
  </RouteLayout>
}

const basicStandardPricingRows = [
  ['Tier 1 (1–99 a year)', '£20.00', '£17.70', '£37.70'],
  ['Tier 2 (100–499 a year)', '£20.00', '£15.30', '£35.30'],
  ['Tier 3 (500–1,499 a year)', '£20.00', '£14.10', '£34.10'],
]

const enhancedPricingRows = [
  ['Tier 1 (1–99 a year)', '£41.00', '£24.70', '£65.70'],
  ['Tier 2 (100–499 a year)', '£41.00', '£22.30', '£63.30'],
  ['Tier 3 (500–1,499 a year)', '£41.00', '£21.10', '£62.10'],
]

function PricingTable({ enhanced = false }: { enhanced?: boolean }) {
  const rows = enhanced ? enhancedPricingRows : basicStandardPricingRows
  return (
    <div className="route-table-wrap" tabIndex={0} aria-label={`${enhanced ? 'Enhanced' : 'Basic and Standard'} DBS pricing`}>
      <table className="route-table">
        <thead>
          <tr>
            <th>Tier</th>
            <th>Gov fee</th>
            <th>Admin fee</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, idx) => (
                <td key={idx} style={idx === 3 ? { fontWeight: 700 } : undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PricingPage() {
  return <RouteLayout>
    <PageHero eyebrow="PRICING" title="Official DBS check pricing" description="Government statutory fees paired with clear, volume-discounted administration rates. Transparent pricing with zero hidden subscription charges." />
    <div className="route-page__pricing section-pad">
      <section className="route-price-card">
        <h2>Clear, transparent DBS check pricing.</h2>
        <p>Official government disclosure fees with discounted administration charges. Full compliance with zero hidden subscription costs.</p>
        <h3>Basic & Standard DBS Checks</h3>
        <p>Priced by annual submission volume. Includes government fees and digital processing.</p>
        <PricingTable />
        <h3>Enhanced DBS Checks</h3>
        <p>For regulated activity roles in education, healthcare, childcare, and vulnerable adult care.</p>
        <PricingTable enhanced />
      </section>
      <SectionList className="pricing-billing-panel" sections={[{ title: 'Pricing & billing details', bullets: [
        'The total client price combines the official DBS government fee plus our transparent administration fee.',
        'Administration fees drop automatically as annual submission tiers increase: from £17.70 in Tier 1 down to £14.10 in Tier 3 (and from £24.70 down to £21.10 for Enhanced).',
        'Employers can choose whether the business covers 100% of the check fee, splits a designated percentage with the applicant, or has the applicant pay directly.',
        'The UK government waives the disclosure fee for eligible non-remunerated voluntary roles (£0.00 gov fee). Only a flat £18.00 portal administration fee applies.',
        'Digital ID allows candidates to securely verify their passport or driving licence and address from their phone.'
      ] }]} />
    </div>
    <CtaBand title="Ready to start your submission?" description="Set up an account in under 10 minutes. Submissions received before 4pm UK time are processed same-day." />
  </RouteLayout>
}

function ResourcesPage() {
  return <RouteLayout pageClassName="route-page--resources">
    <PageHero eyebrow="RESOURCES" title="Resources & guides" description="Articles, compliance advice, and regulatory guidance on DBS criminal record checks in England and Wales." />
    <div className="resource-list section-pad">{articleSummaries.map((article) => <article className="resource-card" key={article.path}><div className="resource-card__meta"><span>{article.category}</span><span>{article.readTime}</span></div><h2><a href={article.path}>{article.title}</a></h2><p>{article.summary}</p><div className="resource-card__footer"><span>{article.date}</span><a href={article.path}>Read article →</a></div></article>)}</div>
  </RouteLayout>
}

function ArticlePage({ slug }: { slug: string }) {
  const article = articleSummaries.find((item) => item.path.endsWith(slug)) ?? articleSummaries[0]
  const isFirstArticle = article.path.endsWith('understanding-dbs-check-levels-2026')
  return <RouteLayout pageClassName={`route-page--article${isFirstArticle ? '' : ' route-page--article-summary'}`}>
    <article className="route-article section-pad">
      <a className="route-article__back" href="/resources">← Resources</a>
      <PageHero eyebrow={article.category} title={article.title} description={`${article.date} · DBS-Express compliance team · ${article.readTime}`} />
      <div className="route-article__body"><p>{isFirstArticle ? 'Navigating Disclosure and Barring Service (DBS) requirements can feel complex. This guide breaks down essential rules for employers and applicants in England and Wales.' : article.summary}</p>{isFirstArticle ? <><h2>Key regulatory guidelines</h2><p>When conducting criminal record checks in England and Wales, organisations must ensure they hold a lawful basis for requesting information. Requesting an Enhanced check for an ineligible role is an offence under the Rehabilitation of Offenders Act 1974.</p><h2>Best practices for onboarding</h2><ul><li>Verify original ID documents in person or via approved digital identity service providers (IDSPs).</li><li>Maintain clear written policies on the recruitment of ex-offenders.</li><li>Ensure DBS certificate data is stored securely and destroyed in line with your retention schedule.</li></ul></> : <><h2>Source content status</h2><p>The reference listing provides the summary shown above. The full source article body was not independently available during this audit, so no additional wording has been invented here.</p></>}</div>
    </article>
    <CtaBand title="Need advice for your organisation?" description="Our team can help verify which check level your employees legally require under statutory legislation." href="/contact" label="Contact compliance advisors" />
  </RouteLayout>
}

function AboutPage() {
  return <RouteLayout><PageHero title="About DBS-Express" description="DBS-Express is a trading name of Talaty Group Ltd, established to give employers and individuals a faster, simpler route to official DBS criminal record checks." /><SectionList sections={[{ title: 'Why DBS-Express exists', paragraphs: ['Talaty Group Ltd set out to eliminate the administrative delays and confusion that often surround criminal record checking in England and Wales. Many smaller organisations and individuals struggled to understand eligibility requirements or navigate complex paper-based forms.', 'By building a clear front-end application portal connected directly to our accredited processing partner, a leading UK registered umbrella body, DBS-Express combines intuitive user guidance with government-approved database processing.'] }, { title: 'Our operational commitments', bullets: ['Accredited and secure data processing — Your sensitive applicant details, identity documents, and criminal history records are entered directly into our accredited processing partner’s certified infrastructure. DBS-Express does not store candidate disclosure data.', 'Published rates with no hidden fees — All government check fees and administration charges are stated upfront with zero setup fees or surprise contracts.'] }, { title: 'Our mission', paragraphs: ['“To provide a transparent, hassle-free gateway for UK background screening, pairing modern digital access with certified security standards.”'] }]} /><CtaBand title="Questions about DBS-Express?" description="Our support team is available Monday through Friday to assist with check eligibility or organisational registration queries." href="/contact" label="Contact compliance team" /></RouteLayout>
}

function FaqPage() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => faqItems.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <RouteLayout pageClassName="route-page--faq"><PageHero eyebrow="FAQ" title="Questions, made simpler." description="Find clear answers about DBS check levels, applications, eligibility, processing, and support." /><section className="faq-page section-pad"><label htmlFor="faq-search">Search questions</label><input id="faq-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the FAQ" />{filtered.length ? <div className="faq-page__list">{filtered.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div> : <p className="faq-page__empty">No questions matched your search.</p>}</section></RouteLayout>
}

function ContactPage() {
  const emailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=contact%40dbs-express.co.uk'
  return <RouteLayout pageClassName="route-page--contact"><PageHero eyebrow="CONTACT" title="Get in touch" description="Our support team is available Monday–Friday, 9am–5pm. For DBS application status updates, log in to your dashboard directly." /><SectionList sections={[{ title: 'Direct channels', paragraphs: ['Reach our team by phone, email, or post for guidance on organisational registration and eligibility.', 'Office address: Talaty Group Ltd, London, United Kingdom', 'Phone support: 01254 432655. Lines open 9am–5pm, Mon–Fri', 'Email enquiry: contact@dbs-express.co.uk. Mon–Fri responses within 24 hours', 'If you have already submitted an application through our platform, please log in directly to your dashboard to view real-time tracking updates.'] }]} /><CtaBand title="Start Your Application" description="Connect directly with our compliance screening desk. Submissions received before 4pm UK time are dispatched same day." href={emailUrl} label="Start Application" /></RouteLayout>
}

function MaintenancePage() {
  return <RouteLayout pageClassName="route-page--maintenance"><PageHero eyebrow="SERVICE STATUS" title="System Status & Maintenance" description="Real-time status of DBS-Express processing pipelines, applicant portals, and government gateway connections." /><SectionList sections={[{ title: 'All Core Services Operational', bullets: ['DBS-Express Web Portal — Operational', 'eBulk Application Submission Gateway — Operational', 'ID Document Verification Engine — Operational', 'Barred List Query System — Operational', 'Payment Processing (Stripe/Bank) — Operational'] }, { title: 'Routine Maintenance Notice', paragraphs: ['Standard DBS eBulk gateway maintenance is scheduled during off-peak Sunday mornings (02:00 – 06:00 GMT). Submissions made during maintenance windows are securely queued and processed immediately when services resume.', 'Support desk: 01254 432655 (Lines open 9am–5pm, Mon–Fri) · contact@dbs-express.co.uk'] }]} /><CtaBand title="Need to report an issue?" description="Contact the support team for help with access, submission status, or service availability." href="/contact" label="Report an Issue" /></RouteLayout>
}

function OfflinePage() {
  return <RouteLayout pageClassName="route-page--offline"><PageHero eyebrow="CONNECTIVITY SUPPORT" title="Connection Status & Offline Help" description="Troubleshoot internet connection issues while browsing or submitting DBS criminal record applications." /><SectionList sections={[{ title: 'Connected to the Internet', paragraphs: ['Your browser is able to reach DBS-Express services normally.'] }, { title: 'Recommended Troubleshooting Steps', bullets: ['Check Wi-Fi or Cellular — Verify your router signal or toggle mobile data off and on. Ensure airplane mode is disabled.', 'Corporate VPNs & Firewalls — Workplace networks occasionally filter external application portals. Try disconnecting a corporate VPN or contacting your network admin.', 'Reload or Clear Cache — Press Ctrl+F5 (or Cmd+Shift+R on Mac) to bypass cached pages and initiate a fresh handshake with our servers.', 'Government Gateway Status — The Disclosure and Barring Service (DBS eBulk) periodically performs maintenance on weekends or late nights.'] }, { title: 'Need to submit urgently while offline?', paragraphs: ['Call our support team. We can assist with verification or application dispatch by phone: 01254 432655.'] }]} /></RouteLayout>
}

function TeamPage() {
  return <RouteLayout><PageHero title="Our team" description="The Talaty Group team behind DBS-Express's day-to-day operations and employer support." /><SectionList sections={[{ title: 'Advisory Team', paragraphs: ['DBS & Compliance Specialists', 'Advising organisations on safer recruitment policies and DBS check eligibility criteria.'] }, { title: 'Operations Team', paragraphs: ['Customer Success & Support', 'Handling employer onboarding, applicant queries, and turnaround time escalations.'] }, { title: 'Technology Team', paragraphs: ['Integration & Platform', 'Maintaining robust data protection standards and reliable platform connectivity with accredited processing systems.'] }]} /></RouteLayout>
}

function PoliciesPage() {
  return <RouteLayout><PageHero eyebrow="LEGAL & COMPLIANCE" title="Company policies" description="Policy documents and compliance information linked from the DBS-Express reference website." /><SectionList sections={[{ title: 'Policy library', bullets: ['Information Handling Policy for Information Provided By DBS — How we manage information received directly from the Disclosure and Barring Service.', 'Talaty Group Ltd DBS eBulk Data Retention Policy — Data retention periods and practices for eBulk DBS processing.', 'Privacy Policy — How we collect, use, and protect your personal data.', 'Data Protection — Our data protection obligations and your rights under UK GDPR.', 'Terms & Conditions — Terms governing the use of DBS-Express services.'] }, { title: 'Source status', paragraphs: ['The reference website links some policy documents to the external DBS-Express application portal. Those documents are not reproduced here without independently verifying their full legal wording.'] }]} /><CtaBand title="Need a policy document?" description="Contact the DBS-Express team for the current policy or compliance document relevant to your query." href="/contact" label="Contact support" /></RouteLayout>
}

function PrivacyPage() {
  return <RouteLayout><PageHero eyebrow="LEGAL" title="Privacy policy" description="Last updated: August 2026" /><SectionList sections={[{ title: 'How Talaty Group Ltd uses personal data', paragraphs: ['This Privacy Policy explains how Talaty Group Ltd (trading as DBS-Express) collects, uses, and protects personal data when you visit our website at dbs-express.co.uk.'] }, { title: '1. Information we collect', paragraphs: ['We collect contact enquiry information (name, email address, phone number, message details) when you submit enquiry forms on our website.'] }, { title: '2. How we use your data', paragraphs: ['Your information is used solely to respond to your enquiries, provide quote estimates, and connect you to our accredited processing partner.'] }, { title: '3. DBS applicant data scope', paragraphs: ['DBS-Express does not store, process, or retain individual DBS applicant criminal record history or identity documents. All DBS application workflows take place directly on our accredited processing partner’s certified platform.'] }]} /></RouteLayout>
}

function TermsPage() {
  return <RouteLayout><PageHero eyebrow="LEGAL" title="Terms & conditions" description="Last updated: August 2026" /><SectionList sections={[{ title: 'Agreement', paragraphs: ['Welcome to DBS-Express, operated by Talaty Group Ltd. By accessing our site or using our services, you agree to these Terms and Conditions.'] }, { title: '1. Scope of service', paragraphs: ['DBS-Express provides guidance, application assistance, and submission dispatch services for DBS checks. Criminal record check processing and certificate issuance are fulfilled by our accredited umbrella body partner.'] }, { title: '2. User responsibilities', paragraphs: ['Users and employers must ensure they hold the necessary legal entitlement to request criminal record checks under the Rehabilitation of Offenders Act 1974.'] }]} /></RouteLayout>
}

function NotFoundPage({ path }: { path: string }) {
  return <RouteLayout><PageHero eyebrow="404" title="Page not found" description={`We could not find ${path}.`} /><section className="route-page__notice section-pad"><h2>Try another destination</h2><p>Use the main navigation to find DBS guidance, support, resources, and company information.</p><div className="route-page__actions"><a className="button button-primary" href="/">Return home</a><a className="button button-secondary" href="/contact">Contact support</a></div></section></RouteLayout>
}

function RouteLayout({ children, pageClassName = '' }: { children: ReactNode; pageClassName?: string }) {
  return <div className="site-shell"><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content" className={`route-page${pageClassName ? ` ${pageClassName}` : ''}`}>{children}</main><SiteFooter /></div>
}

export function RoutePage({ pathname }: { pathname: string }) {
  useEffect(() => {
    const labels: Record<string, string> = {
      '/employers': 'Employers',
      '/individuals': 'Individuals',
      '/pricing': 'Pricing',
      '/resources': 'Resources',
      '/about': 'About',
      '/faq': 'FAQ',
      '/contact': 'Contact',
      '/maintenance': 'System status',
      '/offline': 'Offline help',
      '/team': 'Our team',
      '/policies': 'Company policies',
      '/privacy-policy': 'Privacy policy',
      '/terms': 'Terms & conditions',
    }
    const label = labels[pathname] ?? (pathname.startsWith('/resources/') ? 'Resources' : 'DBS-Express')
    document.title = `${label} | DBS-Express`
  }, [pathname])

  if (pathname === '/employers') return <EmployersPage />
  if (pathname === '/individuals') return <IndividualsPage />
  if (pathname === '/pricing') return <PricingPage />
  if (pathname === '/resources') return <ResourcesPage />
  if (pathname.startsWith('/resources/')) return <ArticlePage slug={pathname.slice('/resources/'.length)} />
  if (pathname === '/about') return <AboutPage />
  if (pathname === '/faq') return <FaqPage />
  if (pathname === '/contact') return <ContactPage />
  if (pathname === '/maintenance') return <MaintenancePage />
  if (pathname === '/offline') return <OfflinePage />
  if (pathname === '/team') return <TeamPage />
  if (pathname === '/policies') return <PoliciesPage />
  if (pathname === '/privacy-policy') return <PrivacyPage />
  if (pathname === '/terms') return <TermsPage />
  return <NotFoundPage path={pathname} />
}
