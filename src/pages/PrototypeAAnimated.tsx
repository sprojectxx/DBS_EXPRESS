import { loginUrl, signUpUrl, sourceSite } from '../data/siteContent'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { CardStack } from '../components/CardStack'
import { useReveal } from '../hooks/useScrollReveal'
import { StatisticsSection } from '../components/StatisticsSection'
import { WorkflowSection } from '../components/WorkflowSection'
import { IntegrationsSection } from '../components/IntegrationsSection'
import { CookieConsent } from '../components/CookieConsent'

const checkTypes = ['Basic DBS check', 'Standard DBS check', 'Enhanced DBS check']

const checkDetails = [
  {
    image: '/assets/team-collaboration.jpg',
    badge: 'Most Common',
    description:
      'Covers unspent convictions and conditional cautions. Suitable for individuals and roles.',
    href: `${sourceSite}/individuals`,
    linkLabel: 'Basic check information',
  },
  {
    image: '/assets/compliance-documents.jpg',
    badge: 'Regulated Roles',
    description: 'Review Standard DBS information on the DBS-Express employer page.',
    href: `${sourceSite}/employers`,
    linkLabel: 'Employer check information',
  },
  {
    image: '/assets/fast-turnaround.jpg',
    badge: 'Comprehensive',
    description: 'Review Enhanced DBS information on the DBS-Express employer page.',
    href: `${sourceSite}/employers`,
    linkLabel: 'Employer check information',
  },
]

function BackToPicker() {
  return (
    <a className="back-to-picker" href="/">
      <span aria-hidden="true">←</span> All design directions
    </a>
  )
}

/* ─── Hero ─── */
function AnimatedHero() {
  const copyRef = useReveal<HTMLDivElement>(0.1)

  return (
    <section
      className="hero-section hero-section--a prototype--a-anim__hero"
      aria-labelledby="anim-hero-title"
    >
      <div className="hero-copy reveal-block" ref={copyRef}>
        <p className="eyebrow">
          <span /> DBS CHECK PROCESSING
        </p>
        <h1 id="anim-hero-title">
          <span className="text-accent">Background checks that</span>
          <br />
          don&rsquo;t slow you down.
        </h1>
        <p className="hero-description">
          Reduce time-to-hire with automated Basic, Standard, and Enhanced DBS check processing. Apply online in under 10 minutes.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href={signUpUrl} target="_blank" rel="noreferrer">
            Get started <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a className="button button-secondary" href="#services">
            View check types <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* Animated card stack replaces the static service-overview */}
      <CardStack />
    </section>
  )
}

/* ─── Check types with AI images ─── */
function AnimatedCheckTypes() {
  const headingRef = useReveal<HTMLDivElement>(0.15)

  return (
    <section
      className="check-types-section section-pad check-types-section--a"
      id="services"
      aria-labelledby="anim-check-types-title"
    >
      <div className="check-types-heading reveal-block" ref={headingRef}>
        <p className="eyebrow">
          <span /> DBS CHECKS
        </p>
        <h2 id="anim-check-types-title">Compare the available check types.</h2>
        <p>Read the DBS-Express information for each check before continuing.</p>
      </div>
      <div className="check-types-grid">
        {checkTypes.map((checkType, index) => (
          <article className="check-type-card check-type-card--featured-image" key={checkType}>
            <div className="check-type-card__media">
              <img
                src={checkDetails[index].image}
                alt={checkType}
                className="check-type-card__img"
                width="400"
                height="220"
                loading="lazy"
              />
              <span className="check-type-card__badge">{checkDetails[index].badge}</span>
            </div>
            <div className="check-type-card__body">
              <span className="check-type-card__index" aria-hidden="true">{`0${index + 1}`}</span>
              <h3>{checkType}</h3>
              <p>{checkDetails[index].description}</p>
              <a href={checkDetails[index].href} target="_blank" rel="noreferrer" className="check-type-card__action">
                {checkDetails[index].linkLabel} <span aria-hidden="true">→</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ─── Pricing matching 3-card reference ─── */
function AnimatedPricing() {
  const ref = useReveal<HTMLDivElement>(0.15)

  return (
    <section
      className="pricing-section section-pad pricing-section--a"
      id="pricing"
      aria-labelledby="anim-pricing-title"
    >
      <div className="pricing-section__header reveal-block" ref={ref}>
        <p className="eyebrow">
          <span /> TRANSPARENT PRICING
        </p>
        <h2 id="anim-pricing-title">Simple volume rates. No hidden fees.</h2>
        <p>Choose the tier that matches your hiring volume, with no setup fees or long-term lock-in.</p>
      </div>

      <div className="pricing-cards-grid">
        <article className="pricing-tier-card">
          <h3 className="pricing-tier-card__title">Pay As You Go</h3>
          <p className="pricing-tier-card__volume">1 to 99 checks / year</p>
          <div className="pricing-tier-card__price">
            <span className="pricing-tier-card__amount">£37.70</span>
            <span className="pricing-tier-card__unit">per check</span>
          </div>
          <p className="pricing-tier-card__desc">Ideal for small teams and occasional hires needing fast results.</p>
          <ul className="pricing-tier-card__features">
            <li>Basic &amp; Standard DBS checks</li>
            <li>Online digital verification</li>
            <li>Electronic result delivery</li>
          </ul>
          <a className="button button-secondary pricing-tier-card__btn" href={signUpUrl} target="_blank" rel="noreferrer">
            Get started ↗
          </a>
        </article>

        <article className="pricing-tier-card pricing-tier-card--featured">
          <span className="pricing-tier-card__tag">RECOMMENDED FOR TEAMS</span>
          <h3 className="pricing-tier-card__title">Volume Tier</h3>
          <p className="pricing-tier-card__volume">100 to 499 checks / year</p>
          <div className="pricing-tier-card__price">
            <span className="pricing-tier-card__amount">£35.30</span>
            <span className="pricing-tier-card__unit">per check</span>
          </div>
          <p className="pricing-tier-card__desc">Best value for growing companies with regular onboarding cycles.</p>
          <ul className="pricing-tier-card__features">
            <li>Everything in Pay As You Go</li>
            <li>Enhanced DBS checks available (£63.30)</li>
            <li>Free Right to Work verification</li>
            <li>Automated candidate reminders</li>
          </ul>
          <a className="button button-gold pricing-tier-card__btn" href={signUpUrl} target="_blank" rel="noreferrer">
            Choose Volume Tier ↗
          </a>
        </article>

        <article className="pricing-tier-card">
          <h3 className="pricing-tier-card__title">Enterprise</h3>
          <p className="pricing-tier-card__volume">500+ checks / year</p>
          <div className="pricing-tier-card__price">
            <span className="pricing-tier-card__amount">£34.10</span>
            <span className="pricing-tier-card__unit">per check</span>
          </div>
          <p className="pricing-tier-card__desc">Tailored high-volume compliance for enterprise organisations.</p>
          <ul className="pricing-tier-card__features">
            <li>Lowest processing rate per check</li>
            <li>Direct REST API &amp; Webhooks</li>
            <li>Dedicated account manager</li>
          </ul>
          <a className="button button-secondary pricing-tier-card__btn" href={signUpUrl} target="_blank" rel="noreferrer">
            Contact Team ↗
          </a>
        </article>
      </div>
    </section>
  )
}

/* ─── Next steps ─── */
function AnimatedNextSteps() {
  const ref = useReveal<HTMLDivElement>(0.15)

  return (
    <section
      className="next-steps-section section-pad next-steps-section--a"
      aria-labelledby="anim-next-steps-title"
    >
      <div className="reveal-block" ref={ref}>
        <p className="eyebrow">
          <span /> DBS-EXPRESS
        </p>
        <h2 id="anim-next-steps-title">Continue to the service when you're ready.</h2>
      </div>
      <div className="next-steps-actions">
        <a className="button button-primary" href={signUpUrl} target="_blank" rel="noreferrer">
          Open application service <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a className="button button-secondary" href={loginUrl} target="_blank" rel="noreferrer">
          Portal login <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  )
}

/* ─── Page ─── */
export function PrototypeAAnimated() {
  return (
    <div className="site-shell prototype--a prototype--a-anim">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader variant="a" />
      <div className="prototype-meta">
        <BackToPicker />
        <span>
          Animation experiment <span aria-hidden="true">/</span> Prototype A
        </span>
      </div>
      <main id="main-content">
        <AnimatedHero />
        <AnimatedCheckTypes />
        <WorkflowSection />
        <IntegrationsSection />
        <StatisticsSection />
        <AnimatedPricing />
        <AnimatedNextSteps />
      </main>
      <SiteFooter />
      <CookieConsent />
      <div className="preview-disclaimer">
        <span aria-hidden="true">i</span>
        <p>
          This is an experimental animation variant of Prototype A. Applications and account
          access are handled by the DBS-Express service.
        </p>
      </div>
    </div>
  )
}
