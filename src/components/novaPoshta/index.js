import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from 'react-select';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet.awesome-markers";


const NovaPoshtaPage = () => {
  const apiKey = '63aa362a44e812e38243bd8fb803b606';

  const [areas, setAreas] = useState([]);
  const [cities, setCities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const mapRef = useRef(null);
  const markersRef = useRef([]);


  useEffect(() => {
    displayMap([]);
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      const areasData = await getAreas(apiKey);
      setAreas(areasData);
    }
    fetchAreas();
  }, []);

  useEffect(() => {
    if (selectedArea) {
      const fetchCities = async () => {
        const citiesData = await getCities(selectedArea.Ref);
        setCities(citiesData);
      }
      fetchCities();
    }
  }, [selectedArea]);

  useEffect(() => {
    if (selectedCity) {
      const fetchWarehouses = async () => {
        const warehousesData = await getWarehouses(selectedCity.Ref);
        setWarehouses(warehousesData);
        displayMap(warehousesData);
      }
      fetchWarehouses();
    }
  }, [selectedCity]);

  const getAreas = async () => {
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

  const getCities = async (areaRef) => {
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

  const getWarehouses = async (cityRef) => {
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

  const displayMap = (warehouses) => {
    if (mapRef.current) mapRef.current.remove();

    const map = L.map('map').setView([48.3794, 31.1656], 6);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

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

      marker.on('click', () => { zoom(warehouse); });

      markers.addLayer(marker);
      markersRef.current.push({ marker: marker, ref: warehouse.Ref });
    });

    map.addLayer(markers);
  }

  const zoom = i => {
    const marks = markersRef.current.find(m => m.ref === i.Ref);
    if (marks) mapRef.current.flyTo(marks.marker.getLatLng(), 15);
  };

  const style = {
    control: (s) => ({
      ...s,
      width: 290,
      marginLeft: 10
    }),
  };

  return (
    <div>
      <h1 className="mt-4">Get data from Nova Post</h1>

      <div className={'d-flex mt-4'}>
        <div className={`d-flex align-items-center  ${selectedArea ? 'd-flex me-5' : ''}`}>
          <em><strong>Select Area:</strong></em>
          <Select
            value={selectedArea == null ? "" : selectedArea}
            onChange={(selectedOption) => {
              setSelectedArea(selectedOption);
              setSelectedCity(null);
            }}
            getOptionLabel={option => option.Description}
            getOptionValue={option => option.Ref}
            options={areas}
            styles={style}
          />
        </div>

        {selectedArea && (
          <div className="d-flex align-items-center flex-fill">
            <em><strong>Select City:</strong></em>
            <Select
              value={selectedCity == null ? "" : selectedCity}
              onChange={(i) => {
                setSelectedCity(i);
              }}
              getOptionLabel={option => option.Description}
              getOptionValue={option => option.Ref}
              options={cities}
              styles={style}
            />
          </div>

        )}
        {selectedCity && (
          <div className="d-flex align-items-center">
            <em><strong>Select Warehouse:</strong></em>
            <Select
              getOptionLabel={option => option.Description}
              getOptionValue={option => option.Ref}
              options={warehouses}
              styles={style}
              onChange={(i) => zoom(i)}
            />
          </div>
        )}
      </div>

      <div id="map" style={{ height: "490px", marginTop: "20px", zIndex: 0 }}></div>
    </div>
  );
};

export default NovaPoshtaPage;
