import React, { useState, useEffect } from 'react';
import Navbar from '../componets/Navbar';
import mapImage from '../img/map.png';
import EmissionsTable from '../componets/EmissionsTable';

function Home() {
  // State for CO2 emission and carbon emission value
  const [co2, setCo2] = useState(21);
  const [carbonEmission, setCarbonEmission] = useState(getRandomCarbonEmission());

  // Function to generate a random fluctuation and apply it to CO2
  function getRandomCarbonEmission() {
    return (Math.random() * (0.010 - 0.001) + 0.001).toFixed(5); // Random value with 5 decimal places
  }

  // Effect to update CO2 and carbon emission periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // Adding the random fluctuation to the CO2 value
      const fluctuation = parseFloat(getRandomCarbonEmission());
      setCo2(prevCo2 => (21 + fluctuation).toFixed(4)); // Update CO2 with fluctuation

      setCarbonEmission(fluctuation.toFixed(5)); // Update carbon emission value
    }, 1000); // Update every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <>
      <div className="bg-gray-50 h-screen">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold">Welcome to Urban Pulse</h1>
        </div>
        <div className="container mx-auto p-4">
          {/* Wrapper for the first two components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <span className="text-2xl font-semibold">Gas emission</span> <br />
              <span className="text-3xl text-gray-500">{co2}% </span> <span className='text-sm text-bold text-green-600'>increase</span> {/* Dynamic CO2 percentage */}
              <br></br>
              <a to="/">
                <h5 className="mb-2 text-sm tracking-tight text-gray-900">
                  <b>Fun Fact</b> A fascinating fact about carbon emissions is that food production accounts for a significant portion, with a study suggesting it contributes to 83% of carbon emissions each year, including methane released by livestock
                </h5>

              </a>

              <a to="/" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                View insights
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                </svg>
              </a>
            </div>
            <div
              className="relative w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
              style={{
                backgroundImage: `url(${mapImage})`, // Replace with your image path
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div> {/* Black overlay */}
              <div className="relative z-10 text-left text-white">
                <h2 className="text-3xl font-bold">Map </h2>
                <a to="/map" className="inline-flex font-medium items-center text-white hover:underline">
                View map Calculator
                <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                </svg>
              </a>
              </div>
            </div>
          </div>

        </div>
        

        <div className="container mx-auto p-4">
              <EmissionsTable />
        </div>
      </div>
    </>
  );
}

export default Home;
