import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotel" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<div>selected hotel</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
