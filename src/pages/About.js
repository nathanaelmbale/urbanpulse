import React, { useState, useEffect } from 'react';
import Navbar from '../componets/Navbar';
import emissionData from '../emissionData.json'; // Update path as needed

function About() {
  const [highestEmissions, setHighestEmissions] = useState([]);
  const [emissionPercentages, setEmissionPercentages] = useState([]);

  // Function to calculate the highest emissions
  const calculateHighestEmissions = () => {
    const areas = [
      'Transportation', 'OnRoadGasoline', 'OnRoadDistillate', 'OnRoadCNGandOther', 'Aviation',
      'Marine', 'RailDistillate', 'Buildings', 'Residential', 'Commercial', 'FuelBasedIndustrial', 'Electricity', 'Landfills', 'TotalGrossEmissions', 'Sequestered', 'TotalNetEmissions'
    ];

    let highest = [];
    let totalEmissions = 0;

    areas.forEach(area => {
      const maxEmission = Math.max(...emissionData[area]);
      const yearIndex = emissionData[area].indexOf(maxEmission);
      highest.push({
        area,
        year: emissionData['Year'][yearIndex],
        emission: maxEmission
      });
      totalEmissions += maxEmission;
    });

    setHighestEmissions(highest);

    // Calculate emission percentages
    const percentages = highest.map(item => ({
      area: item.area,
      percentage: ((item.emission / totalEmissions) * 100).toFixed(2) // Calculate percentage
    }));

    setEmissionPercentages(percentages);
  };

  useEffect(() => {
    calculateHighestEmissions();
  }, []);

  return (
    <>
      <Navbar />
      <div className='container mx-auto p-4'>
        <h3 className='text-3xl font-bold mb-4'>Energy Consumption Tracker</h3>

        {/* Table for Highest Emissions */}
        <div className="relative overflow-x-auto mb-8">
          <h4 className="text-2xl  mb-4">Highest Emissions by Area</h4>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">Area</th>
                <th scope="col" className="px-6 py-3">Year</th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">Highest Emission</th>
              </tr>
            </thead>
            <tbody>
              {highestEmissions.map((item, index) => (
                <tr key={index} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.area}
                  </td>
                  <td className="px-6 py-4">{item.year}</td>
                  <td className="px-6 py-4 text-red-500">{item.emission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table for Emission Percentages */}
        <div className="relative overflow-x-auto">
          <h4 className="text-2xl mb-4">Emission Percentage by Area</h4>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">Area</th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">Emission Percentage (%)</th>
              </tr>
            </thead>
            <tbody>
              {emissionPercentages.map((item, index) => (
                <tr key={index} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.area}
                  </td>
                  <td className="px-6 py-4">{item.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default About;
