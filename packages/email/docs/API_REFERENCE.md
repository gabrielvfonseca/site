# @gabfon/email API Reference

## Installation

```bash
npm install @gabfon/email
```

## Environment Setup

Create environment variables for Resend email service:

```env
RESEND_FROM=your-email@example.com
RESEND_TOKEN=re_your_resend_api_token
```

## Exports

### Main Client
```typescript
export { resend } from './index';
```

### Templates
```typescript
export { ContactTemplate } from './templates/contact';
```

### Environment Keys
```typescript
export { keys } from './keys';
```

## Client

### resend

Pre-configured Resend client for sending emails.

#### Usage

```typescript
import { resend } from '@gabfon/email';

async function sendEmail() {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'delivered@resend.dev',
    subject: 'Hello World',
    html: '<strong>Hello World</strong>',
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
}
```

#### Available Methods

```typescript
// Send email
resend.emails.send(options: EmailSendOptions)

// Get email
resend.emails.get(emailId: string)

// List emails
resend.emails.list(options?: EmailListOptions)

// Update email
resend.emails.update(emailId: string, options: EmailUpdateOptions)

// Cancel email
resend.emails.cancel(emailId: string)
```

## Templates

### ContactTemplate

Template for contact form submissions.

#### Props

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
import { ContactTemplate } from '@gabfon/email/templates';
import { render } from '@react-email/render';

async function sendContactEmail(formData: ContactData) {
  const html = render(<ContactTemplate data={formData} />);
  
  const { data, error } = await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: 'admin@yourdomain.com',
    subject: 'New Contact Form Submission',
    html,
  });

  return { data, error };
}
```

#### Template Structure

The ContactTemplate includes:
- Professional email layout
- Contact information display
- Responsive design
- Brand-friendly styling

## Creating Custom Templates

### Template Structure

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

// Styles
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

#### 1. Responsive Design
```typescript
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
};

const section = {
  padding: '20px 0',
};

const text = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#333333',
};
```

#### 2. Brand Consistency
```typescript
const brandColors = {
  primary: '#007bff',
  secondary: '#6c757d',
  accent: '#28a745',
};

const button = {
  backgroundColor: brandColors.primary,
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '4px',
  textDecoration: 'none',
};
```

#### 3. Accessibility
```typescript
const accessibleText = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#000000',
  backgroundColor: '#ffffff',
};
```

## Environment Variables

### Required Variables

| Variable | Description | Type | Required |
|----------|-------------|------|----------|
| `RESEND_FROM` | Default from email address | email | Yes |
| `RESEND_TOKEN` | Resend API token | string | Yes |

### Environment Validation

```typescript
import { keys } from '@gabfon/email';

// Validates environment variables and returns typed object
const env = keys();
console.log(env.RESEND_FROM);
console.log(env.RESEND_TOKEN);
```

### Validation Rules

- `RESEND_FROM`: Must be valid email format
- `RESEND_TOKEN`: Must start with 're_' prefix
- All variables are server-side only

## Usage Examples

### Basic Email Sending

```typescript
import { resend } from '@gabfon/email';

export async function sendBasicEmail() {
  const { data, error } = await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: 'user@example.com',
    subject: 'Welcome to our service',
    html: '<h1>Welcome!</h1><p>Thank you for signing up.</p>',
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
```

### Template-Based Email

```typescript
import { resend } from '@gabfon/email';
import { ContactTemplate } from '@gabfon/email/templates';
import { render } from '@react-email/render';

export async function sendContactEmail(formData: ContactData) {
  const html = render(<ContactTemplate data={formData} />);
  
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM,
    to: 'admin@yourdomain.com',
    subject: 'New Contact Form Submission',
    html,
  });

  return { data, error };
}
```

### API Route Integration

```typescript
// app/api/contact/route.ts
import { resend } from '@gabfon/email';
import { ContactTemplate } from '@gabfon/email/templates';
import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    const html = render(<ContactTemplate data={formData} />);
    
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: 'admin@yourdomain.com',
      subject: 'New Contact Form Submission',
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Server Action Integration

```typescript
// actions/contact.ts
'use server';

import { resend } from '@gabfon/email';
import { ContactTemplate } from '@gabfon/email/templates';
import { render } from '@react-email/render';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendContactEmail(formData: unknown) {
  try {
    const validatedData = contactSchema.parse(formData);
    
    const html = render(<ContactTemplate data={validatedData} />);
    
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: 'admin@yourdomain.com',
      subject: 'New Contact Form Submission',
      html,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Validation failed' };
  }
}
```

### Bulk Email Sending

```typescript
import { resend } from '@gabfon/email';

export async function sendBulkEmails(recipients: string[], subject: string, html: string) {
  const promises = recipients.map(recipient =>
    resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: recipient,
      subject,
      html,
    })
  );

  const results = await Promise.allSettled(promises);
  
  return results.map((result, index) => ({
    recipient: recipients[index],
    success: result.status === 'fulfilled',
    data: result.status === 'fulfilled' ? result.value.data : null,
    error: result.status === 'rejected' ? result.reason : null,
  }));
}
```

## Error Handling

### Environment Validation Errors

```typescript
import { keys } from '@gabfon/email';

try {
  const env = keys();
  // Use environment variables
} catch (error) {
  console.error('Email configuration error:', error);
  // Handle missing or invalid environment variables
  throw new Error('Email service not properly configured');
}
```

### Email Sending Errors

```typescript
import { resend } from '@gabfon/email';

async function sendEmailWithErrorHandling(emailData: EmailSendOptions) {
  try {
    const { data, error } = await resend.emails.send(emailData);
    
    if (error) {
      // Handle specific error types
      if (error.message.includes('rate limit')) {
        throw new Error('Email sending rate limit exceeded');
      }
      
      if (error.message.includes('invalid')) {
        throw new Error('Invalid email configuration');
      }
      
      throw new Error(`Email sending failed: ${error.message}`);
    }
    
    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}
```

### Template Rendering Errors

```typescript
import { render } from '@react-email/render';

async function renderTemplateWithErrorHandling(template: React.ReactElement) {
  try {
    const html = render(template);
    return html;
  } catch (error) {
    console.error('Template rendering error:', error);
    throw new Error('Failed to render email template');
  }
}
```

## Advanced Features

### Email Analytics

```typescript
import { resend } from '@gabfon/email';

export async function getEmailAnalytics(emailId: string) {
  const { data, error } = await resend.emails.get(emailId);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return {
    id: data.id,
    status: data.created_at,
    delivered: data.delivered_at,
    opened: data.opened_at,
    clicked: data.clicked_at,
  };
}
```

### Email Updates

```typescript
import { resend } from '@gabfon/email';

export async function updateEmail(emailId: string, scheduledAt: string) {
  const { data, error } = await resend.emails.update(emailId, {
    scheduled_at: scheduledAt,
  });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
}
```

### Email Cancellation

```typescript
import { resend } from '@gabfon/email';

export async function cancelEmail(emailId: string) {
  const { data, error } = await resend.emails.cancel(emailId);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
}
```

## Best Practices

### 1. Environment Management
- Use environment-specific configuration
- Validate environment variables at startup
- Never expose email tokens to client-side code

### 2. Template Design
- Design for mobile-first email clients
- Use inline CSS for maximum compatibility
- Include plain text alternatives

### 3. Error Handling
- Implement comprehensive error handling
- Log errors for debugging
- Provide user-friendly error messages

### 4. Performance
- Cache rendered templates when possible
- Use batch sending for bulk emails
- Implement rate limiting

### 5. Security
- Validate all user input
- Use secure email headers
- Implement SPF/DKIM records

## Integration with Other Packages

### Analytics Integration

```typescript
import { resend } from '@gabfon/email';
import { analytics } from '@gabfon/analytics/lib/server';

export async function sendTrackedEmail(emailData: EmailSendOptions) {
  // Track email send attempt
  analytics.capture('email_send_attempted', {
    recipient: emailData.to,
    subject: emailData.subject,
  });

  try {
    const { data, error } = await resend.emails.send(emailData);
    
    if (error) {
      analytics.capture('email_send_failed', {
        recipient: emailData.to,
        error: error.message,
      });
      throw error;
    }

    analytics.capture('email_send_success', {
      recipient: emailData.to,
      emailId: data.id,
    });

    return data;
  } catch (error) {
    analytics.capture('email_send_error', {
      recipient: emailData.to,
      error: error.message,
    });
    throw error;
  }
}
```

### Security Integration

```typescript
import { resend } from '@gabfon/email';
import { rateLimit } from '@gabfon/rate-limit';

export async function sendRateLimitedEmail(emailData: EmailSendOptions) {
  const { success } = await rateLimit.limit({
    key: `email:${emailData.to}`,
    requests: 10,
    window: '1h',
  });

  if (!success) {
    throw new Error('Rate limit exceeded for email sending');
  }

  return resend.emails.send(emailData);
}
```

## Testing

### Template Testing

```typescript
import { render } from '@react-email/render';
import { ContactTemplate } from '@gabfon/email/templates';

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

```typescript
import { resend } from '@gabfon/email';

// Mock Resend for testing
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'test-id' } }),
    },
  })),
}));

test('sends email successfully', async () => {
  const result = await resend.emails.send({
    from: 'test@example.com',
    to: 'recipient@example.com',
    subject: 'Test',
    html: '<p>Test</p>',
  });

  expect(result.data.id).toBe('test-id');
});
```
