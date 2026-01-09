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
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'A welcoming image that represents this service',
      options: {
        hotspot: true,
      },
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
      name: 'scheduleStructured',
      title: 'Schedule (Time-based)',
      type: 'array',
      description: 'When is this service running? Add one entry for each time slot.',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'dayOfWeek',
            title: 'Day of Week',
            type: 'string',
            options: {
              list: [
                { title: 'Monday', value: 'monday' },
                { title: 'Tuesday', value: 'tuesday' },
                { title: 'Wednesday', value: 'wednesday' },
                { title: 'Thursday', value: 'thursday' },
                { title: 'Friday', value: 'friday' },
                { title: 'Saturday', value: 'saturday' },
                { title: 'Sunday', value: 'sunday' },
              ],
              layout: 'dropdown',
            },
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: 'startTime',
            title: 'Start Time',
            type: 'string',
            description: 'When does this service start? (24-hour format: HH:MM)',
            placeholder: '10:00',
            validation: (Rule) => Rule.required().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).error('Must be in HH:MM format'),
          }),
          defineField({
            name: 'endTime',
            title: 'End Time',
            type: 'string',
            description: 'When does this service end? (24-hour format: HH:MM)',
            placeholder: '12:00',
            validation: (Rule) => Rule.required().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).error('Must be in HH:MM format'),
          }),
        ],
        preview: {
          select: { day: 'dayOfWeek', start: 'startTime', end: 'endTime' },
          prepare({ day, start, end }) {
            const dayLabels = { monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday', thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday' };
            return { title: `${dayLabels[day] || day}: ${start} - ${end}` };
          },
        },
      }],
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
          name: 'email',
          title: 'Email Address',
          type: 'string',
          description: 'Email address for this service (optional)',
          placeholder: 'info@spotlandcommunity.org',
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
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      description: 'What benefits does this service provide?',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'targetAudience',
      title: 'Who It\'s For',
      type: 'array',
      description: 'Who is this service designed for?',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Impact Statistics',
      type: 'array',
      description: 'Key statistics that show the impact of this service',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'What does this stat represent? (e.g., "People Helped")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The statistic value (e.g., "500+", "95%", "50")',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              label: 'label',
              value: 'value',
            },
            prepare({ label, value }) {
              return {
                title: `${value} ${label}`,
              };
            },
          },
        },
      ],
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

