import { LuLoader2 } from "react-icons/lu";
const Loader = () => {
  return (
    <div
      style={{
        color: "var(--primary-600",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "1rem auto",
      }}
    >
      <p>Loading Data ...</p>
      <LuLoader2 style={{ width: "1.3rem" }} />
    </div>
  );
};

export default Loader;
