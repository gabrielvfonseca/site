import { collection, config, fields } from '@keystatic/core';

const useGitHub = !!process.env.KEYSTATIC_GITHUB_CLIENT_ID;

const contentRoot = 'apps/web/content';

export default config({
  storage: useGitHub
    ? {
        kind: 'github',
        repo: { owner: 'gabrielfonseca', name: 'site-main' },
        branchPrefix: 'cms/',
      }
    : { kind: 'local' },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: `${contentRoot}/posts/*`,
      format: { contentField: 'content' },
      columns: ['title', 'date'],
      schema: {
        title: fields.text({
          label: 'Title',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({ label: 'Publish Date' }),
        author: fields.text({ label: 'Author' }),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: `${contentRoot}/projects/*`,
      format: { contentField: 'content' },
      columns: ['title', 'date'],
      schema: {
        title: fields.text({
          label: 'Title',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({ label: 'Publish Date' }),
        link: fields.url({ label: 'Link' }),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    }),
  },
});
