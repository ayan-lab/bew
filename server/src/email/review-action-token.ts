import { createHmac, timingSafeEqual } from "node:crypto";

export type ReviewAction = "approve" | "decline";

function getSecret(): string {
  const secret = process.env.REVIEW_ACTION_SECRET?.trim();
  if (!secret) {
    throw new Error("REVIEW_ACTION_SECRET is not configured");
  }
  return secret;
}

export function signReviewActionToken(uuid: string, action: ReviewAction): string {
  return createHmac("sha256", getSecret())
    .update(`${uuid}:${action}`)
    .digest("hex");
}

export function verifyReviewActionToken(
  uuid: string,
  action: ReviewAction,
  token: string | undefined,
): boolean {
  if (!token || !/^[0-9a-f]{64}$/i.test(token)) {
    return false;
  }
  const expected = signReviewActionToken(uuid, action);
  try {
    return timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(token, "hex"));
  } catch {
    return false;
  }
}

export function getApiPublicUrl(): string {
  const url = process.env.API_PUBLIC_URL?.trim() || `http://localhost:${process.env.PORT || "5000"}`;
  return url.replace(/\/$/, "");
}

export function buildReviewActionUrl(uuid: string, action: ReviewAction): string {
  const token = signReviewActionToken(uuid, action);
  return `${getApiPublicUrl()}/api/reviews/requests/${uuid}/${action}?token=${token}`;
}
