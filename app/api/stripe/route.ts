import { NextApiRequest } from "next"
import { NextDataPathnameNormalizer } from "next/dist/server/future/normalizers/request/next-data"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export async function POST(req: Request) {
  const { data } = await req.json()
  const { amount } = data

  try {
    const payIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "USD",
    })

    return NextResponse.json({status: 200, intent: payIntent?.client_secret})
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}