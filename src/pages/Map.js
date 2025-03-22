import React, { useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Navbar from "../componets/Navbar";
import CarbonEmissionsCalculator from "../componets/CarbonEmissionsCalculator";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// New Jersey Coordinates
const center = {
  lat: 40.7128, // Latitude for New Jersey
  lng: -74.0060, // Longitude for New Jersey
};

function Map() {
  const mapRef = useRef(null);  // Reference for the map instance

  useEffect(() => {
    if (mapRef.current) {
      // Create the Traffic Layer when the map is loaded
      const trafficLayer = new window.google.maps.TrafficLayer();
      // Set the traffic layer on the map
      trafficLayer.setMap(mapRef.current);
    }
  }, []);

  return (
    <>
      <Navbar />
      <LoadScript googleMapsApiKey="AIzaSyA4v2c4lXsn5wj-hW7zh3zJVN_r4XW2IRs">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* You can add other map components or markers here */}
        </GoogleMap>
      </LoadScript>
      <div className="container mx-auto p-4">
        <CarbonEmissionsCalculator />
      </div>
    </>

  );
}

export default Map;
