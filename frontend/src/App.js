import React, { useState } from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users";
import Invoices from "./scenes/invoices";
import Items from "./scenes/items";
import Bar from "./scenes/bar";
import AddUser from "./scenes/addUser";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import {CssBaseline, Switch, ThemeProvider} from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import ItemList from "./scenes/ItemList";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (

      <ColorModeContext.Provider value={colorMode}>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/shop" element={<ItemList />} />
          </Routes>
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/items" element={<Items />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/edit-user" element={<AddUser />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
             </Routes>
            </main>
          </div>


        </ThemeProvider>
      </ColorModeContext.Provider>

  );
}

export default App;