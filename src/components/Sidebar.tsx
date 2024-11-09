import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faDiscord,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import SidebarSkeleton from "./SidebarSkeleton";

interface User {
  login: string;
  avatar_url: string;
  bio: string;
}

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const Sidebar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  useThemeContext();
  const location = useLocation();
  const { isDarkMode } = useThemeContext();

  const isSmallScreen = useMediaQuery("(max-width: 1550px)");

  useEffect(() => {
    const loadUser = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(
          "https://api.github.com/users/eemirmutlu",
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );

        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return <SidebarSkeleton />;
  }

  const handleProfileClick = () => {
    window.open(`https://github.com/${user.login}`, "_blank");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "11fr 1fr",
        backgroundColor: isDarkMode ? "#1E1B29" : "white",
        paddingTop: "32px",
      }}
    >
      <Box
        sx={{
          width: isSmallScreen ? 200 : 320,
          height: "100vh",
          padding: 0,
          backgroundColor: isDarkMode ? "#1E1B29" : "white",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "24px",
            backgroundColor: isDarkMode ? "rgb(128, 0, 128, .2)" : "purple", // 128 0 128
          }}
          onClick={handleProfileClick}
        >
          <Tooltip title={user.login}>
            <Avatar
              alt={user.login}
              src={user.avatar_url}
              sx={{
                width: isSmallScreen ? 50 : 100,
                height: isSmallScreen ? 50 : 100,
                marginBottom: 2,
                border: isDarkMode
                  ? "5px solid rgb(128, 0, 128, .2)"
                  : "5px solid white",
              }}
            />
          </Tooltip>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginLeft: 2, fontSize: isSmallScreen ? "16px" : "" }}
          >
            {user.login ? user.login : "Undefined"}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color: "white",
            borderRadius: location.pathname === "/" ? "0px 0px 12px 0px" : "",
            backgroundColor: isDarkMode ? "rgb(128, 0, 128, .2)" : "purple", // 128 0 128
            padding: "24px",
          }}
        >
          {user.bio || "No bio available"}
        </Typography>
        <Button
          className={
            location.pathname === "/"
              ? isDarkMode
                ? "dark-mode-active"
                : "active"
              : ""
          }
          onClick={() => handleNavigate("/")}
          sx={{
            width: "100%",
            height: "96px",
            textAlign: "left",
            color: "white",
            backgroundColor: isDarkMode ? "rgb(128, 0, 128, .2)" : "purple",
            borderRadius:
              location.pathname === "/projects" ? "0px 0px 12px 0px" : "",
            transition: "background-color linear 0.2s",
          }}
          disableRipple
        >
          Home
        </Button>
        <Button
          className={
            location.pathname === "/projects"
              ? isDarkMode
                ? "dark-mode-active"
                : "active"
              : ""
          }
          onClick={() => handleNavigate("/projects")} 
          sx={{
            width: "100%",
            height: "96px",
            textAlign: "left",
            color: "white",
            backgroundColor: isDarkMode ? "rgb(128, 0, 128, .2)" : "purple",
            transition: "background-color linear 0.2s",
            borderRadius: location.pathname === "/" ? "0px 12px 0px 0px" : "",
          }}
          disableRipple
        >
          Projects
        </Button>

        <Box
          height={"100%"}
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-evenly",
            backgroundColor: isDarkMode ? "rgb(128, 0, 128, .2)" : "purple",
            padding: "50px",
            borderRadius: location.pathname === "/projects" ? "0px 12px 0px 0px" : "",
          }}
        >
          <Tooltip title="Github">
            <a
              href="https://github.com/eemirmutlu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faGithub}
                size={isSmallScreen ? "1x" : "2x"}
                color="white"
              />
            </a>
          </Tooltip>
          <Tooltip title="Discord">
            <a
              href="https://discord.com/invite/eemirmutlu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faDiscord}
                size={isSmallScreen ? "1x" : "2x"}
                color="white"
              />
            </a>
          </Tooltip>
          <Tooltip title="Instagram">
            <a
              href="https://www.instagram.com/eemirmutlu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size={isSmallScreen ? "1x" : "2x"}
                color="white"
              />
            </a>
          </Tooltip>
          <Tooltip title="LinkedIn">
            <a
              href="https://www.linkedin.com/in/eemirmutlu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                size={isSmallScreen ? "1x" : "2x"}
                color="white"
              />
            </a>
          </Tooltip>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: isDarkMode ? "rgb(128, 0, 128, .2)" : "purple", // 128 0 128
            color: isDarkMode ? "white" : "black",
            padding: "16px",
            fontSize: "12px",
          }}
        >
          <Typography fontSize={isSmallScreen ? '8px' : '12px'} color='rgb(255,255,255,.5)'>
            Copyright © 2024, Emir Mutlu, All rights reserved.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "64px",
          borderRadius: "24px 0px 0px 0px",
          backgroundColor: "white",
          minHeight: "100vh",
        }}
      ></Box>
    </Box>
  );
};

export default Sidebar;
