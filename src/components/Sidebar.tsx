import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button, Tooltip, useMediaQuery } from "@mui/material";
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

  const isSmallScreen = useMediaQuery('(max-width: 1440px)')

  // const clickSound = new Audio("../public/click2.mp3");

  // const playClickSound = () => {
  //   clickSound.play();
  // };

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
    // playClickSound()
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "11fr 1fr",
        backgroundColor: "purple",
        paddingTop: "32px",
      }}
    >
      <Box
        sx={{
          width: isSmallScreen ? 240 : 320,
          height: "100vh",
          padding: 0,
          backgroundColor: "white",
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
            backgroundColor: "purple",
          }}
          onClick={handleProfileClick}
        >
          <Tooltip title={user.login}>
            <Avatar
              alt={user.login}
              src={user.avatar_url}
              sx={{
                width: isSmallScreen ? 60 : 100,
                height: isSmallScreen ? 60 : 100,
                marginBottom: 2,
                border: "5px solid white",
              }}
            />
          </Tooltip>
          <Typography variant="h6" gutterBottom sx={{ marginLeft: 2 }}>
            {user.login ? user.login : 'Undefined'}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color: "white",
            borderRadius: location.pathname === "/" ? "0px 0px 12px 0px" : "",
            backgroundColor: "purple",
            padding: "24px",
          }}
        >
          {user.bio || "No bio available"}
        </Typography>
        <Button
          className={location.pathname === "/" ? "active" : ""}
          onClick={() => handleNavigate("/")}
          sx={{
            width: "100%",
            height: "96px",
            textAlign: "left",
            color: "white",
            backgroundColor: "purple",
            borderRadius:
              location.pathname === "/projects" ? "0px 0px 12px 0px" : "",
            transition: "background-color linear 0.2s",
            ":hover": {
              backgroundColor:
                location.pathname === "/projects" ? "purple" : "white",
              color: location.pathname === "/projects" ? "white" : "purple",
            },
          }}
          disableRipple
        >
          Home
        </Button>
        <Button
          className={location.pathname === "/projects" ? "active" : ""}
          onClick={() => handleNavigate("/projects")}
          sx={{
            width: "100%",
            height: "96px",
            textAlign: "left",
            color: "white",
            backgroundColor: "purple",
            transition: "background-color linear 0.2s",
            borderRadius: location.pathname === "/" ? "0px 12px 0px 0px" : "",
            ":hover": {
              backgroundColor: location.pathname === "/" ? "purple" : "white",
              color: location.pathname === "/" ? "white" : "purple",
            },
          }}
          disableRipple
        >
          Projects
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "purple",
            borderRadius:
              location.pathname === "/projects" ? "0px 12px 0px 0px" : "",
            height: "24px",
          }}
        >
          {/* <Typography
            variant="body2"
            sx={{ mr: 1, color: "white", display: "none" }}
          >
            Dark Mode
          </Typography>
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            inputProps={{ "aria-label": "dark mode toggle" }}
            sx={{ display: "none" }}
          /> */}
        </Box>
        <Box
          height={"100%"}
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-evenly",
            backgroundColor: "purple",
            padding: "50px",
          }}
        >
          <Tooltip title="Github">
            <a
              href="https://github.com/eemirmutlu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" color="white" />
            </a>
          </Tooltip>
          <Tooltip title="Discord">
            <a
              href="https://discord.com/invite/eemirmutlu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faDiscord} size="2x" color="white" />
            </a>
          </Tooltip>
          <Tooltip title="Instagram">
            <a
              href="https://www.instagram.com/eemirmutlu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" color="white" />
            </a>
          </Tooltip>
          <Tooltip title="LinkedIn">
            <a
              href="https://www.linkedin.com/in/eemirmutlu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" color="white" />
            </a>
          </Tooltip>
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
