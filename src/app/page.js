"use client";
import { useState } from "react";
import Image from "next/image";
import products from "@/data/products";
import Product from "@/components/Product";
import { CartItem } from "@/components/CartItem";
import ConfirmModal from "@/components/ConfirmModal";

export default function Home() {
  const [cartItems, setCartItems] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Adds a product to the cart or increments its quantity
  const handleAddToCart = (productId) => {
    setCartItems((prevItems) => ({
      ...prevItems,
      [productId]: (prevItems[productId] || 0) + 1,
    }));
  };

  // Decrements the quantity of a product in the cart or removes it if quantity becomes zero
  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[productId] > 1) {
        updatedItems[productId]--;
      } else {
        delete updatedItems[productId];
      }
      return updatedItems;
    });
  };

  // Calculates the total number of items in the cart
  const getTotalItems = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  // Calculates the total price of all items in the cart
  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p.id === parseInt(productId));
      return total + product.price * quantity;
    }, 0);
  };

  // Resets the cart and confirmation state for a new order
  const handleNewOrder = () => {
    setCartItems({});
    setIsConfirmed(false);
  };

  return (
    <div className="px-2 md:w-[90%] md:mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 p-3 ">
          <h1
            className="text-2xl sm:text-4xl font-semibold"
            style={{ fontFamily: "RedHatText Bold" }}
          >
            Desserts
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-1 p-8 bg-white rounded-xl h-fit sticky top-0 self-start">
          <p
            className="text-lg font-semibold text-primary"
            style={{ fontFamily: "RedHatText Bold" }}
          >
            Your Cart ({getTotalItems()})
          </p>
          {getTotalItems() === 0 ? (
            <div className="text-center flex flex-col items-center">
              <Image
                src={"/images/illustration-empty-cart.svg"}
                alt="empty image"
                width={50}
                height={50}
                className="w-1/2 "
              />
              <p className="text-[#9E776B] mt-4 font-medium ">
                Your added items will appear here.
              </p>
            </div>
          ) : (
            <>
              {Object.entries(cartItems).map(([productId, quantity]) => {
                const product = products.find(
                  (p) => p.id === parseInt(productId)
                );
                return (
                  <CartItem
                    key={productId}
                    product={product}
                    quantity={quantity}
                    onRemove={handleRemoveFromCart}
                  />
                );
              })}
              <div className="flex items-center justify-between my-5">
                <h1>Order Total</h1>
                <p className="font-bold text-2xl">
                  ${getTotalPrice().toFixed(2)}
                </p>
              </div>
              <div>
                <button
                  onClick={() => setIsConfirmed(true)}
                  className="rounded-full w-full py-3 bg-primary font-medium text-white hover:bg-primary-dark transition-colors duration-300"
                >
                  Confirm Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isConfirmed && (
        <ConfirmModal
          cartItems={cartItems}
          getTotalPrice={getTotalPrice}
          handleNewOrder={handleNewOrder}
        />
      )}
    </div>
  );
}
