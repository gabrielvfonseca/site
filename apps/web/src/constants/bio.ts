import type { BioImage } from '@/types/bio';

export const BIO_GALLERY: readonly BioImage[] = [
  {
    src: '/images/bio-01-frontal.png',
    alt: 'Gabriel presenting Frontal on stage',
    caption: 'Frontal, on stage',
  },
  {
    src: '/images/bio-02-coding.png',
    alt: 'Coding session at the desk',
    caption: 'Heads down',
  },
  {
    src: '/images/bio-03-water.png',
    alt: 'On the water near Lisbon in summer',
    caption: 'Summers on the water',
  },
  {
    src: '/images/bio-04-events.png',
    alt: 'Presenting at a meetup',
    caption: 'Talks & meetups',
  },
  {
    src: '/images/bio-05-music.png',
    alt: 'Home setup with DJ decks, guitars, and studio monitors',
    caption: 'Off the clock',
  },
  {
    src: '/images/bio-06-festival.png',
    alt: 'NOS Alive festival crowd in Lisbon',
    caption: 'Live music',
  },
] as const;
