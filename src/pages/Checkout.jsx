import React, { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_url } from "../context/ShopContext";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("bankTransfer");
  const { all_products, cartItems, removeFromCart, getTotalCartAmount, resetCart } = useContext(ShopContext);

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    region: "",
    postcode: "",
    notes: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBillingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    console.log("Cart Items:", cartItems);
  
    // Filter out items with zero quantity
    const filteredCartItems = Object.entries(cartItems).filter(([id, quantity]) => quantity > 0);
    console.log("Filtered Cart Items:", filteredCartItems);
  
    try {
      // Create order object
      const order = {
        billingDetails,
        cartItems: filteredCartItems.map(([id, quantity]) => {
          const product = all_products.find((product) => product.id === Number(id));
          console.log(`Product for ID ${id}:`, product);
          if (!product) {
            throw new Error(`Product with ID ${id} not found`);
          }
          return {
            productId: Number(id),
            quantity,
            price: product.new_price,
            total: product.new_price * quantity,
          };
        }),
      };
  
      // Send order to backend
      const response = await axios.post( backend_url + "/submitOrder", order);
  
      if (response.data.success) {
        toast.success(<CustomToast />, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
        // Reset billing details and cart
        setBillingDetails({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          address: "",
          city: "",
          region: "",
          postcode: "",
          notes: "",
        });
        resetCart();
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };
  
  const CustomToast = () => (
    <div>
      Checkout successful!
      <br />
      Thank you for your order.
      <br />
      We'll send a confirmation email shortly.
    </div>
  );

  return (
    <>
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center my-8">Checkout</h1>
      <form
        onSubmit={handleCheckout}
        className="flex flex-col md:flex-row p-4 gap-4"
      >
        <div className="flex-1">
          <div className="p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Billing Details</h2>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={billingDetails.firstName}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={billingDetails.lastName}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  value={billingDetails.email}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 w-full"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone (Required)"
                  value={billingDetails.phone}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>
              <input
                type="text"
                name="company"
                placeholder="Company Name (Optional)"
                value={billingDetails.company}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={billingDetails.address}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Town / City"
                value={billingDetails.city}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                required
              />
              <div className="flex space-x-4">
                <select
                  name="region"
                  value={billingDetails.region}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 w-full"
                  required
                >
                  <option value="">Select Region</option>
                  <option value="punjab">Punjab</option>
                  <option value="sindh">Sindh</option>
                  <option value="kpk">KPK</option>
                  <option value="balochistan">Balochistan</option>
                </select>
                <input
                  type="text"
                  name="postcode"
                  placeholder="Postcode / Zip"
                  value={billingDetails.postcode}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 w-full"
                  required
                />
              </div>
              <textarea
                name="notes"
                placeholder="Notes about your order, e.g., special notes for delivery."
                value={billingDetails.notes}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                rows="7"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="p-4 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Your Order</h2>
            <div className="bg-gray-100 p-4 mb-4">
              {Object.entries(cartItems).map(([id, quantity]) => {
                if (quantity > 0) {
                  const product = all_products.find(
                    (product) => product.id === Number(id)
                  );
                  return (
                    <div
                      key={id}
                      className="flex items-center mb-4 justify-between"
                    >
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
              <div className="flex justify-between">
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
              <button
                type="submit"
                className="mt-4 w-full bg-[#005F93] hover:bg-[#005173] text-white font-bold py-2 px-4 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Checkout;
