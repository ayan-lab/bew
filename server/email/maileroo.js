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
  const fromAddress = process.env.FROM_EMAIL?.trim();

  if (!apiKey) throw new Error("SENDING_KEY is not configured");
  if (!templateId) throw new Error("TEMPLATE_ID is not configured");
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
