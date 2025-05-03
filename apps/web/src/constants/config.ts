export const config = {
  modal: {
    command: {
      enabled: true,
      shortcutKey: 'j',
      shortcutModifier: '⌘',
    },
  },
  projects: {
    enabled: true,
  },
  posts: {
    enabled: true,
  },
  social: {
    twitter: {
      url: 'https://x.com/gabfon_',
      alt: 'Twitter',
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/gabrielvfonseca/',
      alt: 'LinkedIn',
    },
    github: {
      url: 'https://github.com/gabrielvfonseca',
      alt: 'GitHub',
    },
  },
};

export type Config = typeof config;
