import { describe, it, expect, beforeEach, vi } from 'vitest'
import { sendContactEmail } from '@/actions/contact.actions'

vi.mock('@gabfon/email', async () => {
  const { mockResendEmail } = await import('../lib/test-utils')
  return {
    resend: mockResendEmail(),
  }
})

vi.mock('@gabfon/observability', () => ({
  parseError: vi.fn((error) => ({
    message: error instanceof Error ? error.message : String(error),
  })),
}))

describe('Server Actions - Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('sendContactEmail', () => {
    const validData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message',
    }

    it('should successfully send an email with valid data', async () => {
      const result = await sendContactEmail(validData)

      expect(result).toEqual({ success: true })
    })

    it('should return validation errors for empty name', async () => {
      const invalidData = {
        ...validData,
        name: '',
      }

      const result = await sendContactEmail(invalidData)

      expect(result).toHaveProperty('error')
      expect(result.error).toBeDefined()
    })

    it('should return validation errors for invalid email', async () => {
      const invalidData = {
        ...validData,
        email: 'invalid-email',
      }

      const result = await sendContactEmail(invalidData)

      expect(result).toHaveProperty('error')
      expect(result.error).toBeDefined()
    })

    it('should return validation errors for empty message', async () => {
      const invalidData = {
        ...validData,
        message: '',
      }

      const result = await sendContactEmail(invalidData)

      expect(result).toHaveProperty('error')
      expect(result.error).toBeDefined()
    })

    it('should return validation errors for missing fields', async () => {
      const incompleteData = {
        name: 'Test User',
        email: 'test@example.com',
      } as any

      const result = await sendContactEmail(incompleteData)

      expect(result).toHaveProperty('error')
    })

    it('should handle email service failures gracefully', async () => {
      const { resend } = await import('@gabfon/email')
      vi.mocked(resend.emails.send).mockRejectedValueOnce(
        new Error('Email service error')
      )

      const result = await sendContactEmail(validData)

      expect(result).toHaveProperty('error')
      expect(result.error).toBe('Failed to send email. Please try again later.')
    })

    it('should include correct email headers', async () => {
      const { resend } = await import('@gabfon/email')

      await sendContactEmail(validData)

      const callArgs = vi.mocked(resend.emails.send).mock.calls[0][0]
      expect(callArgs).toMatchObject({
        from: expect.stringContaining('contact@gabfon.com'),
        to: 'gabriel@frontal.dev',
        subject: expect.stringContaining(validData.name),
        replyTo: validData.email,
      })
    })

    it('should include user message in email body', async () => {
      const { resend } = await import('@gabfon/email')

      await sendContactEmail(validData)

      const callArgs = vi.mocked(resend.emails.send).mock.calls[0][0]
      expect(callArgs.text).toContain(validData.message)
      expect(callArgs.text).toContain(validData.name)
      expect(callArgs.text).toContain(validData.email)
    })

    it('should handle special characters in message', async () => {
      const dataWithSpecialChars = {
        name: 'Test "User" <&> Co.',
        email: 'test+special@example.com',
        message: 'Message with <special> & "characters" & émojis 🎉',
      }

      const result = await sendContactEmail(dataWithSpecialChars)

      expect(result).toEqual({ success: true })
    })

    it('should validate email format strictly', async () => {
      const invalidEmails = [
        'test@',
        '@example.com',
        'test.example.com',
        'test @example.com',
        'test@example',
      ]

      for (const email of invalidEmails) {
        const result = await sendContactEmail({
          ...validData,
          email,
        })

        expect(result).toHaveProperty('error')
      }
    })

    it('should reject extremely long messages', async () => {
      const tooLongMessage = 'a'.repeat(10001)

      const result = await sendContactEmail({
        ...validData,
        message: tooLongMessage,
      })

      expect(result).toHaveProperty('error')
    })

    it('should handle unexpected service errors', async () => {
      const { resend } = await import('@gabfon/email')
      vi.mocked(resend.emails.send).mockRejectedValueOnce(
        new Error('Network timeout')
      )

      const result = await sendContactEmail(validData)

      expect(result).toHaveProperty('error')
      expect(result.error).toBe('Failed to send email. Please try again later.')
    })
  })
})
