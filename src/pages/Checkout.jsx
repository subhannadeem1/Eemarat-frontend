import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaTrash } from "react-icons/fa";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("bankTransfer");
  const {
    all_products,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);

  return (
    <>
      <h1 className="text-4xl font-bold  text-center my-8">Checkout</h1>
      <div className="flex flex-col md:flex-row p-4 gap-4">
        <div className="flex-1">
          <div className="p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Billing Details</h2>
            {/* Form fields for billing details */}
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First Name"
                className="border rounded-md p-2 w-full mb-4"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border  rounded-md p-2 w-full mb-4"
              />
            </div>

            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Email Address"
                className="border rounded-md p-2 w-full mb-4"
              />
              <input
                type="text"
                placeholder="Phone (Required)"
                className="border rounded-md p-2 w-full mb-4"
              />
            </div>

            <input
              type="text"
              placeholder="Company Name (Optional)"
              className="border rounded-md p-2 w-full mb-4"
            />

            <input
              type="text"
              placeholder="Address"
              className="border p-2 rounded-md w-full mb-4"
            />
            <input
              type="text"
              placeholder="Town / City"
              className="border rounded-md p-2 w-full mb-4"
            />
            <div className="flex space-x-4">
              <select className="border p-2 w-full mb-4">
                <option value="punjab">Punjab</option>
                <option value="sindh">Sindh</option>
                <option value="kpk">KPK</option>
                <option value="balochistan">Balochistan</option>
              </select>
              <input
                type="text"
                placeholder="Postcode / Zip"
                className="border rounded-md p-2 w-full mb-4"
              />
            </div>
            <textarea
              placeholder="Notes about your order, e.g., special notes for delivery."
              className="border p-2 w-full mb-4"
              rows="7"
            ></textarea>
          </div>
        </div>

        {/* 2nd section */}

        <div className="flex-1">
          <div className="p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Your Order</h2>
            {/* Order details placeholder */}
            <div className="bg-gray-100 p-4 mb-4">
              {Object.entries(cartItems).map(([id, quantity]) => {
                if (quantity > 0) {
                  const product = all_products.find(
                    (product) => product.id === Number(id)
                  );
                  return (
                    <div key={id} className="flex items-center mb-4 justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "100px", height: "100px" }}
                        />
                        <div>
                          <p>{product.name}</p>
                          <p>Rs {product.new_price.toFixed(2)}</p>
                          <p>Quantity {quantity}</p>
                          <p>
                            Total Rs {(product.new_price * quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(id)}
                        className="text-[#005F93] hover:text-[#005173]"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  );
                }
                return null;
              })}
              <hr />
              <br />
              <div className="flex justify-between mb-1">
                <span>Subtotal:</span>
                <span>Rs {getTotalCartAmount().toFixed(2)}</span>
              </div>
              <p>
                Shipping: <br />
                Delivery Charges based on Quantity
              </p>
              <div className="flex justify-between mt-4 font-bold">
                <span>Total:</span>
                <span>Rs {getTotalCartAmount().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* payment method */}
          <div className="flex-1">
            <div className="p-4 shadow-lg">
              <h2 className="text-lg font-bold mb-4">Payment Method</h2>
              {/* Payment options */}
              <div className="form-check mb-4">
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#005173] checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="paymentMethod"
                  id="bankTransfer"
                  checked={paymentMethod === "bankTransfer"}
                  onChange={() => setPaymentMethod("bankTransfer")}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="bankTransfer"
                >
                  Direct Bank Transfer
                </label>
                {/* Bank details shown only if 'Direct Bank Transfer' is selected */}
                {paymentMethod === "bankTransfer" && (
                  <div className="mt-4 text-sm">
                    <p>
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                    <br />
                    <p>Bank AlHabib</p>
                    <p>Title: Subhan Nadeem.</p>
                    <p>Acc#: 01640981003657054</p>
                    <p>IBAN: PK1640981003657054</p>
                    <br />
                    <p>Meezan Bank</p>
                    <p>Title: Subhan Nadeem.</p>
                    <p>Acc#: 0201-020897776</p>
                    <p>IBAN: PK14MEZN00020897776</p>
                  </div>
                )}
              </div>
              <div className="form-check">
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#005173] checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="paymentMethod"
                  id="cashDelivery"
                  checked={paymentMethod === "cashDelivery"}
                  onChange={() => setPaymentMethod("cashDelivery")}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="cashDelivery"
                >
                  Cash on Delivery
                </label>
              </div>
              <br />
              <button className="mt-4 w-full bg-[#005F93] hover:bg-[#005173] text-white font-bold py-2 px-4 rounded-lg">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
