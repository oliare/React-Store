import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet.awesome-markers";

const NovaPoshtaPage = () => {
  const [areas, setAreas] = useState([]);
  const [cities, setCities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const apiKey = '63aa362a44e812e38243bd8fb803b606';

  useEffect(() => {
    displayMap([]);
  }, []);

  useEffect(() => {
    async function fetchAreas() {
      const areasData = await getAreas(apiKey);
      setAreas(areasData);
    }
    fetchAreas();
  }, []);

  useEffect(() => {
    if (selectedArea) {
      async function fetchCities() {
        const citiesData = await getCities(apiKey, selectedArea);
        setCities(citiesData);
      }
      fetchCities();
    }
  }, [selectedArea]);

  useEffect(() => {
    if (selectedCity) {
      async function fetchWarehouses() {
        const warehousesData = await getWarehouses(apiKey, selectedCity);
        setWarehouses(warehousesData);
        displayMap(warehousesData);
      }
      fetchWarehouses();
    }
  }, [selectedCity]);

  async function getAreas(apiKey) {
    try {
      const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
        apiKey: apiKey,
        modelName: "Address",
        calledMethod: "getAreas"
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  }

  async function getCities(apiKey, areaRef) {
    try {
      const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
        apiKey: apiKey,
        modelName: "Address",
        calledMethod: "getCities",
        methodProperties: {
          AreaRef: areaRef
        }
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  async function getWarehouses(apiKey, cityRef) {
    try {
      const response = await axios.post('https://api.novaposhta.ua/v2.0/json/', {
        apiKey: apiKey,
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityRef: cityRef
        }
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  }

  function displayMap(warehouses) {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = L.map('map').setView([48.3794, 31.1656], 6);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const markers = L.markerClusterGroup();

    warehouses.forEach(warehouse => {
      const statusEmoji = warehouse.WarehouseStatus === 'Working' ? "🟢" : "🔴";
      const popupContent = `<b>${warehouse.Description}</b><br>
                           <br><strong>Address:</strong> ${warehouse.ShortAddress}<br>
                           <strong>Status:</strong> ${warehouse.WarehouseStatus} ${statusEmoji}`;

      const marker = L.marker([warehouse.Latitude, warehouse.Longitude], {
        icon: L.AwesomeMarkers.icon({
          markerColor: "red",
        })
      }).bindPopup(popupContent);

      markers.addLayer(marker);
      markersRef.current.push(marker);
    });

    map.addLayer(markers);
  }
  
  return (
    <div>
      <h1 className="mt-4">Get data from Nova Poshta</h1>

      <div className="primary-button mt-4">
        <span>
          <em>Select Area:</em>
          <select onChange={(e) => setSelectedArea(e.target.value)} style={{ marginLeft: '10px' }}>
            <option value="">-- not selected</option>
            {areas.map(area => (
              <option key={area.Ref} value={area.Ref}>{area.Description}</option>
            ))}
          </select>
        </span>

        {selectedArea && (
          <span style={{ marginLeft: '20px' }}>
            <em>Select City:</em>
            <select onChange={(e) => setSelectedCity(e.target.value)} style={{ marginLeft: '10px' }}>
              <option value="">-- not selected</option>
              {cities.map(city => (
                <option key={city.Ref} value={city.Ref}>{city.Description}</option>
              ))}
            </select>
          </span>
        )}
        
      </div>

      <div id="map" style={{ height: "490px", marginTop: "20px" }}></div>
    </div>
  );
};

export default NovaPoshtaPage;
