import { 
  defineDocumentType, 
  makeSource 
} from 'contentlayer/source-files';

/** @type {import('contentlayer/source-files').ComputedFields} */

// Define computed fields
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
};

// Notes Post type
export const Notes = defineDocumentType(() => ({
  name: 'Notes',
  filePathPattern: `notes/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    image: {
      type: 'string',
    },
  },
  computedFields,
}));

// Export the source
export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [
    Notes,
  ],
})