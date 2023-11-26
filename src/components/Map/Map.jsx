import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotels } from "../context/HotelsProvider";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([51, 3]);
  const {
    getGeoLocation,
    isLoading: IsLoadingGeoLoacation,
    position: geoPosition,
  } = useGeoLocation();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition?.lat && geoPosition?.lng)
      setMapCenter([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button className="getLocation" onClick={getGeoLocation}>
          {IsLoadingGeoLoacation ? "Loading ..." : "Use Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
