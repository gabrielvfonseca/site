'use client';

import { makePage } from '@keystatic/next/ui/app';
import dynamic from 'next/dynamic';
import config from '@/keystatic.config';

const KeystaticPage = makePage(config);

const KeystaticClientOnly = dynamic(
  () => Promise.resolve(() => <KeystaticPage />),
  { ssr: false }
);

export default function Page() {
  return <KeystaticClientOnly />;
}
