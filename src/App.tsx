import React from "react";
import { ThemeProviderComponent } from "./contexts/ThemeContext";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Helmet } from "react-helmet";

const App: React.FC = () => {
  // Determine if the screen width is less than 1024px
  const isSmallScreen = useMediaQuery("(max-width:1024px)");

  const pageTitle = location.pathname === "/projects" ? "Projects" : "Error";

  return (
    <ThemeProviderComponent>
      <Router>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "rgb(0, 0, 0, .6)" : "white",
            borderRadius: "24px 0px 0px 0px",
            margin: 0,
            padding: 0,
            left: 0,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isSmallScreen ? "1fr" : "2fr 10fr",
            }}
          >
            {!isSmallScreen && (
              <Box>
                <Sidebar />
              </Box>
            )}
            <Box
              component="main"
              sx={{
                padding: 0,
                margin: 0,
                minHeight: "100vh",
              }}
            >
              {isSmallScreen && <Navbar />}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </Box>
            {isSmallScreen ? <Footer /> : ""}
          </Box>
        </Box>
      </Router>
    </ThemeProviderComponent>
  );
};

export default App;
