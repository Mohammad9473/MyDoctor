/**
 * Represents an email message.
 */
export interface Email {
  /**
   * The recipient's email address.
   */
  to: string;
  /**
   * The subject of the email.
   */
  subject: string;
  /**
   * The body of the email, which can contain HTML content.
   */
  body: string;
}

/**
 * Asynchronously sends an email message.
 *
 * @param email The email message to send.
 * @returns A promise that resolves to true if the email was sent successfully, false otherwise.
 */
export async function sendEmail(email: Email): Promise<boolean> {
  // TODO: Implement this by calling an email sending service API.
  // Make sure to handle API keys and other secrets appropriately (e.g., using environment variables).
  // Example:
  // const apiKey = process.env.EMAIL_API_KEY;
  // if (!apiKey) {
  //   console.error('Email API key is not set in environment variables.');
  //   return false;
  // }

  console.log(`Sending email to ${email.to} with subject ${email.subject}`);

  return true;
}
