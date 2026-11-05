import nodemailer from 'nodemailer'

/**
 * Serverless function for Vercel / Node.js
 * Handles contact enquiry submissions and dispatches them via SMTP
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    const {
      firstName,
      lastName,
      email,
      phone,
      organisation,
      enquiryType,
      message,
    } = body

    // Validation
    if (!firstName || !firstName.trim()) {
      return res.status(400).json({ success: false, error: 'First name is required.' })
    }
    if (!lastName || !lastName.trim()) {
      return res.status(400).json({ success: false, error: 'Last name is required.' })
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, error: 'Email address is required.' })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' })
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Please enter details for your enquiry.' })
    }

    const cleanFirstName = firstName.trim()
    const cleanLastName = lastName.trim()
    const cleanEmail = email.trim()
    const cleanPhone = phone ? phone.trim() : ''
    const cleanOrg = organisation ? organisation.trim() : 'Not specified'
    const cleanType = enquiryType ? enquiryType.trim() : 'General enquiry'
    const cleanMessage = message.trim()

    // SMTP Configuration from environment variables
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT) || 587
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465
    const clientEmail = process.env.CLIENT_EMAIL || process.env.CONTACT_RECEIVER_EMAIL || 'contact@dbs-express.co.uk'
    const smtpFrom = process.env.SMTP_FROM || (smtpUser ? `"DBS-Express Enquiries" <${smtpUser}>` : `"DBS-Express Enquiries" <noreply@dbs-express.co.uk>`)

    const subject = `[DBS-Express Enquiry] ${cleanType} - ${cleanFirstName} ${cleanLastName} (${cleanOrg})`

    const textContent = `
NEW CONTACT ENQUIRY - DBS-EXPRESS
==================================================

Applicant / Contact:  ${cleanFirstName} ${cleanLastName}
Email Address:        ${cleanEmail}
Contact Phone:        ${cleanPhone || 'Not provided'}
Organisation:         ${cleanOrg}
Enquiry Type:         ${cleanType}
Date / Time:          ${new Date().toUTCString()}

ENQUIRY MESSAGE:
--------------------------------------------------
${cleanMessage}

==================================================
Transmitted via DBS-Express SMTP Gateway
Reply directly to this email to contact the applicant.
`

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New DBS-Express Enquiry</title>
  <style>
    body { margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f8f7; color: #1d232a; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #037554; color: #ffffff; padding: 24px 28px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 28px; }
    .grid { display: table; width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .row { display: table-row; }
    .cell-label { display: table-cell; width: 140px; padding: 8px 12px 8px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #5f6672; vertical-align: top; border-bottom: 1px solid #f0f2f0; }
    .cell-value { display: table-cell; padding: 8px 0; font-size: 14px; font-weight: 500; color: #1d232a; vertical-align: top; border-bottom: 1px solid #f0f2f0; }
    .badge { display: inline-block; background: #ccebe0; color: #035a41; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
    .message-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #5f6672; margin: 20px 0 8px; }
    .message-box { background: #f7f8f7; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #1d232a; }
    .footer { background: #f7f8f7; padding: 16px 28px; font-size: 12px; color: #5f6672; border-top: 1px solid #e5e7eb; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Customer Enquiry</h1>
      <p>Submitted via DBS-Express official website contact portal</p>
    </div>
    <div class="content">
      <div class="grid">
        <div class="row">
          <div class="cell-label">Contact Name</div>
          <div class="cell-value"><strong>${cleanFirstName} ${cleanLastName}</strong></div>
        </div>
        <div class="row">
          <div class="cell-label">Email Address</div>
          <div class="cell-value"><a href="mailto:${cleanEmail}" style="color: #037554; text-decoration: none; font-weight: 600;">${cleanEmail}</a></div>
        </div>
        <div class="row">
          <div class="cell-label">Phone Number</div>
          <div class="cell-value">${cleanPhone ? `<a href="tel:${cleanPhone}" style="color: #037554; text-decoration: none;">${cleanPhone}</a>` : '<em style="color:#888;">Not provided</em>'}</div>
        </div>
        <div class="row">
          <div class="cell-label">Organisation</div>
          <div class="cell-value">${cleanOrg}</div>
        </div>
        <div class="row">
          <div class="cell-label">Enquiry Type</div>
          <div class="cell-value"><span class="badge">${cleanType}</span></div>
        </div>
      </div>

      <div class="message-title">Enquiry Details</div>
      <div class="message-box">${cleanMessage}</div>
    </div>
    <div class="footer">
      Timestamp: ${new Date().toUTCString()} · Receiver: ${clientEmail}
    </div>
  </div>
</body>
</html>
`

    // If SMTP credentials exist, send via nodemailer
    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      await transporter.sendMail({
        from: smtpFrom,
        to: clientEmail,
        replyTo: `${cleanFirstName} ${cleanLastName} <${cleanEmail}>`,
        subject,
        text: textContent,
        html: htmlContent,
      })

      return res.status(200).json({
        success: true,
        message: 'Your enquiry has been successfully delivered via SMTP to our client desk.',
      })
    } else {
      // In development or when credentials have not been configured yet in Vercel environment variables
      console.warn('[SMTP Notice] SMTP environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS) not configured. Logging enquiry:')
      console.log(textContent)

      return res.status(200).json({
        success: true,
        devMode: true,
        message: 'Enquiry received. (SMTP credentials are not yet configured in environment variables; logged to server).',
      })
    }
  } catch (error) {
    console.error('[SMTP Error] Failed to send enquiry:', error)
    return res.status(500).json({
      success: false,
      error: error?.message || 'An error occurred while sending your enquiry. Please try again or contact us directly.',
    })
  }
}
