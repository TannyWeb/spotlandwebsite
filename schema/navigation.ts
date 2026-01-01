import { defineType, defineField } from 'sanity';

export const navigationSchema = defineType({
  name: 'navigation',
  title: 'Navigation Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Header Menu',
      type: 'object',
      fields: [
        defineField({
          name: 'menuItems',
          title: 'Menu Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  description: 'Text to display in the menu',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'link',
                  title: 'Link',
                  type: 'string',
                  description: 'URL or path (e.g., "/services" or "https://example.com")',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'openInNewTab',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  initialValue: false,
                }),
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'link',
                },
              },
            },
          ],
          description: 'Add menu items for the header navigation',
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Information',
      type: 'object',
      fields: [
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'string',
          description: 'A warm, welcoming message for the footer',
          initialValue: 'Spotland Community Centre - Your friendly neighbourhood hub',
        }),
        defineField({
          name: 'contactInfo',
          title: 'Contact Information',
          type: 'object',
          fields: [
            defineField({
              name: 'address',
              title: 'Address',
              type: 'text',
              description: 'Centre address for visitors',
              rows: 3,
            }),
            defineField({
              name: 'phone',
              title: 'Main Phone Number',
              type: 'string',
              placeholder: '0161 XXX XXXX',
            }),
            defineField({
              name: 'email',
              title: 'Email Address',
              type: 'email',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation Settings',
        subtitle: 'Header menu and footer information',
      };
    },
  },
});

