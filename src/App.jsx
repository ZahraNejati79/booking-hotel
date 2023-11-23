import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProviter from "./components/context/HotelsProvider";

function App() {
  return (
    <HotelsProviter>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotel" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<div>selected hotel</div>} />
        </Route>
      </Routes>
    </HotelsProviter>
  );
}

export default App;
