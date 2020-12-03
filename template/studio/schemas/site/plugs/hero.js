export default {
  type: 'object',
  name: 'hero',
  title: 'Hero',
  fields: [
    {
      type: 'boolean',
      name: 'disabled',
    },
    {
      name: 'label',
      type: 'string',
    },
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'tagline',
      type: 'blockContent',
    },
    {
      name: 'illustration',
      type: 'illustration',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'label',
      disabled: 'disabled',
    },
    prepare({ title, disabled }) {
      return {
        title: `${disabled ? 'DISABLED' : title}`,
        subtitle: 'Hero'
      }
    },
  },
}
