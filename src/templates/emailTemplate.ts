interface EmailTemplateData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const generateEmailTemplate = (data: EmailTemplateData): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
      </head>
      <body style="
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #1a1a1a;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f5f5f5;
      ">
        <div style="
          background-color: #ffffff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        ">
          <!-- Header with Logo -->
          <div style="
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eaeaea;
          ">
            <h1 style="
              color: #111827;
              font-size: 28px;
              font-weight: 600;
              margin: 0;
              letter-spacing: -0.5px;
            ">New Contact Form Submission</h1>
            <p style="
              color: #6b7280;
              margin: 8px 0 0;
              font-size: 16px;
            ">You have received a new message from your website</p>
          </div>
          
          <!-- Contact Details -->
          <div style="
            background-color: #f9fafb;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 24px;
          ">
            <h2 style="
              color: #111827;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 16px;
              letter-spacing: -0.3px;
            ">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #4b5563; font-weight: 500;">Name:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #111827;">
                  ${data.name}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <strong style="color: #4b5563; font-weight: 500;">Email:</strong>
                </td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                  <a href="mailto:${data.email}" style="
                    color: #2563eb;
                    text-decoration: none;
                    font-weight: 500;
                  ">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0;">
                  <strong style="color: #4b5563; font-weight: 500;">Subject:</strong>
                </td>
                <td style="padding: 12px 0; color: #111827;">
                  ${data.subject}
                </td>
              </tr>
            </table>
          </div>

          <!-- Message -->
          <div style="margin-bottom: 24px;">
            <h2 style="
              color: #111827;
              font-size: 18px;
              font-weight: 600;
              margin: 0 0 16px;
              letter-spacing: -0.3px;
            ">Message</h2>
            <div style="
              background-color: #f9fafb;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #2563eb;
              color: #374151;
              font-size: 15px;
              line-height: 1.7;
            ">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <!-- Footer -->
          <div style="
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #eaeaea;
            text-align: center;
          ">
            <p style="
              color: #6b7280;
              font-size: 14px;
              margin: 0 0 8px;
            ">This email was sent from your website's contact form</p>
            <p style="
              color: #6b7280;
              font-size: 14px;
              margin: 0;
            ">You can reply directly to this email to respond to ${data.name}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}; 