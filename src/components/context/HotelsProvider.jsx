import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";

function HotelsProviter({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const [currentHotel, setCurrentHotel] = useState({});
  const [isLoadingHotel, setIsLoadingHotel] = useState(false);
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
    //name_like or location_like , ...
  );
  async function getCurrentHotel(id) {
    setIsLoadingHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingHotel(false);
    } catch (error) {
      console.log(error.message);
      setIsLoadingHotel(false);
    }
  }
  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        currentHotel,
        isLoadingHotel,
        getCurrentHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}
export default HotelsProviter;

export function useHotels() {
  return useContext(HotelContext);
}
