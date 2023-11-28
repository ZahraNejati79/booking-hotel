import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  Link,
  NavLink,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaRegBookmark } from "react-icons/fa6";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const dateOpenRef = useRef();
  const navigate = useNavigate();
  useOutsideClick(dateOpenRef, "date", () => setOpenDate(false));
  const handleOptions = (name, operation) => {
    setOptions((preve) => {
      return {
        ...preve,
        [name]:
          operation === "decrement" ? options[name] - 1 : options[name] + 1,
      };
    });
  };
  const handleSearch = () => {
    setSearchParams({ date, options, destination });
    const encodeParams = createSearchParams({
      date: JSON.stringify(date),
      options: JSON.stringify(options),
      destination: destination,
    });
    // setSearchParams(encodeParams);
    navigate({ pathname: "hotels", search: encodeParams.toString() });
  };
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            type="text"
            name="destination"
            id="destination"
            placeholder="where to go?"
            className="headerSearchInput"
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div
            id="date"
            className="dateDropDown"
            onClick={() => setOpenDate(!openDate)}
          >
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <div ref={dateOpenRef}>
              <DateRange
                ranges={date}
                onChange={(item) => setDate([item.selection])}
                className="date"
              />
            </div>
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div onClick={() => setOpenOption(!openOption)} id="optionDropDown">
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {openOption && (
            <GuestOptionList
              options={options}
              handleOptions={handleOptions}
              setOpenOption={setOpenOption}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
        <div className="headerSearchItem">
          <Link to="/bookmark">
            <button className="headerSearchBtn">
              <FaRegBookmark className="headerIcon" />
            </button>
          </Link>
        </div>
      </div>
      <User />
    </div>
  );
};

export default Header;

function GuestOptionList({ options, handleOptions, setOpenOption }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, "optionDropDown", () => setOpenOption(false));
  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        handleOptions={handleOptions}
        options={options}
        type="adult"
        minLimit="1"
      />
      <OptionItem
        handleOptions={handleOptions}
        options={options}
        type="children"
        minLimit="0"
      />
      <OptionItem
        handleOptions={handleOptions}
        options={options}
        type="room"
        minLimit="1"
      />
    </div>
  );
}
function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, "decrement")}
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
        >
          <HiMinus />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "increment")}
          className="optionCounterBtn"
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}

function User() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  if (isAuthenticated)
    return (
      <button onClick={handleLogout} className="button">
        Logout
      </button>
    );
  return <NavLink to="/login">Login</NavLink>;
}
