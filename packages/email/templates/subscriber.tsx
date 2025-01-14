import {
  Body,
  Container,
  Head,
  Html,
  Tailwind,
  Text,
} from '@react-email/components';

export const SubscriberTemplate = () => (
  <Tailwind>
    <Html>
      <Head />
      <Body className="bg-primary font-sans">
        <Container className="mx-auto flex flex-col px-4 py-8">
          <Text className="mt-0 mb-4 text-sm text-secondary">
            Hey,
          </Text>
          <Text className="mt-0 mb-4 text-sm font-medium text-secondary">
            Thank you for subscribing to my newsletter!
          </Text>
          <Text className="mt-0 mb-4 text-sm text-secondary">
            I'm <a href='https://gabfon.com' className='text-blue-800 hover:text-blue-900 no-underline'>Gabriel</a>, a software developer, student, and the founder 
            of Sequence. I'm excited to share my experiences, insights, 
            and the latest updates from my personal and professional 
            journey with you.
          </Text>
          <Text className="mt-0 mb-4 text-sm text-secondary">
            To kick things off, I'd love to learn more about you. 
            What topics are you most interested in? Feel free to reply to 
            this email with your thoughts — I read and respond to every message.
          </Text>
          <Text className="mt-0 mb-4 text-sm text-secondary">
            Cheers,
            <br />Gabriel
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);