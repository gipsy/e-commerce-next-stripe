import {
  // defineArrayMember,
  defineField,
  defineType,
} from "sanity"

export const user = defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: Rule => Rule.email().required()
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