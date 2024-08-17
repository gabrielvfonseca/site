
import * as React from "react";

// Email Components
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Styles
const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const paragraph = {
  color: "#000",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

// Email Template
export function Email(email?: string): JSX.Element {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to the newsletter! 
        You'll receive updates on the latest updates and news.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={paragraph}>
              Welcome to the newsletter! I'am excited to have you on board.
            </Text>

            <Text style={paragraph}> 
              If you have any questions, feel free to reply to this email.
            </Text>

            <Text style={paragraph}>
              Best regards,
              <br />
              <br />
              Gabriel Fonseca
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};