import React from 'react'
import Image from 'next/image';
import products from '@/data/products';

export default function ConfirmModal({ cartItems, getTotalPrice, handleNewOrder }) {
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-xl p-5 md:p-10 w-full sm:w-[80%] md:w-[60%] lg:w-[35%] mx-auto max-h-screen sm:max-h-[90vh] overflow-y-auto fixed bottom-0 sm:static">
      <Image
        src={"images/icon-order-confirmed.svg"}
        width={50}
        height={50}
        alt="confirmed icon"
        className="my-7 md:my-5"
      />
      <h1
        className="text-5xl mb-3"
        style={{ fontFamily: "RedHatText Bold" }}
      >
        Order Confirmed
      </h1>
      <p className="text-[#9E776B] font-medium">
        We hope you enjoy your food!
      </p>

      <div className="bg-primary-lighter px-5 py-2 my-10 rounded-lg">
        <div className="my-5  mt-5 ">
          {Object.entries(cartItems).map(([productId, quantity]) => {
            const product = products.find(
              (p) => p.id === parseInt(productId)
            );
            return (
              <div
                key={productId}
                className="border-b py-3 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div>
                    <Image
                      src={product.image}
                      width={50}
                      height={50}
                      alt="prod image"
                      className="rounded"
                    />
                  </div>
                  <div>
                    <div>
                      <h1 className="font-semibold my-2 ">
                        {product.name}
                      </h1>
                    </div>
                    <div className="flex items-center tex-sm space-x-2">
                      <div className="text-primary">{quantity}x</div>
                      <div>
                        <span className="text-[12px] text-gray-500">
                          @{" "}
                        </span>{" "}
                        ${product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <span className="font-semibold">
                    {" "}
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between my-5">
          <h1>Order Total</h1>
          <p className="font-bold text-2xl">
            ${getTotalPrice().toFixed(2)}
          </p>
        </div>
      </div>
      <div>
        <button
          onClick={handleNewOrder}
          className="rounded-full w-full py-3 bg-primary font-medium text-white hover:bg-primary-dark transition-colors duration-300"
        >
          Start New Order
        </button>
      </div>
    </div>
  </div>
  )
}
