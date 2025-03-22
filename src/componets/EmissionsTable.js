import React, { useState, useEffect } from "react";
import emissionData from "../emissionData.json"; // Assuming the JSON file is in the same directory

const EmissionTable = () => {
  const [highestEmissions, setHighestEmissions] = useState([]);

  // Function to calculate the highest emissions
  const calculateHighestEmissions = () => {
    const areas = [
      "Transportation", "OnRoadGasoline", "OnRoadDistillate", "OnRoadCNGandOther", "Aviation",
      "Marine", "RailDistillate", "Buildings", "Residential", "Commercial", "FuelBasedIndustrial", "Electricity", "Landfills", "TotalGrossEmissions", "Sequestered", "TotalNetEmissions"
    ];

    let highest = [];

    areas.forEach(area => {
      const maxEmission = Math.max(...emissionData[area]);
      const yearIndex = emissionData[area].indexOf(maxEmission);
      highest.push({
        area,
        year: emissionData["Year"][yearIndex],
        emission: maxEmission
      });
    });

    setHighestEmissions(highest);
  };

  useEffect(() => {
    calculateHighestEmissions();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-s-lg">
              Area
            </th>
            <th scope="col" className="px-6 py-3">
              Year
            </th>
            <th scope="col" className="px-6 py-3 rounded-e-lg">
              Highest Emission
            </th>
          </tr>
        </thead>
        <tbody>
          {highestEmissions.map((item, index) => (
            <tr key={index} className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.area}
              </td>
              <td className="px-6 py-4">{item.year}</td>
              <td className="px-6 py-4">{item.emission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmissionTable;
