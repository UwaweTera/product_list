import React from "react";
import Image from "next/image";

export const CartItem = ({ product, quantity, onRemove }) => {
  return (
    <div className="border-b py-3 flex items-center justify-between">
      <div>
        <div>
          <h1 className="font-semibold my-2">{product.name}</h1>
        </div>
        <div className="flex items-center text-sm space-x-2">
          <div className="text-primary">{quantity}x</div>
          <div>
            <span className="text-[12px] text-gray-500">@ </span> $
            {product.price.toFixed(2)}
          </div>

          <div>
            <span className="text-[12px] text-gray-500"></span>
            <span className="font-semibold">
              {" "}
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div
        onClick={() => onRemove(parseInt(product.id))}
        className="border-2 border-[#9E776B] rounded-full p-1 cursor-pointer  "
      >
        {/* <CgCloseO size={23}  className="cursor-pointer" /> */}
        <Image
          src={"images/icon-remove-item.svg"}
          width={23}
          height={23}
          alt="close icon"
          className="w-3 h-3 hover:w-4 hover:h-4 transition duration-300"
        />
      </div>
    </div>
  );
};
