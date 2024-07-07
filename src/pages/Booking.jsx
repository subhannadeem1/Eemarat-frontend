import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const location = useLocation();
  const worker = location.state?.worker;

  // Redirect or show an error if worker data is not passed
  if (!worker) {
    return (
      <div>No worker data available. Please go back and select a worker.</div>
    );
  }

  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    specificArea: "",
    address: "",
    note: "",
  });
  const [numLaborers, setNumLaborers] = useState(1);
  const [totalCost, setTotalCost] = useState(worker.cost);
  const [areaOptions, setAreaOptions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  
    if (name === 'city') {
      if (value === 'Lahore') {
        setAreaOptions(['Wapda Town','Green Town','Dha Rahbar','Model Town', 'Johar Town','Engineer Town', 'Eithad Town','Valancia', 'TownShip']);
      } else if (value === 'Islamabad') {
        setAreaOptions(['F-6', 'F-7', 'G-11']);
      } else {
        setAreaOptions([]);
      }
    }
  };
  

  const handleNumLaborersChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumLaborers(num);
    setTotalCost(num * worker.cost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Form with:", customerDetails, numLaborers, totalCost);
  
    const CustomToast = () => (
      <div>
        Thanks for booking!<br/>
        Your booking is completed.<br/>
        We'll send a confirmation email shortly.
      </div>
    );
  
    toast.success(<CustomToast />, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setCustomerDetails({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        city: "",
        specificArea: "",
        address: "",
        note: "",
      });
    
      setNumLaborers(1);  // Resets the number of laborers to 1
      setTotalCost(worker.cost);  // Resets the total cost to the cost for one laborer
    
  };

  return (
    <>
    <ToastContainer />
    <div className="flex justify-center items-center space-x-4 p-10">
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold">Enter Your Details</h2>
          <div className="flex flex-wrap -mx-2">
            <div className="px-2 w-1/2">
              <input
                type="text"
                name="firstName"
                value={customerDetails.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border p-2 rounded-lg w-full mb-4"
                required
              />
            </div>
            <div className="px-2 w-1/2">
              <input
                type="text"
                name="lastName"
                value={customerDetails.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border p-2 rounded-lg w-full mb-4"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="px-2 w-1/2">
              <input
                type="text"
                name="email"
                value={customerDetails.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="border p-2 rounded-lg w-full mb-4"
                required
              />
            </div>
            <div className="px-2 w-1/2">
              <input
                type="text"
                name="phoneNumber"
                value={customerDetails.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="border p-2 rounded-lg w-full mb-4"
                required
              />
            </div>
          </div>

          <select
  name="city"
  value={customerDetails.city}
  onChange={handleInputChange}
  className="border p-2 rounded-lg w-full mb-4"
  required
>
  <option value="" disabled>Select City</option>
  <option value="Lahore">Lahore</option>
  <option value="Islamabad">Islamabad</option>
</select>

{customerDetails.city && (
  <select
    name="specificArea"
    value={customerDetails.specificArea}
    onChange={handleInputChange}
    className="border p-2 rounded-lg w-full mb-4"
    required
  >
    <option value="" disabled>Select Area</option>
    {areaOptions.map((area, index) => (
      <option key={index} value={area}>{area}</option>
    ))}
  </select>
)}

          <input
            type="text"
            name="address"
            value={customerDetails.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="border p-2 rounded-lg w-full mb-4"
            required
          />

          <textarea
            name="note"
            value={customerDetails.note}
            onChange={handleInputChange}
            placeholder="Notes/Details"
            className="border p-2 w-full mb-4"
            rows="4"
          ></textarea>

          <button type="submit" className="mt-4 w-full bg-[#005F93] hover:bg-[#005173] text-white font-bold py-2 px-4 rounded-lg">
            Submit Booking
          </button>
          
        </form>
      </div>
      <div className="flex-1 ">
        <div className="p-5 border bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-bold">Booking Details</h2>
          <br />
          <p className="mb-3">
            <strong>Worker:</strong> {worker.title}
          </p>
          <div className="flex justify-between mt-4 font-bold">
            <p className="mb-3">
              <strong>Cost per Day:</strong>
            </p>
            <p> Rs.{worker.cost}</p>
          </div>
          <p className="space-x-4">
            <strong>Number of Laborers:</strong>
            <select
              value={numLaborers}
              onChange={handleNumLaborersChange}
              className="ml-2 border p-1 w-20 rounded-lg"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </p>

          <div className="flex justify-between mt-4 font-bold">
            <p>
              <strong>Total Cost:</strong>
            </p>
            <p> Rs.{totalCost}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Booking;
