import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured Menu Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Featured Category Dish',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      type: 'string',
      title: 'Short Description',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'restaurants',
      type: 'array',
      title: 'Restaurants',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
    }),
  ],
})
