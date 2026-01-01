import { defineType, defineField } from 'sanity';

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      description: 'A clear, friendly name for this service',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL-friendly version of the title (e.g., "youth-programs")',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Service Category',
      type: 'string',
      description: 'What type of service is this?',
      options: {
        list: [
          { title: 'Advice & Support', value: 'advice' },
          { title: 'Health & Wellbeing', value: 'health' },
          { title: 'Youth Programs', value: 'youth' },
          { title: 'Education & Learning', value: 'education' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Service Description',
      type: 'array',
      description: 'Tell the community about this service in a warm, welcoming way',
      of: [
        {
          type: 'block',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'string',
      description: 'When is this service available? (e.g., "Tuesdays and Thursdays, 10am-2pm")',
    }),
    defineField({
      name: 'callToAction',
      title: 'Get in Touch',
      type: 'object',
      fields: [
        defineField({
          name: 'phoneNumber',
          title: 'Phone Number',
          type: 'string',
          description: 'Contact number for this service',
          placeholder: '0161 XXX XXXX',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'Friendly text for the call-to-action button',
          initialValue: 'Give us a ring',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      description: 'Show this service prominently on the home page',
      initialValue: false,
    }),
    defineField({
      name: 'goodToKnow',
      title: 'Good to Know (For Anxious or New Users)',
      type: 'text',
      description: 'Helpful information for people who might be nervous about visiting',
      rows: 4,
      placeholder: 'Example: No need to book, just turn up! We have a ramp at the side entrance and a friendly volunteer will meet you at the door.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      featured: 'featured',
    },
    prepare({ title, category, featured }) {
      const categoryLabels: Record<string, string> = {
        advice: 'Advice & Support',
        health: 'Health & Wellbeing',
        youth: 'Youth Programs',
        education: 'Education & Learning',
      };
      
      return {
        title: title || 'Untitled Service',
        subtitle: `${categoryLabels[category] || category}${featured ? ' ⭐ Featured' : ''}`,
      };
    },
  },
});

