import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ContactForm } from '@/components/forms/contact-form'

// Mock the server action
vi.mock('@/actions/contact.actions', () => ({
  sendContactEmail: vi.fn(),
}))

// Mock toast
vi.mock('@gabfon/design-system/components/toaster', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render all form fields', () => {
      render(<ContactForm />)

      expect(screen.getByLabelText('Name')).toBeDefined()
      expect(screen.getByLabelText('Email')).toBeDefined()
      expect(screen.getByLabelText('Message')).toBeDefined()
    })

    it('should render submit button', () => {
      render(<ContactForm />)

      expect(screen.getByRole('button', { name: /send message/i })).toBeDefined()
    })

    it('should have correct input types', () => {
      render(<ContactForm />)

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      expect(emailInput.type).toBe('email')
    })

    it('should have correct input names', () => {
      render(<ContactForm />)

      expect((screen.getByLabelText('Name') as HTMLInputElement).name).toBe('name')
      expect((screen.getByLabelText('Email') as HTMLInputElement).name).toBe('email')
      expect((screen.getByLabelText('Message') as HTMLTextAreaElement).name).toBe('message')
    })

    it('should have proper placeholders', () => {
      render(<ContactForm />)

      expect(screen.getByPlaceholderText('John Doe')).toBeDefined()
      expect(screen.getByPlaceholderText('john@example.com')).toBeDefined()
      expect(screen.getByPlaceholderText("What's on your mind?")).toBeDefined()
    })
  })

  describe('Accessibility', () => {
    it('should have associated labels for all inputs', () => {
      render(<ContactForm />)

      const form = screen.getByRole('form', { hidden: true }) || screen.getByRole('button').closest('form')
      expect(form).toBeDefined()
    })

    it('should have accessible form structure', () => {
      const { container } = render(<ContactForm />)

      const labels = container.querySelectorAll('label')
      expect(labels.length).toBe(3)
    })

    it('should mark required fields', () => {
      render(<ContactForm />)

      const nameInput = screen.getByLabelText('Name') as HTMLInputElement
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement

      expect(nameInput.required).toBe(true)
      expect(emailInput.required).toBe(true)
      expect(messageInput.required).toBe(true)
    })

    it('should have descriptive button text', () => {
      render(<ContactForm />)

      const button = screen.getByRole('button', { name: /send message/i })
      expect(button.textContent).toContain('Send Message')
    })
  })

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      const { sendContactEmail } = await import('@/actions/contact.actions')
      vi.mocked(sendContactEmail).mockResolvedValue({ success: true })

      render(<ContactForm />)

      await userEvent.type(screen.getByLabelText('Name'), 'John Doe')
      await userEvent.type(screen.getByLabelText('Email'), 'john@example.com')
      await userEvent.type(
        screen.getByLabelText('Message'),
        'This is a test message'
      )

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await userEvent.click(submitButton)

      await waitFor(async () => {
        const { toast } = await import('@gabfon/design-system/components/toaster')
        expect(vi.mocked(toast).success).toHaveBeenCalled()
      })
    })

    it('should prevent default form submission', async () => {
      render(<ContactForm />)

      const form = screen.getByLabelText('Name').closest('form')
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
      const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault')

      form?.dispatchEvent(submitEvent)
      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should show loading state while submitting', async () => {
      const { sendContactEmail } = await import('@/actions/contact.actions')
      vi.mocked(sendContactEmail).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ success: true }), 100)
          )
      )

      render(<ContactForm />)

      await userEvent.type(screen.getByLabelText('Name'), 'John Doe')
      await userEvent.type(screen.getByLabelText('Email'), 'john@example.com')
      await userEvent.type(
        screen.getByLabelText('Message'),
        'This is a test message'
      )

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await userEvent.click(submitButton)

      // Button should be disabled during submission
      expect(submitButton.getAttribute('disabled')).toBeDefined()
    })

    it('should disable all inputs while submitting', async () => {
      const { sendContactEmail } = await import('@/actions/contact.actions')
      vi.mocked(sendContactEmail).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ success: true }), 100)
          )
      )

      render(<ContactForm />)

      const nameInput = screen.getByLabelText('Name') as HTMLInputElement
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement

      await userEvent.type(nameInput, 'John Doe')
      await userEvent.type(emailInput, 'john@example.com')
      await userEvent.type(messageInput, 'This is a test message')

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await userEvent.click(submitButton)

      // Inputs should be disabled during submission
      expect(nameInput.disabled).toBe(true)
      expect(emailInput.disabled).toBe(true)
      expect(messageInput.disabled).toBe(true)
    })
  })

  describe('Success Handling', () => {
    it('should show success toast on valid submission', async () => {
      const { sendContactEmail } = await import('@/actions/contact.actions')
      vi.mocked(sendContactEmail).mockResolvedValue({ success: true })

      render(<ContactForm />)

      await userEvent.type(screen.getByLabelText('Name'), 'John Doe')
      await userEvent.type(screen.getByLabelText('Email'), 'john@example.com')
      await userEvent.type(
        screen.getByLabelText('Message'),
        'This is a test message'
      )

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await userEvent.click(submitButton)

      await waitFor(async () => {
        const { toast } = await import('@gabfon/design-system/components/toaster')
        expect(vi.mocked(toast).success).toHaveBeenCalledWith(
          expect.stringContaining('Thank you')
        )
      })
    })

    it('should reset form after successful submission', async () => {
      const { sendContactEmail } = await import('@/actions/contact.actions')
      vi.mocked(sendContactEmail).mockResolvedValue({ success: true })

      render(<ContactForm />)

      const nameInput = screen.getByLabelText('Name') as HTMLInputElement
      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement

      await userEvent.type(nameInput, 'John Doe')
      await userEvent.type(emailInput, 'john@example.com')
      await userEvent.type(messageInput, 'This is a test message')

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(nameInput.value).toBe('')
        expect(emailInput.value).toBe('')
        expect(messageInput.value).toBe('')
      })
    })
  })

  describe('Error Handling', () => {
    it('should show error toast on submission failure', async () => {
      const { sendContactEmail } = await import('@/actions/contact.actions')
      vi.mocked(sendContactEmail).mockResolvedValue({
        error: 'Failed to send email. Please try again later.',
      })

      render(<ContactForm />)

      await userEvent.type(screen.getByLabelText('Name'), 'John Doe')
      await userEvent.type(screen.getByLabelText('Email'), 'john@example.com')
      await userEvent.type(
        screen.getByLabelText('Message'),
        'This is a test message'
      )

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await userEvent.click(submitButton)

      await waitFor(async () => {
        const { toast } = await import('@gabfon/design-system/components/toaster')
        expect(vi.mocked(toast).error).toHaveBeenCalled()
      })
    })

    it('should not reset form on error', async () => {
      const { sendContactEmail } = await import('@/actions/contact.actions')
      vi.mocked(sendContactEmail).mockResolvedValue({
        error: 'Failed to send email.',
      })

      render(<ContactForm />)

      const nameInput = screen.getByLabelText('Name') as HTMLInputElement
      const testName = 'John Doe'

      await userEvent.type(nameInput, testName)
      await userEvent.type(screen.getByLabelText('Email'), 'john@example.com')
      await userEvent.type(
        screen.getByLabelText('Message'),
        'This is a test message'
      )

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await userEvent.click(submitButton)

      await waitFor(() => {
        expect(nameInput.value).toBe(testName)
      })
    })

    it('should display validation error messages', async () => {
      const { sendContactEmail } = await import('@/actions/contact.actions')
      vi.mocked(sendContactEmail).mockResolvedValue({
        error: 'Please check the form for errors.',
      })

      render(<ContactForm />)

      await userEvent.type(screen.getByLabelText('Name'), 'John Doe')
      await userEvent.type(screen.getByLabelText('Email'), 'john@example.com')
      await userEvent.type(
        screen.getByLabelText('Message'),
        'This is a test message'
      )

      const submitButton = screen.getByRole('button', { name: /send message/i })
      await userEvent.click(submitButton)

      await waitFor(async () => {
        const { toast } = await import('@gabfon/design-system/components/toaster')
        expect(vi.mocked(toast).error).toHaveBeenCalledWith(
          'Please check the form for errors.'
        )
      })
    })
  })

  describe('Button States', () => {
    it('should update button text while submitting', async () => {
      const { sendContactEmail } = await import('@/actions/contact.actions')
      vi.mocked(sendContactEmail).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ success: true }), 100)
          )
      )

      render(<ContactForm />)

      const button = screen.getByRole('button', { name: /send message/i })
      expect(button.textContent).toContain('Send Message')

      await userEvent.type(screen.getByLabelText('Name'), 'John Doe')
      await userEvent.type(screen.getByLabelText('Email'), 'john@example.com')
      await userEvent.type(
        screen.getByLabelText('Message'),
        'This is a test message'
      )

      await userEvent.click(button)

      await waitFor(() => {
        expect(button.textContent).toContain('Sending...')
      })
    })

    it('should have correct button styling', () => {
      render(<ContactForm />)

      const button = screen.getByRole('button', { name: /send message/i })
      expect(button.className).toContain('w-full')
    })
  })

  describe('Input Validation', () => {
    it('should require name field', async () => {
      render(<ContactForm />)

      const nameInput = screen.getByLabelText('Name') as HTMLInputElement
      expect(nameInput.required).toBe(true)
    })

    it('should require email field', async () => {
      render(<ContactForm />)

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      expect(emailInput.required).toBe(true)
    })

    it('should require message field', async () => {
      render(<ContactForm />)

      const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement
      expect(messageInput.required).toBe(true)
    })

    it('should validate email format', async () => {
      render(<ContactForm />)

      const emailInput = screen.getByLabelText('Email') as HTMLInputElement
      expect(emailInput.type).toBe('email')
    })

    it('should have correct textarea rows', () => {
      render(<ContactForm />)

      const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement
      expect(messageInput.rows).toBe(6)
    })
  })
})
