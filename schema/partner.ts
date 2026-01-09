import { defineType, defineField } from 'sanity';

export const partnerSchema = defineType({
  name: 'partner',
  title: 'Community Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Organisation Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'What does this partner do? (1-2 sentences)',
      rows: 2,
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'partnershipType',
      title: 'Partnership Type',
      type: 'string',
      options: {
        list: [
          { title: 'Funding Partner', value: 'funding' },
          { title: 'Service Delivery Partner', value: 'service' },
          { title: 'Community Partner', value: 'community' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'partnershipType',
      media: 'logo',
    },
  },
});
