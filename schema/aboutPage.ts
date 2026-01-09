import { defineType, defineField } from 'sanity';

export const aboutPageSchema = defineType({
  name: 'aboutPage',
  title: 'About Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Spotland Community Centre',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ourStory',
      title: 'Our Story',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'The history and mission of Spotland Community Centre',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ourStoryImage',
      title: 'Story Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'showTeam',
      title: 'Show Team Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showPartners',
      title: 'Show Partners Section',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Content',
      };
    },
  },
});
