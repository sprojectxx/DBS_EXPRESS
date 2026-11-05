import { useState, type FormEvent } from 'react'

export interface EnquiryFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  organisation: string
  enquiryType: string
  message: string
}

const initialFormData: EnquiryFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organisation: '',
  enquiryType: 'Employer organisation registration',
  message: '',
}

export function ContactEnquiryForm() {
  const [formData, setFormData] = useState<EnquiryFormData>(initialFormData)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [successInfo, setSuccessInfo] = useState<{ email: string; name: string } | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!formData.firstName.trim()) {
      setErrorMessage('Please enter your first name.')
      return
    }
    if (!formData.lastName.trim()) {
      setErrorMessage('Please enter your last name.')
      return
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.')
      return
    }
    if (!formData.organisation.trim()) {
      setErrorMessage('Please enter your organisation name (or "Individual" if applying personally).')
      return
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter the details of your enquiry.')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Unable to submit enquiry. Please try again.')
      }

      setSuccessInfo({
        email: formData.email.trim(),
        name: formData.firstName.trim(),
      })
      setStatus('success')
      setFormData(initialFormData)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to transmit enquiry via SMTP server.'
      setErrorMessage(msg)
      setStatus('error')
    }
  }

  if (status === 'success' && successInfo) {
    return (
      <section className="enquiry-card enquiry-card--success" aria-live="polite">
        <div className="enquiry-success__icon" aria-hidden="true">✓</div>
        <h2>Enquiry sent successfully</h2>
        <p>
          Thank you, <strong>{successInfo.name}</strong>. Your enquiry has been dispatched directly
          to our client desk at <strong>contact@dbs-express.co.uk</strong>.
        </p>
        <p className="enquiry-success__sub">
          Our compliance and support advisors review enquiries during business hours (9am–5pm, Mon–Fri)
          and will reply to <strong>{successInfo.email}</strong> within 24 hours.
        </p>
        <button
          type="button"
          className="button button-secondary enquiry-success__btn"
          onClick={() => {
            setStatus('idle')
            setSuccessInfo(null)
          }}
        >
          Submit another enquiry
        </button>
      </section>
    )
  }

  return (
    <section className="enquiry-card" aria-labelledby="enquiry-form-title">
      <div className="enquiry-card__header">
        <h2 id="enquiry-form-title">Send an enquiry</h2>
        <p>
          Fill in your details below. Your submission will be routed directly to our compliance
          screening desk via encrypted SMTP mail.
        </p>
      </div>

      {errorMessage && (
        <div className="enquiry-alert enquiry-alert--error" role="alert">
          <span className="enquiry-alert__icon" aria-hidden="true">!</span>
          <div className="enquiry-alert__content">
            <strong>Submission issue:</strong> {errorMessage}
            <div className="enquiry-alert__help">
              You can also email us directly at{' '}
              <a href="mailto:contact@dbs-express.co.uk">contact@dbs-express.co.uk</a>.
            </div>
          </div>
        </div>
      )}

      <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
        <div className="enquiry-form__row enquiry-form__row--two-col">
          <div className="enquiry-field">
            <label htmlFor="firstName">
              First name <span className="enquiry-field__req" aria-hidden="true">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="e.g. Sarah"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>

          <div className="enquiry-field">
            <label htmlFor="lastName">
              Last name <span className="enquiry-field__req" aria-hidden="true">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="e.g. Whitfield"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        <div className="enquiry-form__row enquiry-form__row--two-col">
          <div className="enquiry-field">
            <label htmlFor="email">
              Email address <span className="enquiry-field__req" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="e.g. sarah@organisation.co.uk"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>

          <div className="enquiry-field">
            <label htmlFor="phone">
              Phone number <span className="enquiry-field__opt">(Optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="e.g. 01254 432655"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        <div className="enquiry-form__row enquiry-form__row--two-col">
          <div className="enquiry-field">
            <label htmlFor="organisation">
              Organisation <span className="enquiry-field__req" aria-hidden="true">*</span>
            </label>
            <input
              id="organisation"
              name="organisation"
              type="text"
              autoComplete="organization"
              placeholder="e.g. Northgate Care Group or Individual"
              value={formData.organisation}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>

          <div className="enquiry-field">
            <label htmlFor="enquiryType">
              Enquiry type <span className="enquiry-field__req" aria-hidden="true">*</span>
            </label>
            <select
              id="enquiryType"
              name="enquiryType"
              value={formData.enquiryType}
              onChange={handleChange}
              disabled={status === 'submitting'}
              required
            >
              <option value="Employer organisation registration">Register my organisation / Employer account</option>
              <option value="Individual Basic DBS check">Apply for my own check / Individual Basic DBS</option>
              <option value="Turnaround times & tracking">Check turnaround time & tracking update</option>
              <option value="Eligibility & compliance advice">Eligibility advice (Basic, Standard, Enhanced)</option>
              <option value="Volume pricing enquiry">Volume pricing & tier discounts</option>
              <option value="Billing & invoice query">Billing, invoices & payment splitting</option>
              <option value="General support">General support enquiry</option>
            </select>
          </div>
        </div>

        <div className="enquiry-form__row">
          <div className="enquiry-field">
            <label htmlFor="message">
              Enquiry details <span className="enquiry-field__req" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Please provide details of your enquiry, candidate requirements, or organisation questions..."
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        <div className="enquiry-form__footer">
          <p className="enquiry-form__security-note">
            <span aria-hidden="true">🔒</span> Sent securely to{' '}
            <strong>contact@dbs-express.co.uk</strong> via SMTP mail transport.
          </p>
          <button
            type="submit"
            className="button button-primary enquiry-form__submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <>
                <span className="enquiry-spinner" aria-hidden="true" />
                Sending enquiry...
              </>
            ) : (
              <>
                Send enquiry <span aria-hidden="true">↗</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}

