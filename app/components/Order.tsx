import { currentUser } from "@clerk/nextjs"
import { getOrdersByEmail } from "@/sanity/sanity-utils"
import { Order } from "@/types"

export default async function Order() {
  const user = await currentUser()

  if (!user) {
    return <div>Please login to view this page</div>
  }


  const orders: Order[] = await getOrdersByEmail(user.emailAddresses[0].emailAddress)

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <h1 className="text-center text-3xl font-semibold text-[#5B20B6] mb-6">Order Page</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border border-gray-300">
            <th className="py-3 px-4">Product</th>
            <th className="py-3 px-4">Qty</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Paid</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map(product => (
              <tr key={product._id} className="border border-gray-300 hover:bg-gray-50 text-center boder-b text-[#5B20B6]">
                <td className="py-3 px-4 flex items-center">{product.name}</td>
                <td className="py-2 px-4">{product.qty}</td>
                <td className="py-2 px-4">{product.price}</td>
                <td className="py-2 px-4">
                  {
                    product.paid? (
                        <span className="text-green-500">Paid</span>
                      ) : (
                        <span className="text-red-500">Not Paid</span>
                      )
                  }
                </td>
                <td className="py-2 px-4">
                  {
                    product.delivered? (
                      <span className="text-green-500">Delivered</span>
                    ) : (
                      <span className="text-red-500">Not Delivered</span>
                    )
                  }
                  </td>
              </tr>
            ))
          }
        </tbody>
      </table>  
    </div>
  )
}