const prototypes = [
  {
    route: '/prototype-a',
    label: 'Prototype A',
    title: 'Clean & Trustworthy',
    description:
      'A spacious, straightforward direction with clear service information and a calm visual hierarchy.',
    className: 'preview-a',
  },
  {
    route: '/prototype-b',
    label: 'Prototype B',
    title: 'Bold & Conversion-Focused',
    description:
      'A more assertive composition that makes the next step prominent while keeping the page light.',
    className: 'preview-b',
  },
  {
    route: '/prototype-c',
    label: 'Prototype C',
    title: 'Editorial & Sophisticated',
    description:
      'An asymmetric, typography-led arrangement with a refined reading order.',
    className: 'preview-c',
  },
]

export function PrototypePicker() {
  return (
    <main className="picker-page">
      <header className="picker-header">
        <a className="brand" href="/" aria-label="DBS-Express home">
          <img
            src="/assets/dbs-express-logo.jpg"
            alt="DBS-Express"
            width="320"
            height="64"
          />
        </a>
        <span className="picker-kicker">Design review · 2026</span>
      </header>
      <section className="picker-hero" aria-labelledby="picker-title">
        <p className="eyebrow"><span /> THREE DESIGN DIRECTIONS</p>
        <h1 id="picker-title">
          Meet the next
          <br />
          <span>DBS-Express.</span>
        </h1>
        <p>
          Compare three visual approaches for the DBS-Express website. Each preview presents
          the same check types in a different design direction.
        </p>
      </section>
      <section className="prototype-grid" aria-label="Choose a website prototype">
        {prototypes.map((prototype, index) => (
          <article className="prototype-card" key={prototype.route}>
            <a
              className={`prototype-preview ${prototype.className}`}
              href={prototype.route}
              aria-label={`Open ${prototype.label}: ${prototype.title}`}
            >
              <div className="mini-topbar">
                <span />
                <i />
                <i />
                <i />
                <b />
              </div>
              {index === 0 && (
                <div className="mini-editorial">
                  <span>DBS CHECKS</span>
                  <strong>Basic, Standard and Enhanced DBS checks.</strong>
                  <i />
                  <b>BASIC · STANDARD · ENHANCED</b>
                  <em />
                </div>
              )}
              {index === 1 && (
                <div className="mini-product">
                  <div>
                    <span>DBS CHECKS</span>
                    <strong>Basic, Standard and Enhanced DBS checks.</strong>
                    <i />
                    <b>GET STARTED ↗</b>
                  </div>
                  <em><span /><span /></em>
                </div>
              )}
              {index === 2 && (
                <div className="mini-focused">
                  <span>DBS-EXPRESS</span>
                  <strong>Basic, Standard and Enhanced DBS checks.</strong>
                  <i>01&nbsp;&nbsp; Basic DBS check</i>
                  <i>02&nbsp;&nbsp; Standard DBS check</i>
                  <i>03&nbsp;&nbsp; Enhanced DBS check</i>
                </div>
              )}
            </a>
            <div className="prototype-card-copy">
              <div>
                <span className="prototype-label">{prototype.label}</span>
                <h2>{prototype.title}</h2>
                <p>{prototype.description}</p>
              </div>
              <a
                className="prototype-open"
                href={prototype.route}
                aria-label={`View ${prototype.title}`}
              >
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </section>
      <section className="picker-experiment" aria-labelledby="experiment-title">
        <div className="picker-experiment__copy">
          <span className="prototype-label">Prototype A · Experiment</span>
          <h2 id="experiment-title">Animation variant</h2>
          <p>
            Prototype A with a fan-stack card animation in the hero and scroll-reveal on
            section headings. Compare with the original Clean &amp; Trustworthy direction.
          </p>
        </div>
        <a
          className="picker-experiment__link"
          href="/prototype-a-animated"
          aria-label="View animated variant of Prototype A"
        >
          View experiment <span aria-hidden="true">↗</span>
        </a>
      </section>
      <footer className="picker-footer">
        <span>DBS-Express</span>
        <span>Basic, Standard and Enhanced DBS checks.</span>
      </footer>
    </main>
  )
}
