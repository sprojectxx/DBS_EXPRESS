import { useEffect } from 'react'
import { signUpUrl } from '../data/siteContent'
import { HeroDashboard } from '../components/HeroDashboard'
import { IntegrationsSection } from '../components/IntegrationsSection'
import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { WorkflowSection } from '../components/WorkflowSection'
import { useScrollRevealContainer } from '../hooks/useScrollReveal'

const checkTypes = ['Basic DBS check', 'Standard DBS check', 'Enhanced DBS check']

const checkDetails = [
  {
    image: '/assets/team-collaboration.jpg',
    badge: 'For any purpose',
    description:
      'For any purpose, including employment. Shows unspent convictions and conditional cautions.',
    href: '/individuals',
    linkLabel: 'Basic check details',
  },
  {
    image: '/assets/compliance-documents.jpg',
    badge: 'Eligible roles only',
    description:
      'For certain roles. Shows relevant spent and unspent convictions and cautions that are not filtered.',
    href: '/employers',
    linkLabel: 'Standard check details',
  },
  {
    image: '/assets/fast-turnaround.jpg',
    badge: 'Eligible roles only',
    description:
      'For roles eligible for an Enhanced check. It may also include relevant information held by local police.',
    href: '/employers',
    linkLabel: 'Enhanced check details',
  },
]

function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-copy reveal-on-scroll">
        <p className="eyebrow"><span /> DBS CHECK GUIDANCE</p>
        <h1 id="hero-title">
          Make your next DBS check <span className="text-accent">clearer.</span>
        </h1>
        <p className="hero-description">
          A straightforward place to understand Basic, Standard, and Enhanced DBS checks — and
          find the right next step for you.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="/individuals">
            Apply for my own check <span aria-hidden="true">↗</span>
          </a>
          <a className="button button-secondary" href={signUpUrl} target="_blank" rel="noreferrer">
            Register my organisation <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <p className="hero-note">For individuals and employers <span aria-hidden="true">·</span> Clear guidance, all in one place</p>
      </div>
      <HeroDashboard />
    </section>
  )
}

function CheckTypesSection() {
  return (
    <section className="check-types-section section-pad" id="services" aria-labelledby="check-types-title">
      <div className="check-types-heading reveal-on-scroll">
        <p className="eyebrow"><span /> DBS CHECKS</p>
        <h2 id="check-types-title">Different roles. <span className="text-accent">Different checks.</span></h2>
        <p>Start with the role. The right check depends on what the position is legally eligible for.</p>
      </div>
      <div className="check-types-grid check-types-grid--deck reveal-on-scroll">
        {checkTypes.map((checkType, index) => (
          <a
            className="check-type-card check-type-card--featured-image"
            href={checkDetails[index].href}
            aria-label={`${checkType} details`}
            key={checkType}
          >
            <div className="check-type-card__media">
              {checkDetails[index].image && (
                <img
                  src={checkDetails[index].image}
                  alt={checkType}
                  className="check-type-card__img"
                  loading="lazy"
                />
              )}
              <span className="check-type-card__badge">{checkDetails[index].badge}</span>
            </div>
            <div className="check-type-card__body">
              <h3>{checkType}</h3>
              <p>{checkDetails[index].description}</p>
              <span className="check-type-card__action">
                {checkDetails[index].linkLabel}
                {' '}<span aria-hidden="true">↗</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section className="pricing-overview section-pad reveal-on-scroll" id="pricing" aria-labelledby="pricing-title">
      <div className="pricing-overview__copy">
        <p className="eyebrow"><span /> PRICING</p>
        <h2 id="pricing-title">See the latest pricing for your check.</h2>
        <p>
          Check the current fees and volume options directly with DBS-Express before you apply.
        </p>
      </div>
      <a className="button button-primary" href="/pricing">
        View current pricing <span aria-hidden="true">↗</span>
      </a>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="faq-section section-pad reveal-on-scroll" id="faq" aria-labelledby="faq-title">
      <div className="faq-section__intro">
        <p className="eyebrow"><span /> HERE TO HELP</p>
        <h2 id="faq-title">Questions, <span className="text-accent">made simpler.</span></h2>
        <p>Quick answers to help you understand the different levels of DBS check.</p>
      </div>
      <div className="faq-list">
        <details className="faq-item">
          <summary>What is the difference between Basic, Standard, and Enhanced checks?</summary>
          <p>
            Each level can show different information, and Standard and Enhanced checks are only
            available for roles that meet legal eligibility requirements.{' '}
            <a href="https://www.gov.uk/government/organisations/disclosure-and-barring-service/about" target="_blank" rel="noreferrer">
              Read the DBS guidance <span aria-hidden="true">↗</span>
            </a>
          </p>
        </details>
        <details className="faq-item">
          <summary>Can I apply for a Basic DBS check myself?</summary>
          <p>
            Yes. A person can apply for a Basic check directly; an employer can also apply with the
            applicant’s consent.{' '}
            <a href="https://www.gov.uk/request-copy-criminal-record" target="_blank" rel="noreferrer">
              Apply for a Basic check <span aria-hidden="true">↗</span>
            </a>
          </p>
        </details>
        <details className="faq-item">
          <summary>Can anyone request a Standard or Enhanced check?</summary>
          <p>
            No. These checks are limited to roles that meet the legal eligibility criteria. The
            recruiting organisation should confirm the correct level for the role.
          </p>
        </details>
        <details className="faq-item">
          <summary>Where can I get help with my application?</summary>
          <p>
            Contact the DBS-Express team for support with choosing a check or completing an
            application.{' '}
            <a href="/contact">
              Contact DBS-Express <span aria-hidden="true">↗</span>
            </a>
          </p>
        </details>
      </div>
    </section>
  )
}

function NextStepsSection() {
  return (
    <section className="next-steps-section section-pad reveal-on-scroll" id="contact" aria-labelledby="next-steps-title">
      <div>
        <p className="eyebrow"><span /> NEED A HAND?</p>
        <h2 id="next-steps-title">Not sure which check you need?</h2>
        <p className="next-steps-copy">The DBS-Express team can help you find the right place to start.</p>
      </div>
      <div className="next-steps-actions">
        <a className="button button-primary" href="/contact">
          Make an enquiry <span aria-hidden="true">↗</span>
        </a>
        <a className="button button-secondary" href={signUpUrl} target="_blank" rel="noreferrer">
          Start an application <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}

export function HomePage() {
  const mainRef = useScrollRevealContainer<HTMLElement>()

  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace(/^#/, '').toLowerCase()
      if (!rawHash) return
      const targetId =
        rawHash === 'dbs-checks'
          ? 'services'
          : rawHash === 'how-it-works'
            ? 'workflow'
            : rawHash === 'faqs'
              ? 'faq'
              : rawHash

      const el = document.getElementById(targetId) || document.getElementById(rawHash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      }
    }

    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" ref={mainRef}>
        <Hero />
        <CheckTypesSection />
        <WorkflowSection />
        <IntegrationsSection />
        <PricingSection />
        <FaqSection />
        <NextStepsSection />
      </main>
      <SiteFooter />
    </div>
  )
}
