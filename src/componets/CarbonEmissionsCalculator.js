import React, { useState } from 'react';

const API_KEY = 'AIzaSyA4v2c4lXsn5wj-hW7zh3zJVN_r4XW2IRs'; // Replace with your Google Maps API key

const CarbonEmissionsCalculator = () => {
  const [startLat, setStartLat] = useState('');
  const [startLng, setStartLng] = useState('');
  const [endLat, setEndLat] = useState('');
  const [endLng, setEndLng] = useState('');
  const [realTimeTravelTime, setRealTimeTravelTime] = useState('');
  const [bestPossibleTime, setBestPossibleTime] = useState('');
  const [co2Emissions, setCo2Emissions] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const calculateTravelTime = async () => {
    if (!startLat || !startLng || !endLat || !endLng) {
      setError('Please enter valid coordinates for both start and end points.');
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${endLat},${endLng}&mode=driving&departure_time=now&traffic_model=best_guess&key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes.length === 0) {
        setError('No route found!');
        return;
      }

      const realTime = data.routes[0].legs[0].duration_in_traffic.text;
      setRealTimeTravelTime(realTime);

      const bestTime = data.routes[0].legs[0].duration.text;
      setBestPossibleTime(bestTime);

      const realTimeInMinutes = parseTimeToMinutes(realTime);
      const bestTimeInMinutes = parseTimeToMinutes(bestTime);
      const distanceInKm = data.routes[0].legs[0].distance.value / 1000;

      const co2Emission = calculateCO2Emissions(realTimeInMinutes, bestTimeInMinutes, distanceInKm);
      setCo2Emissions(`${co2Emission.toFixed(2)} grams`);
    } catch (err) {
      setError('Error fetching directions data!');
    }
  };

  const parseTimeToMinutes = (time) => {
    const timeArr = time.split(' ');
    let minutes = 0;

    timeArr.forEach((t, index) => {
      if (t.includes('hour')) {
        minutes += parseInt(timeArr[index - 1]) * 60;
      } else if (t.includes('min')) {
        minutes += parseInt(timeArr[index - 1]);
      }
    });

    return minutes;
  };

  const calculateCO2Emissions = (realTimeMinutes, bestTimeMinutes, distanceInKm) => {
    const emissionsPerKm = 107;
    const trafficDelayFactor = realTimeMinutes / bestTimeMinutes;

    const totalEmissionRealTime = emissionsPerKm * distanceInKm * trafficDelayFactor;
    const totalEmissionBestTime = emissionsPerKm * distanceInKm;
    const emissionDifference = totalEmissionRealTime - totalEmissionBestTime;

    return emissionDifference;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">Carbon Emissions and Travel Time Calculator</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600">Start Latitude</label>
            <input
              type="number"
              value={startLat}
              onChange={(e) => handleInputChange(e, setStartLat)}
              placeholder="Start Latitude"
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Start Longitude</label>
            <input
              type="number"
              value={startLng}
              onChange={(e) => handleInputChange(e, setStartLng)}
              placeholder="Start Longitude"
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">End Latitude</label>
            <input
              type="number"
              value={endLat}
              onChange={(e) => handleInputChange(e, setEndLat)}
              placeholder="End Latitude"
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">End Longitude</label>
            <input
              type="number"
              value={endLng}
              onChange={(e) => handleInputChange(e, setEndLng)}
              placeholder="End Longitude"
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={calculateTravelTime}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Calculate
          </button>
        </div>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {realTimeTravelTime && (
          <div className="mt-6 bg-gray-50 p-4 rounded-md shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700">Results:</h2>
            <p className="text-gray-600">Real-Time Travel Time (with Traffic): {realTimeTravelTime}</p>
            <p className="text-gray-600">Best Possible Time (no traffic): {bestPossibleTime}</p>
            <p className="text-gray-600">CO2 Emission Difference: {co2Emissions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonEmissionsCalculator;
