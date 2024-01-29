import { getProductBySlug } from "@/sanity/sanity-utils"
import Details from "../../components/Details"
import Header from "../../components/Header"

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const product = await getProductBySlug(slug)

  return (
    <div>
      <Header />

      <div>
        <Details product={product[0]} />
      </div>
    </div>
  )
}