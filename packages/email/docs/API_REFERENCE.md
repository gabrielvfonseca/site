# @gabfon/email API Reference

## Installation

```bash
npm install @gabfon/email
```

## Environment Setup

Configure the Cloudflare Email Sending service:

```env
EMAIL_ACCOUNT_ID=your-cloudflare-account-id
EMAIL_API_TOKEN=your-cloudflare-api-token
EMAIL_FROM=your-email@example.com
```

- `EMAIL_ACCOUNT_ID` — your Cloudflare account ID (Dashboard → My Profile).
- `EMAIL_API_TOKEN` — a Cloudflare API token with the **Email Sending – Send** permission.
- `EMAIL_FROM` — a verified sending address on a domain verified in Cloudflare Email.

All three are required for sending. When any is missing, `sendEmail` rejects with an `EmailSendError` of code `0` instead of crashing at import time.

## Exports

```typescript
// Main
export {
  sendEmail,
  sendTemplateEmail,
  isEmailConfigured,
  EmailSendError,
} from "./index";

// Templates
export { ContactTemplate } from "./templates/contact";

// Environment keys
export { keys } from "./keys";
```

## Client

### sendEmail

Send a single email through the Cloudflare Email Sending REST API (`POST /accounts/{account_id}/email/sending/send`).

```typescript
import { sendEmail } from "@gabfon/email";

const result = await sendEmail({
  to: "delivered@example.com",
  subject: "Hello World",
  text: "Hello World",
  html: "<strong>Hello World</strong>",
});

console.log(result.messageId); // RFC 5322 Message-ID
console.log(result.delivered); // ['delivered@example.com']
```

#### Options (`SendEmailOptions`)

| Field | Type | Description |
| --- | --- | --- |
| `to` | `string \| string[]` | Recipient address(es). **Required.** |
| `from` | `string` | Sender; defaults to `EMAIL_FROM`. |
| `cc` | `string \| string[]` | CC recipients. |
| `bcc` | `string \| string[]` | BCC recipients. |
| `subject` | `string` | Subject line. **Required.** |
| `text` | `string` | Plain-text body. |
| `html` | `string` | HTML body. Wins over `react` when both are given. |
| `replyTo` | `string` | Reply-To address. |
| `headers` | `Record<string,string>` | Custom headers (threading, tracking, …). |
| `react` | `ReactNode` | A React Email template to render as the HTML body. |

#### Return (`SendEmailResult`)

```typescript
interface SendEmailResult {
  messageId: string; // RFC 5322 Message-ID
  delivered: string[]; // recipients delivered
  queued: string[]; // recipients queued
  permanentBounces: string[]; // recipients that hard-bounced
  suppressedRecipients: string[]; // recipients on a suppression list
}
```

### sendTemplateEmail

Convenience wrapper for call sites that pass a React Email template; renders it to HTML and sends with the default From address.

```typescript
import { sendTemplateEmail } from '@gabfon/email';
import { ContactTemplate } from '@gabfon/email/templates/contact';

await sendTemplateEmail({
  to: 'admin@example.com',
  subject: 'New Contact Form Submission',
  react: <ContactTemplate data={{ name: 'John', email: 'john@example.com', message: 'Hi!' }} />,
});
```

### isEmailConfigured

```typescript
import { isEmailConfigured } from "@gabfon/email";

if (isEmailConfigured()) {
  // EMAIL_ACCOUNT_ID, EMAIL_API_TOKEN, and EMAIL_FROM are all present.
}
```

### EmailSendError

Thrown when the Cloudflare Email Sending API rejects a send, or when the service is not configured.

```typescript
import { EmailSendError } from "@gabfon/email";

try {
  await sendEmail({ to: "a@b.com", subject: "x" });
} catch (error) {
  if (error instanceof EmailSendError) {
    console.error(error.status); // HTTP status code (0 when unconfigured)
    console.error(error.codes); // machine-readable API error codes
    console.error(error.message);
  }
}
```

## Templates

### ContactTemplate

Template for contact form submissions.

```typescript
interface ContactTemplateProps {
  data: {
    name: string;
    email: string;
    message: string;
    phone?: string;
    company?: string;
  };
}
```

#### Usage

```typescript
import { sendEmail } from '@gabfon/email';
import { ContactTemplate } from '@gabfon/email/templates/contact';

await sendEmail({
  to: 'admin@yourdomain.com',
  subject: 'New Contact Form Submission',
  react: <ContactTemplate data={{ name: 'John', email: 'john@example.com', message: 'Hi' }} />,
});
```

The template is rendered to HTML by `@react-email/render` at send time.

## Creating Custom Templates

```typescript
import { Html, Head, Preview, Body, Container, Section, Text } from '@react-email/components';

interface CustomTemplateProps {
  data: {
    recipient: string;
    subject: string;
    content: string;
  };
}

export function CustomTemplate({ data }: CustomTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>{data.subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text>{data.content}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
};
```

### Template Best Practices

- **Responsive design** — design mobile-first and keep layouts narrow (~600px).
- **Inline styles** — email clients strip `<style>` blocks; rely on inline CSS.
- **Brand consistency** — reuse a shared palette and typography across templates.
- **Accessibility** — sufficient contrast and a plain-text alternative.

## Environment Validation

```typescript
import { keys } from "@gabfon/email/keys";

// Validates environment variables and returns a typed object.
const env = keys();
console.log(env.EMAIL_FROM);
```

Validation rules:

- `EMAIL_FROM`: must be a valid email address.
- `EMAIL_API_TOKEN`: must be a non-empty string.
- All variables are server-side only.

## Usage Examples

### Basic Email Sending

```typescript
import { sendEmail } from "@gabfon/email";

export async function sendBasicEmail() {
  const result = await sendEmail({
    to: "user@example.com",
    subject: "Welcome to our service",
    html: "<h1>Welcome!</h1><p>Thank you for signing up.</p>",
  });
  return result.messageId;
}
```

### Server Action Integration

```typescript
"use server";

import { sendEmail } from "@gabfon/email";

import { contactSchema } from "@/types/contact";

export async function sendContactEmail(formData: unknown) {
  const validatedData = contactSchema.parse(formData);

  await sendEmail({
    to: "admin@yourdomain.com",
    subject: `New message from ${validatedData.name}`,
    text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
    replyTo: validatedData.email,
  });
}
```

### Bulk Email Sending

```typescript
import { sendEmail } from "@gabfon/email";

export async function sendBulkEmails(
  recipients: string[],
  subject: string,
  text: string
) {
  const results = await Promise.allSettled(
    recipients.map((recipient) => sendEmail({ to: recipient, subject, text }))
  );

  return results.map((result, index) => ({
    recipient: recipients[index],
    success: result.status === "fulfilled",
    messageId: result.status === "fulfilled" ? result.value.messageId : null,
    error: result.status === "rejected" ? result.reason : null,
  }));
}
```

## Error Handling

### Environment / configuration

```typescript
import { sendEmail, EmailSendError } from "@gabfon/email";

try {
  await sendEmail({ to: "a@b.com", subject: "x" });
} catch (error) {
  if (error instanceof EmailSendError && error.status === 0) {
    // Not configured (missing EMAIL_* vars) — degrade gracefully.
  }
  throw error;
}
```

### API errors

`EmailSendError.status` is the HTTP status code and `EmailSendError.codes` carries the Cloudflare API error codes.

```typescript
import { sendEmail, EmailSendError } from "@gabfon/email";

try {
  await sendEmail({ to: "a@b.com", subject: "x" });
} catch (error) {
  if (error instanceof EmailSendError) {
    // e.g. 400 with a validation code, 429 when rate-limited.
    throw new Error(`Email sending failed (${error.status}): ${error.message}`);
  }
  throw error;
}
```

## Best Practices

1. **Environment management** — keep `EMAIL_API_TOKEN` server-only; validate at startup; use per-environment values.
2. **Template design** — mobile-first, inline CSS, plain-text alternatives.
3. **Error handling** — catch `EmailSendError`, log codes, and fail soft where the send is best-effort.
4. **Deliverability** — verify your sending domain in Cloudflare Email (SPF/DKIM/DMARC) before relying on sends.
5. **Performance** — batch with `Promise.allSettled` for bulk sends; respect the API rate limits.

## Integration with Other Packages

### Security Integration (rate limiting)

```typescript
import { sendEmail } from "@gabfon/email";
import { rateLimit } from "@gabfon/rate-limit";

export async function sendRateLimitedEmail(
  to: string,
  subject: string,
  text: string
) {
  const { success } = await rateLimit.limit({
    key: `email:${to}`,
    requests: 10,
    window: "1h",
  });

  if (!success) {
    throw new Error("Rate limit exceeded for email sending");
  }

  return sendEmail({ to, subject, text });
}
```

## Testing

### Template Testing

```typescript
import { render } from '@react-email/render';
import { ContactTemplate } from '@gabfon/email/templates/contact';

test('renders contact template correctly', () => {
  const data = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, this is a test message.',
  };

  const html = render(<ContactTemplate data={data} />);

  expect(html).toContain('John Doe');
  expect(html).toContain('john@example.com');
  expect(html).toContain('Hello, this is a test message.');
});
```

### Email Sending Testing

`sendEmail` uses `fetch`, so stub it in tests:

```typescript
import { sendEmail } from "@gabfon/email";

globalThis.fetch = (async () =>
  Response.json({
    success: true,
    result: {
      message_id: "<test@example.com>",
      delivered: ["recipient@example.com"],
      queued: [],
      permanent_bounces: [],
      suppressed_recipients: [],
    },
  })) as unknown as typeof fetch;

test("sends email successfully", async () => {
  const result = await sendEmail({
    to: "recipient@example.com",
    subject: "Test",
    text: "Test",
  });

  expect(result.messageId).toBe("<test@example.com>");
});
```
