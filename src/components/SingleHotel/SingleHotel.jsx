import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";

const SingleHotel = () => {
  const { id } = useParams();

  const { currentHotel, isHotelLoading, getCurrentHotel } = useHotels();

  useEffect(() => {
    getCurrentHotel(id);
  }, [id]);

  if (isHotelLoading) return <Loader />;
  return (
    <div className="room ">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} review &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
};

export default SingleHotel;
