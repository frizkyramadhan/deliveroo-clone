import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name of The Dish',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      type: 'string',
      title: 'Short Description',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image of The Dish',
    }),
  ],
})
