import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users";
import Invoices from "./scenes/invoices";
import Items from "./scenes/items";
import AddUser from "./scenes/addUser";
import AddItem from "./scenes/addItem";
import Login from "./scenes/login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ItemList from "./scenes/ItemList";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/dashboard");
    }
  }, [location.pathname, navigate]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <>
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/items" element={<Items />} />
                      <Route path="/invoices" element={<Invoices />} />
                      <Route path="/add-user" element={<AddUser />} />
                      <Route path="/add-item" element={<AddItem />} />
                      <Route path="/edit-user" element={<AddUser />} />
                    </Routes>
                  </main>
                </>
              }
            />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
