import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const HotelContext = createContext();
function HotelsProviter({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data: hotels } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
    //name_like or location_like , ...
  );
  return (
    <HotelContext.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelContext.Provider>
  );
}
export default HotelsProviter;

export function useHotels() {
  return useContext(HotelContext);
}
