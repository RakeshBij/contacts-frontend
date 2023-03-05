import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Contact } from "./Contact";
import { Contacts } from "./Contacts";
import { Signup } from "./Signup";
import Cookies from "js-cookie";

const PublicRoute = ({ children }) => {
  const token = Cookies.get("token");
  return token ? <Navigate to="/contacts" /> : children;
};
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  return !token ? <Navigate to="/" /> : <>{children}</>;
};

function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts/:id"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
