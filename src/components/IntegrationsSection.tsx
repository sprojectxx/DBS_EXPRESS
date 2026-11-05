import { useState, type KeyboardEvent } from 'react'

const researchFindings = [
  {
    category: 'Candidate integrity',
    title: 'CV claims deserve verification.',
    metric: '18%',
    metricLabel:
      'of UK respondents said they or someone they knew had lied on a CV or job application in the previous 12 months.',
    source: 'Source: Cifas Fraud Behaviours Survey, 2025.',
    href: 'https://www.cifas.org.uk/',
  },
  {
    category: 'Identity security',
    title: 'Identity fraud remains a major UK risk.',
    metric: '54%',
    metricLabel:
      'of reported fraud cases recorded in the Cifas National Fraud Database in 2025 involved identity fraud.',
    source: 'Source: Cifas Fraudscape 2026.',
    href: 'https://www.cifas.org.uk/newsroom/fraudscape',
  },
  {
    category: 'Right to work',
    title: 'Compliance failures carry serious financial consequences.',
    metric: '£74M+',
    metricLabel:
      'in civil penalties issued to more than 1,200 businesses for employing people illegally during January–June 2026.',
    source: 'Source: UK Home Office, 2026.',
    href: 'https://www.gov.uk/government/publications/right-to-work-checks-employers-guide',
  },
  {
    category: 'Employer responsibility',
    title: "Verification is every employer's responsibility.",
    metric: '89%',
    metricLabel:
      'of surveyed UK employers understood that employers are responsible for carrying out right-to-work checks.',
    source: 'Source: UK Home Office employer research, 2025.',
    href: 'https://www.gov.uk/government/collections/dbs-eligibility-guidance',
  },
]

export function IntegrationsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const totalCards = researchFindings.length

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const next = (index + 1) % totalCards
      const nextEl = document.getElementById(`fanned-card-${next}`)
      nextEl?.focus()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prev = (index - 1 + totalCards) % totalCards
      const prevEl = document.getElementById(`fanned-card-${prev}`)
      prevEl?.focus()
    }
  }

  return (
    <section
      className="integrations-section research-section section-pad reveal-on-scroll"
      aria-labelledby="integrations-title"
    >
      <div className="research-section__intro">
        <p className="research-section__label">RESEARCH &amp; INSIGHTS</p>
        <h2 id="integrations-title" className="research-section__title">
          The facts behind better hiring decisions.
        </h2>
        <p className="research-section__summary">
          Understand the evidence behind background screening, identity verification, and informed hiring decisions.
        </p>
      </div>

      <div
        className="fanned-deck-wrapper"
        onMouseLeave={() => setHoveredIndex(null)}
        role="region"
        aria-label="Research findings fanned cards"
      >
        <div className="fanned-deck">
          {researchFindings.map((finding, index) => {
            const isHovered = hoveredIndex === index
            const isThemeDark = index % 2 === 1

            // Geometry calculations for resting fan layout:
            // Centered normalized offset (-1.5, -0.5, 0.5, 1.5 for 4 cards)
            const norm = index - (totalCards - 1) / 2
            const restRotate = norm * 4.2
            const restY = Math.abs(norm) * 6
            const restZ = index + 1

            // Dynamic transforms based on hover interaction matching reference video
            let translateX = 0
            let translateY = restY
            let rotate = restRotate
            let scale = 1
            let zIndex = restZ

            if (hoveredIndex !== null) {
              if (isHovered) {
                // Lifted, straightened, elevated foreground
                translateX = 0
                translateY = -42
                rotate = 0
                scale = 1.025
                zIndex = 50
              } else if (index < hoveredIndex) {
                // Left neighbors shift slightly leftward
                translateX = -14
                translateY = restY
                rotate = restRotate
                zIndex = restZ
              } else if (index > hoveredIndex) {
                // Right neighbors shift slightly rightward
                translateX = 14
                translateY = restY
                rotate = restRotate
                zIndex = restZ
              }
            }

            return (
              <a
                key={finding.category}
                id={`fanned-card-${index}`}
                href={finding.href}
                target="_blank"
                rel="noreferrer"
                className={`fanned-card ${isThemeDark ? 'fanned-card--dark' : 'fanned-card--light'} ${
                  isHovered ? 'is-lifted' : ''
                }`}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`,
                  zIndex,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-label={`${finding.category}: ${finding.title}. Metric: ${finding.metric} - ${finding.metricLabel} (opens in a new tab)`}
              >
                <div className="fanned-card__top">
                  <span className="fanned-card__index">{`0${index + 1}`}</span>
                  <span className="fanned-card__category">{finding.category}</span>
                </div>

                <h3 className="fanned-card__title">{finding.title}</h3>

                <div
                  className="fanned-card__metric-box"
                  aria-label={`${finding.metric}: ${finding.metricLabel}`}
                >
                  <strong className="fanned-card__metric-val">{finding.metric}</strong>
                  <span className="fanned-card__metric-label">{finding.metricLabel}</span>
                  {finding.source && (
                    <span className="fanned-card__source">{finding.source}</span>
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
