import {
  defineField,
  defineType
} from "sanity"

const order = defineType({
    name: "order",
    title: "Orders",
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
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "qty",
        title: "Qty",
        type: "number",
        validation: (Rule) => Rule.required().min(0),
      }),
      defineField({
        name: "price",
        title: "Price",
        type: "number",
        validation: (Rule) => Rule.required().min(0),
      }),
      defineField({
        name: "createdAt",
        title: "Created At",
        type: "datetime",
        options: {
          dateFormat: "YYYY-MM-DDTHH:mm:ssZ",
        },
        readOnly: true,
      }),
      defineField({
        name: "paid",
        title: "Paid",
        type: "boolean",
      }),
      defineField({
        name: "delivered",
        title: "Delivered",
        type: "boolean",
      }),
    ],
    initialValue: {
      createdAt: new Date().toISOString(),
    },
  })
  
  export default order