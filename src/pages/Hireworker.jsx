
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Labour from "../images/labour.jpeg"
import Mason from "../images/mason.jpeg"
import Carpenter from "../images/carpentar.png"
import Plumber from "../images/Plumbers.jpeg"
import Welder from "../images/Welding.avif"
import Electrition from "../images/electrician.jpeg"
import BuildingVideo3 from "../../public/videos/video4.mp4";

const Hireworker = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null); 
  const productsSectionRef = useRef(null); // Reference to the products section this  useref use for scroll
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const workers = [
    { id: 'labour', image: Labour, title: 'Labour', cost: 1500, description: 'Strong, reliable support for various tasks on site.' },
    { id: 'mason', image: Mason, title: 'Mason', cost: 4000, description: 'Expert in building with bricks and concrete blocks.' },
    { id: 'carpenter', image: Carpenter, title: 'Carpenter', cost: 800, description: 'Skilled in woodworking and structure crafting.' },
    // { id: 'electrician', image: Electrician, title: 'Electrician', cost: 700, description: 'Handles electrical setups and maintenance.' },
    { id: 'plumber', image: Plumber, title: 'Plumber', cost: 700, description: 'Specializes in plumbing installations and repairs.' },
    { id: 'welder', image: Welder, title: 'Welder', cost: 700, description: 'Proficient in various welding techniques.' }
  ];

  const handleSelectWorker = (worker) => {
    setSelectedWorker(worker);
    navigate('/booking', { state: { worker } }); // Pass the worker data correctly
};
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setShowProducts(false); // Reset product visibility when city changes
  };

  const handleShowProducts = () => {
    if (selectedCity) {
      setShowProducts(true);
      setTimeout(() => {
        // Scroll to the products section after state update and component re-render
        productsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } else {
      alert('Please select a city first.');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">Hire worker</h1><br/>
        <div className="bg-white shadow-lg rounded-lg p-16 mt-10 flex flex-col md:flex-row items-center max-w-4xl w-full mx-4">
          <div className="space-y-4 md:w-1/2">
            <p className="text-lg text-[#005173] font-bold">Get verified construction workers on your projects</p>
            <p>Access local construction workers in your area today!</p>
            <select className="border border-gray-300 rounded p-2 w-full" onChange={handleCityChange}>
              <option value="">Select City</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
            </select>
            <button className=" bg-[#005F93] hover:bg-[#005173] text-white font-bold py-2 px-4 rounded w-full" onClick={handleShowProducts}>
              General Labour
            </button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 md:ml-6">
            <video className="h-full rounded-lg w-full object-cover" autoPlay loop muted>
            <source src={BuildingVideo3} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Select City to find Worker</h1>
        <h1 className="text-3xl">General Labour</h1>
      </div>
      
      {showProducts && (
        <section ref={productsSectionRef} id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {workers.map(worker => (
            <div key={worker.id} onClick={() => handleSelectWorker(worker)} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
              <img src={worker.image} alt={worker.title} className="h-80 w-72 object-cover rounded-t-xl" />
              <div className="px-4 py-3 w-72">
                <p className="text-lg font-bold text-black truncate block capitalize">{worker.title}</p>
                <span className="text-gray-400 mr-3 uppercase text-xs">{worker.description}</span>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">Rs.{worker.cost}</p>
                  <p className="text-sm text-gray-600 cursor-auto ml-2">/day</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default Hireworker;

