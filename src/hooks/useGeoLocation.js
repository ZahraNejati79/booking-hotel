import { useState } from "react";

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPositin] = useState({});
  const [error, setError] = useState(null);

  function getGeoLocation() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPositin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
        console.log("pos get");
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
        console.log("error get");
      }
    );
  }

  return { getGeoLocation, isLoading, position, error };
}
