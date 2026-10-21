/**
 * Contact form validation and delivery, shared by the no-JavaScript POST to /contact/
 * and the JSON endpoint /api/contact. Delivery goes to Resend or a webhook, depending
 * on which environment variables are set. With neither configured, submissions are
 * reported as not sent; nothing pretends to succeed.
 */

export const TOPICS = [
  { value: 'energy-audits', label: 'Energy audits & assessments' },
  { value: 'energy-modeling', label: 'Energy modeling & analysis' },
  { value: 'design-build', label: 'Integrated design/build' },
  { value: 'monitoring-verification', label: 'Monitoring & verification (Eco-1)' },
  { value: 'funding-incentives', label: 'Funding & incentive support' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export const BUILDING_TYPES = [
  'Hospital or healthcare',
  'K-12 school',
  'College or university',
  'Commercial office or retail',
  'Industrial or manufacturing',
  'Federal or public facility',
  'Other',
] as const;

export interface ContactValues {
  name: string;
  email: string;
  organization: string;
  improve: string;
  topic: string;
  buildingType: string;
  phone: string;
  location: string;
}

export type ContactField = keyof ContactValues;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const FIELD_LABELS: Record<ContactField, string> = {
  name: 'Name',
  email: 'Email',
  organization: 'Organization',
  improve: 'What would you like to improve?',
  topic: 'Area of interest',
  buildingType: 'Building type',
  phone: 'Phone',
  location: 'Location',
};

const LIMITS: Record<ContactField, number> = {
  name: 100,
  email: 254,
  organization: 150,
  improve: 2000,
  topic: 40,
  buildingType: 60,
  phone: 40,
  location: 120,
};

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

const str = (v: unknown) => (typeof v === 'string' ? v.replace(/\u0000/g, '').trim() : '');

export function emptyValues(): ContactValues {
  return { name: '', email: '', organization: '', improve: '', topic: '', buildingType: '', phone: '', location: '' };
}

export function readValues(source: Record<string, unknown>): ContactValues {
  const v = emptyValues();
  for (const key of Object.keys(v) as ContactField[]) v[key] = str(source[key]).slice(0, LIMITS[key] + 1);
  return v;
}

export function validate(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  if (!v.name) e.name = 'Enter your name.';
  else if (v.name.length > LIMITS.name) e.name = `Keep your name under ${LIMITS.name} characters.`;

  if (!v.email) e.email = 'Enter your email address.';
  else if (v.email.length > LIMITS.email || !EMAIL_RE.test(v.email)) e.email = 'Enter an email address in the format name@example.com.';

  if (!v.organization) e.organization = 'Enter your organization’s name.';
  else if (v.organization.length > LIMITS.organization) e.organization = `Keep this under ${LIMITS.organization} characters.`;

  if (!v.improve) e.improve = 'Tell us briefly what you would like to improve.';
  else if (v.improve.length < 10) e.improve = 'Add a little more detail (at least 10 characters).';
  else if (v.improve.length > LIMITS.improve) e.improve = `Keep this under ${LIMITS.improve} characters.`;
  else if (/\d[\d\s-]{8,}\d/.test(v.improve.replace(/\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/g, ''))) {
    e.improve = 'This looks like it may contain an account or reference number. Please remove it; we’ll arrange a secure way to share details later.';
  }

  if (v.topic && !TOPICS.some((t) => t.value === v.topic)) e.topic = 'Choose an option from the list.';
  if (v.buildingType && !(BUILDING_TYPES as readonly string[]).includes(v.buildingType)) e.buildingType = 'Choose an option from the list.';
  if (v.phone && (v.phone.length > LIMITS.phone || !/^[0-9+().\s-]{7,}$/.test(v.phone))) e.phone = 'Enter a phone number using digits, spaces, dashes or parentheses.';
  if (v.location.length > LIMITS.location) e.location = `Keep this under ${LIMITS.location} characters.`;
  return e;
}

/** Honeypot and timing checks. Returns true when the submission looks automated. */
export function looksAutomated(source: Record<string, unknown>, now = Date.now()): boolean {
  if (str(source.website)) return true; // hidden field humans never see
  const started = Number(str(source.startedAt));
  if (!Number.isFinite(started) || started <= 0) return true;
  const elapsed = now - started;
  return elapsed < 2500 || elapsed > 1000 * 60 * 60 * 24;
}

export type DeliveryResult = { ok: true } | { ok: false; reason: 'unconfigured' | 'failed' };

export function deliveryConfigured(env: NodeJS.ProcessEnv = process.env): 'resend' | 'webhook' | null {
  if (env.RESEND_API_KEY && env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL) return 'resend';
  if (env.CONTACT_WEBHOOK_URL) return 'webhook';
  return null;
}

function formatText(v: ContactValues): string {
  const topic = TOPICS.find((t) => t.value === v.topic)?.label ?? '';
  return (Object.keys(FIELD_LABELS) as ContactField[])
    .map((k) => `${FIELD_LABELS[k]}: ${k === 'topic' ? topic : v[k] || '—'}`)
    .join('\n');
}

export async function deliver(v: ContactValues, env: NodeJS.ProcessEnv = process.env): Promise<DeliveryResult> {
  const mode = deliveryConfigured(env);
  if (!mode) return { ok: false, reason: 'unconfigured' };
  try {
    let res: Response;
    if (mode === 'resend') {
      res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.CONTACT_FROM_EMAIL,
          to: env.CONTACT_TO_EMAIL!.split(',').map((s) => s.trim()),
          reply_to: v.email,
          subject: `Website inquiry: ${v.organization}`.slice(0, 150),
          text: formatText(v),
        }),
        signal: AbortSignal.timeout(10_000),
      });
    } else {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (env.CONTACT_WEBHOOK_SECRET) headers['X-Webhook-Secret'] = env.CONTACT_WEBHOOK_SECRET;
      res = await fetch(env.CONTACT_WEBHOOK_URL!, {
        method: 'POST',
        headers,
        body: JSON.stringify({ type: 'website_inquiry', submittedAt: new Date().toISOString(), ...v }),
        signal: AbortSignal.timeout(10_000),
      });
    }
    if (!res.ok) {
      console.error(`[contact] delivery via ${mode} failed with status ${res.status}`);
      return { ok: false, reason: 'failed' };
    }
    return { ok: true };
  } catch (err) {
    console.error(`[contact] delivery via ${mode} threw`, err instanceof Error ? err.message : err);
    return { ok: false, reason: 'failed' };
  }
}

export type SubmitOutcome =
  | { status: 'sent' }
  | { status: 'invalid'; errors: ContactErrors }
  | { status: 'unconfigured' | 'failed' | 'rejected' | 'rate_limited'; retryAfterSeconds?: number };

export async function handleSubmission(source: Record<string, unknown>, rateOk: boolean): Promise<{ values: ContactValues; outcome: SubmitOutcome }> {
  const values = readValues(source);
  if (!rateOk) return { values, outcome: { status: 'rate_limited' } };
  const errors = validate(values);
  if (Object.keys(errors).length) return { values, outcome: { status: 'invalid', errors } };
  if (looksAutomated(source)) return { values, outcome: { status: 'rejected' } };
  const result = await deliver(values);
  return { values, outcome: result.ok ? { status: 'sent' } : { status: result.reason } };
}
