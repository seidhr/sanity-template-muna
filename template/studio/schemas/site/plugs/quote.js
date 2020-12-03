import jsonata from 'jsonata'

export default {
  name: 'quote',
  type: 'object',
  title: 'Quote',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      name: 'content',
      type: 'quoteBlock',
    },
    {
      name: 'credit',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({content}) {
      return {
        title: content
          ? content[0].children
              .filter((child) => child._type === 'span')
              .map((span) => span.text)
              .join('')
          : '',
        subtitle: 'Quote',
      }
    },
  },
}
