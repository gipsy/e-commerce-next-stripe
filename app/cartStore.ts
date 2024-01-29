import { AddToCartProps, Order } from "@/types";
import { create } from "zustand"

interface CartStore {
  cart: Order[];
  cartTotal: number;
  totalItems: number;
  addToCart: ({
    product, quantity
  }: AddToCartProps ) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartStore>((set) => ({
  cart: [],
  cartTotal: 0,
  totalItems: 0,
  addToCart: ({product, quantity}) =>
    set((state) => {
      const existingProductIndex = state.cart.findIndex((item) => item._id === product._id)
      const newQuantity = quantity

      if (newQuantity <= 0) {
        // If the new quantity is less than or equal to zero, remove the item from the cart
        const updatedCart = state.cart.filter((item) => item._id!== product._id)
        return {
          cart: updatedCart,
          cartTotal: calculateCartTotal(updatedCart),
          totalItems: calculateTotalItems(updatedCart)
        }
      }

      console.log('check')
      console.log(existingProductIndex !== -1)
      if (existingProductIndex !== -1) {
        // If the product already exists, update the quantity to the new quantity
        const updatedCart = [...state.cart]
        updatedCart[existingProductIndex].qty = newQuantity

        return {
          cart: updatedCart,
          cartTotal: calculateCartTotal(updatedCart),
          totalItems: calculateTotalItems(updatedCart),
        };
      } else {
        // If the product doesn't exist, add it to the cart with the new quantity
        return {
          cart: [...state.cart, { ...product, qty: newQuantity }],
          cartTotal: calculateCartTotal([...state.cart, { ...product, qty: newQuantity }]),
          totalItems: calculateTotalItems([...state.cart, { ...product, qty: newQuantity }]),
        };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item._id !== productId)

      return {
        cart: updatedCart,
        cartTotal: calculateCartTotal(updatedCart),
        totalItems: calculateTotalItems(updatedCart),
      };
    }),
  clearCart: () => set({ cart: [], cartTotal: 0, totalItems: 0 }),
}))

function calculateCartTotal(cart: Order[]) {
  return cart.reduce((total, item) => total + item.price * item.qty, 0)
}

function calculateTotalItems(cart: Order[]) {
  return cart.reduce((total, item) => total + 1, 0)
}

export default useCartStore