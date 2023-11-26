import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProviter from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";

function App() {
  return (
    <HotelsProviter>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
      </Routes>
    </HotelsProviter>
  );
}

export default App;
