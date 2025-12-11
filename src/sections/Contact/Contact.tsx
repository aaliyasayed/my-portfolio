import { useState, useEffect } from "react";
import classNames from "classnames";
import { Section } from "../../components/Section";
import { SocialButtons } from "../../components/SocialButtons/SocialButtons";
import { useData } from "../../context/DataContext";
import { Button } from "../../components/Button";
import { sendNotifications } from "../../services/notificationService";
import { useTracking } from "../../hooks/useTracking";
import styles from "./Contact.module.scss";

export const Contact = () => {
  const { trackCtaClick } = useTracking();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState("idle"); // idle, loading, success, error
  const { about, contact } = useData();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = { ...formErrors };

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      valid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
      valid = false;
    } else if (formData.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters";
      valid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
      valid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission attempt
    trackCtaClick("contact-form-submit", "form");

    // Validate the form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setFormStatus("loading");

    try {
      // Send notifications using the service
      await sendNotifications(formData);

      // Success state
      setFormStatus("success");

      // Reset form data
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
    } finally {
      setIsLoading(false);

      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }
  };

  // For animation classes
  useEffect(() => {
    if (formStatus === "success" || formStatus === "error") {
      const messageEl = document.querySelector(`.${styles.messageContainer}`);
      if (messageEl) {
        messageEl.classList.add(styles.fadeIn);
      }
    }
  }, [formStatus]);

  return (
    <Section
      id="contact"
      title={contact.heading}
      subtitle={contact.subheading}
      titleAlign="left"
    >
      <div className={styles.contactContent}>
        <div className={classNames(styles.contactInfo)}>
          <h3>{contact.getInTouchHeading}</h3>
          <p>{contact.getInTouchText}</p>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <img src="/icons/email_black.svg" alt="Email" />
            </div>
            <div>
              <h4>Email</h4>
              <p>{contact.email}</p>
            </div>
          </div>

          {contact.phone && (
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <img src="/icons/phone.svg" alt="Phone" />
              </div>
              <div>
                <h4>Phone</h4>
                <p dangerouslySetInnerHTML={{ __html: contact.phone }} />
              </div>
            </div>
          )}

          {contact.location && (
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <img src="/icons/location.svg" alt="Location" />
              </div>
              <div>
                <h4>Location</h4>
                <p>{contact.location}</p>
              </div>
            </div>
          )}

          <div className={styles.socialLinks}>
            <SocialButtons
              linkedin={about.linkedin}
              github={about.github}
              // codepen={about.codepen}
              whatsappNumber={about.whatsappNumber}
            />
          </div>
        </div>

        <div className={classNames(styles.contactForm)}>
          {formStatus === "success" && (
            <div
              className={classNames(
                styles.messageContainer,
                styles.successMessage
              )}
              role="status"
              aria-live="polite"
            >
              <img src="/icons/success.svg" alt="Success" />
              <h3>{contact.formMessages.success.title}</h3>
              <p>{contact.formMessages.success.text}</p>
            </div>
          )}

          {formStatus === "error" && (
            <div
              className={classNames(
                styles.messageContainer,
                styles.errorMessage
              )}
              role="alert"
              aria-live="assertive"
            >
              <img src="/icons/error.svg" alt="Error" />
              <h3>{contact.formMessages.error.title}</h3>
              <p>{contact.formMessages.error.text}</p>
            </div>
          )}

          {(formStatus === "idle" || formStatus === "loading") && (
            <form
              onSubmit={handleSubmit}
              className={formStatus === "loading" ? styles.disabledForm : ""}
            >
              {formStatus === "loading" && (
                <div className={styles.formOverlay}>
                  <div className={styles.spinnerContainer}>
                    <img
                      src="/icons/spinner.svg"
                      alt="Loading"
                      className={styles.spinner}
                    />
                  </div>
                </div>
              )}

              <div className={classNames(styles.formGroup)}>
                <label htmlFor="name">{contact.formLabels.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={classNames({
                    [styles.inputFilled]: formData.name.length > 0,
                    [styles.inputError]: formErrors.name,
                  })}
                  disabled={isLoading}
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                />
                {formErrors.name && (
                  <div
                    id="name-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {formErrors.name}
                  </div>
                )}
              </div>

              <div className={classNames(styles.formGroup)}>
                <label htmlFor="email">{contact.formLabels.email}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={classNames({
                    [styles.inputFilled]: formData.email.length > 0,
                    [styles.inputError]: formErrors.email,
                  })}
                  disabled={isLoading}
                  aria-invalid={!!formErrors.email}
                  aria-describedby={
                    formErrors.email ? "email-error" : undefined
                  }
                />
                {formErrors.email && (
                  <div
                    id="email-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {formErrors.email}
                  </div>
                )}
              </div>

              <div className={classNames(styles.formGroup)}>
                <label htmlFor="subject">{contact.formLabels.subject}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={classNames({
                    [styles.inputFilled]: formData.subject.length > 0,
                    [styles.inputError]: formErrors.subject,
                  })}
                  disabled={isLoading}
                  aria-invalid={!!formErrors.subject}
                  aria-describedby={
                    formErrors.subject ? "subject-error" : undefined
                  }
                />
                {formErrors.subject && (
                  <div
                    id="subject-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {formErrors.subject}
                  </div>
                )}
              </div>

              <div className={classNames(styles.formGroup)}>
                <label htmlFor="message">{contact.formLabels.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={8}
                  required
                  className={classNames({
                    [styles.inputFilled]: formData.message.length > 0,
                    [styles.inputError]: formErrors.message,
                  })}
                  disabled={isLoading}
                  aria-invalid={!!formErrors.message}
                  aria-describedby={
                    formErrors.message ? "message-error" : undefined
                  }
                ></textarea>
                {formErrors.message && (
                  <div
                    id="message-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {formErrors.message}
                  </div>
                )}
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? contact.formButtons.sending
                  : contact.formButtons.submit}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
};
