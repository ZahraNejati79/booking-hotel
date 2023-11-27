import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../context/BookmarkListProvider";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

const AddNewBookmark = () => {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoLocatin, setIsLoadingGeoLocation] = useState(false);
  const [geoLocationError, setGeoLocationError] = useState(null);
  const { postBookmark: createNewBookmark } = useBookmarks();

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchLocationData() {
      setIsLoadingGeoLocation(true);
      setGeoLocationError(false);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "this location isn't a city. please click somewhere else"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoLocationError(error.message);
      } finally {
        setIsLoadingGeoLocation(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const submitHandle = (e) => {
    e.preventDefault();
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    createNewBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoLocatin) return <Loader />;
  if (geoLocationError)
    return <div>this location isn't a city. please click somewhere else</div>;
  return (
    <form onSubmit={submitHandle} className="form">
      <div className="formControl">
        <label htmlFor="cityName" className="cityName">
          CityName
        </label>
        <input
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          type="text"
          name="cityName"
          className="cityName"
        />
      </div>
      <div className="formControl">
        <label htmlFor="country" className="country">
          Country
        </label>
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          type="text"
          name="country"
          className="country"
        />
        <ReactCountryFlag className="flag" svg countryCode={countryCode} />
      </div>

      <div className="buttons">
        <button
          className="btn back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; back
        </button>
        <button type="submit" className="btn btn--primary">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddNewBookmark;
