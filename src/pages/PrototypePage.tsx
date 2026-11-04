import { loginUrl, signUpUrl, sourceSite } from '../data/siteContent'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { useScrollRevealContainer } from '../hooks/useScrollReveal'
import { StatisticsSection } from '../components/StatisticsSection'
import { WorkflowSection } from '../components/WorkflowSection'
import { IntegrationsSection } from '../components/IntegrationsSection'
import { CookieConsent } from '../components/CookieConsent'
import { HeroDashboard } from '../components/HeroDashboard'

export type PrototypeVariant = 'a' | 'b' | 'c'

type PrototypePageProps = {
  variant: PrototypeVariant
}

const prototypeNames: Record<PrototypeVariant, string> = {
  a: 'Clean & trustworthy',
  b: 'Bold & conversion-focused',
  c: 'Editorial & sophisticated',
}

const checkTypes = ['Basic DBS check', 'Standard DBS check', 'Enhanced DBS check']

const prototypeACheckDetails = [
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
    description: 'Review Standard DBS information on the DB-Express employer page.',
    href: `${sourceSite}/employers`,
    linkLabel: 'Employer check information',
  },
  {
    image: '/assets/fast-turnaround.jpg',
    badge: 'Comprehensive',
    description: 'Review Enhanced DBS information on the DB-Express employer page.',
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

function HeroServiceGraphic() {
  return (
    <div className="service-overview reveal-on-scroll" role="group" aria-label="Available DBS check types">
      <div className="service-overview__header">
        <p className="service-overview__label">DBS check types</p>
        <span className="service-overview__tag">Official checks</span>
      </div>
      <ul>
        {checkTypes.map((checkType, index) => (
          <li key={checkType} className="service-overview__item">
            <span aria-hidden="true">{`0${index + 1}`}</span>
            <div className="service-overview__item-content">
              <strong>{checkType}</strong>
              <small>{prototypeACheckDetails[index].badge}</small>
            </div>
            <span className="service-overview__chevron" aria-hidden="true">→</span>
          </li>
        ))}
      </ul>
      <div className="service-overview__footer">
        <a href="#services" className="service-overview__anchor">
          Compare all three check details <span aria-hidden="true">↓</span>
        </a>
      </div>
    </div>
  )
}

function Hero({ variant }: { variant: PrototypeVariant }) {
  return (
    <section className={`hero-section hero-section--${variant}`} aria-labelledby="hero-title">
      <div className="hero-copy reveal-on-scroll">
        <p className="eyebrow"><span /> DBS CHECK PROCESSING</p>
        <h1 id="hero-title">
          <span className="text-accent">Background checks that</span>
          <br />
          don&rsquo;t slow you down.
        </h1>
        <p className="hero-description">
          Reduce time-to-hire with automated Basic, Standard, and Enhanced DBS check processing. Apply online in under 10 minutes.
        </p>
        {variant !== 'b' && (
          <div className="hero-actions">
            <a className="button button-primary" href={signUpUrl} target="_blank" rel="noreferrer">
              Get started <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="button button-secondary" href="#pricing">
              View pricing information <span aria-hidden="true">↓</span>
            </a>
          </div>
        )}
      </div>
      {variant === 'b' ? (
        <aside className="hero-action-panel reveal-on-scroll" aria-label="Next steps">
          <span className="hero-action-panel__number">DBS</span>
          <h2>Choose the next step that works for you.</h2>
          <a className="button button-primary" href={signUpUrl} target="_blank" rel="noreferrer">
            Get started <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="#pricing">See pricing information <span aria-hidden="true">→</span></a>
        </aside>
      ) : variant === 'a' ? (
        <HeroDashboard />
      ) : (
        <HeroServiceGraphic />
      )}
    </section>
  )
}

function CheckTypesSection({ variant }: { variant: PrototypeVariant }) {
  return (
    <section
      className={`check-types-section section-pad check-types-section--${variant}`}
      id="services"
      aria-labelledby="check-types-title"
    >
      <div className="check-types-heading reveal-on-scroll">
        <p className="eyebrow"><span /> DBS CHECKS</p>
        <h2 id="check-types-title">
          {variant === 'a' ? 'Compare the available check types.' : 'Three check types. One clear place to begin.'}
        </h2>
        <p>
          {variant === 'a'
            ? 'Read the DB-Express information for each check before continuing.'
            : 'Check eligibility and application details with DB-Express before applying.'}
        </p>
      </div>
      <div className="check-types-grid reveal-on-scroll">
        {checkTypes.map((checkType, index) => (
          <article className="check-type-card check-type-card--featured-image" key={checkType}>
            <div className="check-type-card__media">
              <img
                src={prototypeACheckDetails[index].image}
                alt={checkType}
                className="check-type-card__img"
                width="400"
                height="220"
                loading="lazy"
              />
              <span className="check-type-card__badge">{prototypeACheckDetails[index].badge}</span>
            </div>
            <div className="check-type-card__body">
              <span className="check-type-card__index" aria-hidden="true">{`0${index + 1}`}</span>
              <h3>{checkType}</h3>
              <p>{prototypeACheckDetails[index].description}</p>
              <a
                href={variant === 'a' ? prototypeACheckDetails[index].href : `${sourceSite}/pricing`}
                target="_blank"
                rel="noreferrer"
                className="check-type-card__action"
              >
                {variant === 'a' ? prototypeACheckDetails[index].linkLabel : 'View pricing information'}
                {' '}<span aria-hidden="true">→</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function PricingSection({ variant }: { variant: PrototypeVariant }) {
  return (
    <section
      className={`pricing-section section-pad pricing-section--${variant} reveal-on-scroll`}
      id="pricing"
      aria-labelledby="pricing-title"
    >
      <div className="pricing-section__header">
        <p className="eyebrow"><span /> TRANSPARENT PRICING</p>
        <h2 id="pricing-title">Simple volume rates. No hidden fees.</h2>
        <p>Choose the tier that matches your hiring volume, with no setup fees or long-term lock-in.</p>
      </div>

      <div className="pricing-cards-grid">
        {/* Tier 1 */}
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

        {/* Tier 2: Featured Signature Card in Dark Emerald matching reference */}
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

        {/* Tier 3 */}
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

function NextStepsSection({ variant }: { variant: PrototypeVariant }) {
  return (
    <section
      className={`next-steps-section section-pad next-steps-section--${variant} reveal-on-scroll`}
      aria-labelledby="next-steps-title"
    >
      <div>
        <p className="eyebrow"><span /> DB-EXPRESS</p>
        <h2 id="next-steps-title">Continue to the service when you're ready.</h2>
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

export function PrototypePage({ variant }: PrototypePageProps) {
  const mainRef = useScrollRevealContainer<HTMLElement>()

  return (
    <div className={`site-shell prototype--${variant}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader variant={variant} />
      <div className="prototype-meta">
        <BackToPicker />
        <span>{prototypeNames[variant]} <span aria-hidden="true">/</span> concept {variant.toUpperCase()}</span>
      </div>
      <main id="main-content" ref={mainRef}>
        <Hero variant={variant} />
        {variant === 'a' ? (
          <>
            <CheckTypesSection variant={variant} />
            <WorkflowSection />
            <IntegrationsSection />
            <StatisticsSection />
                <PricingSection variant={variant} />
            <NextStepsSection variant={variant} />
          </>
        ) : variant === 'b' ? (
          <>
            <NextStepsSection variant={variant} />
            <CheckTypesSection variant={variant} />
            <WorkflowSection />
            <StatisticsSection />
            <IntegrationsSection />
                <PricingSection variant={variant} />
          </>
        ) : (
          <>
            <CheckTypesSection variant={variant} />
            <WorkflowSection />
            <IntegrationsSection />
                <StatisticsSection />
            <PricingSection variant={variant} />
            <NextStepsSection variant={variant} />
          </>
        )}
      </main>
      <SiteFooter />
      <CookieConsent />
      <div className="preview-disclaimer">
        <span aria-hidden="true">i</span>
        <p>This is a design preview. Applications and account access are handled by the DB-Express service.</p>
      </div>
    </div>
  )
}
