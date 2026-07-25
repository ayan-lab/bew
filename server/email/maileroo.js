import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { MailerooClient } = require("maileroo");

const ENQUIRY_TO_EMAIL = "baidyaengineering@gmail.com";
const ENQUIRY_TO_NAME = "Baidya Engineering Works";
const FROM_NAME = "Baidya Engineering Works";
const SERVICE_PREFIX = /^\[Service:\s*(.+?)\]\s*\n*/i;

/**
 * @param {{ name: string, email: string, message: string, serviceType?: string | null }} enquiry
 */
function parseEnquiry(enquiry) {
  const name = enquiry.name?.trim() || "Unknown";
  const email = enquiry.email?.trim() || "Unknown";
  let serviceType = enquiry.serviceType?.trim() || "";
  let message = enquiry.message?.trim() || "";

  if (!serviceType) {
    const match = message.match(SERVICE_PREFIX);
    if (match) {
      serviceType = match[1].trim();
      message = message.replace(SERVICE_PREFIX, "").trim();
    }
  }

  return {
    name,
    email,
    serviceType: serviceType || "Not specified",
    message: message || "(No message)",
  };
}

/**
 * Send contact enquiry via Maileroo template.
 * Template vars: name, email, message, serviceType.
 *
 * @param {{ name: string, email: string, message: string, serviceType?: string | null }} enquiry
 */
export async function sendEnquiryEmail(enquiry) {
  const apiKey = process.env.SENDING_KEY;
  const templateId = process.env.TEMPLATE_ID;
  const fromAddress = requireFromAddress();

  if (!apiKey) throw new Error("SENDING_KEY is not configured");
  if (!templateId) throw new Error("TEMPLATE_ID is not configured");

  const { name, email, serviceType, message } = parseEnquiry(enquiry);
  const client = MailerooClient.getClient(apiKey);

  return client
    .setFrom(FROM_NAME, fromAddress)
    .setTo(ENQUIRY_TO_NAME, ENQUIRY_TO_EMAIL)
    .setReplyTo(name, email)
    .setSubject(`New enquiry from ${name} — ${serviceType}`)
    .setTemplateId(String(templateId))
    .setTemplateData({
      name,
      email,
      message,
      serviceType,
    })
    .sendTemplateEmail();
}

function requireFromAddress() {
  const fromAddress = process.env.FROM_EMAIL?.trim();
  if (!fromAddress) {
    throw new Error(
      "FROM_EMAIL is missing. Set it in server/.env to an address on your Maileroo-authorized domain " +
        "(e.g. noreply@yourdomain.com). SMTP_USERNAME (@a.maileroo.net) cannot be used as From.",
    );
  }
  if (fromAddress.endsWith("@a.maileroo.net")) {
    throw new Error(
      "FROM_EMAIL cannot be @a.maileroo.net. Use an address on a domain listed under " +
        "Maileroo → Applications → Authorized Domains (or Domains → Sending Keys).",
    );
  }
  return fromAddress;
}

function ratingStars(rating) {
  const n = Math.min(5, Math.max(0, Number(rating) || 0));
  return `${"★".repeat(n)}${"☆".repeat(5 - n)}`;
}

/**
 * Send review-request notification via Maileroo template.
 * Template vars: projectTitle, firstName, lastName, fullName, rating, ratingStars, message, approveUrl, declineUrl.
 *
 * @param {{
 *   projectTitle: string,
 *   firstName: string,
 *   lastName: string,
 *   rating: number,
 *   message: string,
 *   approveUrl: string,
 *   declineUrl: string,
 * }} review
 */
export async function sendReviewRequestEmail(review) {
  const apiKey = process.env.SENDING_KEY;
  const templateId = process.env.REVIEW_TEMPLATE_ID;
  const fromAddress = requireFromAddress();

  if (!apiKey) throw new Error("SENDING_KEY is not configured");
  if (!templateId) throw new Error("REVIEW_TEMPLATE_ID is not configured");

  const firstName = review.firstName?.trim() || "Unknown";
  const lastName = review.lastName?.trim() || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const rating = Number(review.rating) || 0;

  const client = MailerooClient.getClient(apiKey);

  return client
    .setFrom(FROM_NAME, fromAddress)
    .setTo(ENQUIRY_TO_NAME, ENQUIRY_TO_EMAIL)
    .setSubject(`New review request — ${review.projectTitle || "Project"}`)
    .setTemplateId(String(templateId))
    .setTemplateData({
      projectTitle: review.projectTitle?.trim() || "Untitled project",
      firstName,
      lastName,
      fullName,
      rating: String(rating),
      ratingStars: ratingStars(rating),
      message: review.message?.trim() || "(No message)",
      approveUrl: review.approveUrl,
      declineUrl: review.declineUrl,
    })
    .sendTemplateEmail();
}
