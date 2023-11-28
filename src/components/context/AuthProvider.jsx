import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const AuthContext = createContext();
const initilState = {
  user: null,
  isAuthenticated: false,
};
const FACE_USER = {
  firstName: "zahra",
  lastName: "Nejati",
  email: "nejati@gmail.com",
  password: "4444",
};
function authReducer(state, { type, payload }) {
  switch (type) {
    case "login":
      return { isAuthenticated: true, user: payload };
    case "logout":
      return { isAuthenticated: false, user: null };
    default:
      throw new Error("Unknow action!");
  }
}
export default function AuthProvider({ children }) {
  function login(user) {
    // if (user.password === FACE_USER.password && user.email === FACE_USER.email)
    dispatch({ type: "login", payload: user });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initilState
  );
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
