import { CreateUserProps, CreateOrderProps, Order } from "@/types"
import { SanityDocument, createClient, groq } from "next-sanity"
// import { createClient } from "@sanity-typed/types"

const client = createClient({
  projectId: "hamhgy2t",
  dataset: "production",
  // title: "e-commerce next stripe",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  apiVersion: "2021-10-25",
})

export async function getUsersByEmail(email: string) {
  return client.fetch(
    groq`*[_type == "user" && email == "${email}"]{
      _id,
      name,
      email,
      createdAt
    }`, { email }
  )
}

export async function getProducts(params: any) {
  return client.fetch(
    groq`*[_type == "product"]{
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      "image": image.asset->url,
      createdAt
    }`
  ) 
}

export async function getProductBySlug(slug: string) {
  console.log('getProductBySlug', slug)
  return client.fetch(
    groq`*[_type == "product" && slug.current == "${slug}"]{
      _id,
      name,
      "slug": slug.current,
      description,
      price,
      "image": image.asset->url,
      createdAt
    }`
  )
}

export async function createUser(userData: CreateUserProps) {
  const { name, email } = userData

  const existingUser = await getUsersByEmail(email)

  if (existingUser.length > 0) {
    throw new Error("User already exists")
  }

  const newUser = await client.create({
    _type: "user",
    name,
    email,
    createdAt: new Date().toISOString()
  })

  return newUser
}

export async function createOrder(params: CreateOrderProps) {

  const { email, cart } = params

  try {
    // Create an array to store the promises for creating each order
    const orderCreationPromises = [] as SanityDocument[]

    // Iterate over the orderDataArray and create a promise for each order
    cart.forEach(orderData => {
      // Extract order data
      const { name, qty, price} = orderData

      // Create a promise for creating each order
      const orderCreationPromise = client.create({
        _type: 'order',
        name,
        qty,
        price,
        paid: true,
        delivered: false,
        email: email,
        createdAt: new Date().toISOString(),
      }) as unknown as SanityDocument;

      // Add the promise to the array
      orderCreationPromises.push(orderCreationPromise)
    })

    // Wait for all order creation promises to resolve
    const createdOrders = await Promise.all(orderCreationPromises)

    // Return the created orders
    return createdOrders
  } catch (error) {
    // Handle errors appropriately
    console.error('Error creating order:', (error as Error).message)
    throw new Error('Failed to create order')
  }
}

export async function getOrdersByEmail(email: string) {
  try {
    // Get all orders for the given email
    const orders = await client.fetch(
      groq`*[_type == "order" && email == "${email}"]{
        _id,
        name,
        qty,
        price,
        paid,
        delivered,
        email,
        createdAt
      }`
    )
    return orders
  } catch (error) {
    console.error('Error getting orders:', (error as Error).message)
    throw new Error('Failed to get orders')
  }
}