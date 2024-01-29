import {
  defineField,
  defineType
} from "sanity"

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 100,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DDTHH:mm:ssZ",
      },
      readOnly: true,
    })
  ]
})