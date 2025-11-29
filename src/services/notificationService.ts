import { generateEmailTemplate } from "../templates/emailTemplate";

// Brevo API configuration
const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// Contact information
const RECIPIENT_EMAIL = import.meta.env.VITE_RECIPIENT_EMAIL;

// Validate environment variables
if (!BREVO_API_KEY) {
  throw new Error("VITE_BREVO_API_KEY is not defined in environment variables");
}
if (!RECIPIENT_EMAIL) {
  throw new Error(
    "VITE_RECIPIENT_EMAIL is not defined in environment variables"
  );
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmailNotification = async (
  formData: ContactFormData
): Promise<void> => {
  const emailData = {
    sender: {
      name: "Aliya Sayed - Contact Form",
      email: "aliya.sayed.dev@gmail.com",
    },
    replyTo: {
      email: formData.email,
      name: formData.name,
    },
    to: [
      {
        email: RECIPIENT_EMAIL,
        name: "Aliya Sayed",
      },
    ],
    subject: `Contact Form: ${formData.subject}`,
    htmlContent: generateEmailTemplate(formData),
    headers: {
      charset: "utf-8",
    },
  };

  try {
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(emailData),
    });

    const data = await response.json();
    console.log("Email API Response:", data);

    if (!response.ok) {
      throw new Error(
        `Failed to send email: ${data.message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

export const sendNotifications = async (
  formData: ContactFormData
): Promise<void> => {
  try {
    await sendEmailNotification(formData);
  } catch (error) {
    console.error("Error sending notifications:", error);
    throw error;
  }
};
