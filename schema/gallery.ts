import { defineType, defineField } from 'sanity';

export const gallerySchema = defineType({
  name: 'gallery',
  title: 'Photo Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      description: 'Name of this photo album (e.g., "Youth Programs 2024")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL-friendly version of the title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of this album (keep it simple for all readers)',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Main image shown on the gallery index page',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      description: 'Add photos to this album',
      of: [
        {
          type: 'object',
          name: 'photo',
          title: 'Photo',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Short description shown below the photo',
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text (Accessibility)',
              type: 'string',
              description: 'Describe the image for screen readers (e.g., "Children playing in the garden")',
              validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
            }),
          ],
          preview: {
            select: {
              caption: 'caption',
              altText: 'altText',
              media: 'image',
            },
            prepare({ caption, altText, media }) {
              return {
                title: caption || altText || 'Untitled photo',
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When this album was published',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Album',
      type: 'boolean',
      description: 'Show this album prominently on the gallery page',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      photoCount: 'photos',
      media: 'coverImage',
    },
    prepare({ title, photoCount, media }) {
      const count = photoCount?.length || 0;
      return {
        title: title || 'Untitled Album',
        subtitle: `${count} photo${count === 1 ? '' : 's'}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],
});
