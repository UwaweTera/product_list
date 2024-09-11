import Image from "next/image";
import { MdAddShoppingCart } from "react-icons/md";
import { PiMinusBold } from "react-icons/pi";
import { FiPlus } from "react-icons/fi";

const Product = ({ product, cartItems, onAddToCart, onRemoveFromCart }) => {
  return (
    <div className="rounded-md">
      <div className="w-full  relative relative mt-3">
        <Image
          src={product.image}
          alt={product.name}
          width={1000}
          height={1000}
          className={`w-full h-full rounded-xl ${
            cartItems[product.id] ? "border-primary border" : ""
          } `}
        />
        <div className="absolute bottom-[-20px] w-full">
          {!cartItems[product.id] ? (
            <div
              onClick={() => onAddToCart(product.id)}
              className="rounded-full bg-white  py-2 px-7 w-[70%] mx-auto border border-gray-400 text-black flex items-center justify-center space-x-2 hover:border-primary hover:text-primary cursor-pointer transition duration-300"
            >
              <MdAddShoppingCart size={20} className="text-primary" />
              <span>Add to Cart</span>
            </div>
          ) : (
            <div className="rounded-full bg-primary  py-2 px-3 flex items-center justify-between space-x-2 w-[70%] mx-auto">
              <div
                onClick={() => onRemoveFromCart(product.id)}
                className="border border-white text-white rounded-full p-1 cursor-pointer hover:bg-white hover:text-primary transition duration-300"
              >
                <PiMinusBold />
              </div>
              <div className="text-white font-medium">
                {cartItems[product.id]}
              </div>
              <div
                //   onClick={() => handleAddToCart(product.id)}
                onClick={() => onAddToCart(product.id)}
                className="border border-white text-white rounded-full p-1 cursor-pointer hover:bg-white hover:text-primary transition duration-300"
              >
                <FiPlus />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10">
        <p className="font-medium text-[#9E776B] ">{product.category}</p>
        <h3 className="font-semibold text-xl text-[#251B18]">{product.name}</h3>
        <p className="text-primary font-semibold text-sl">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Product;
