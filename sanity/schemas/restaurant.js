import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Image of The Restaurant',
      type: 'image',
    }),
    defineField({
      name: 'lat',
      title: 'Latitude of The Restaurant',
      type: 'number',
    }),
    defineField({
      name: 'long',
      title: 'Longitude of The Restaurant',
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: 'Restaurant Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Enter the rating of the restaurant (1 - 5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).error('Rating must be between 1 and 5'),
    }),
    defineField({
      name: 'type',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    }),
  ],
})
