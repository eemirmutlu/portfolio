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
import NavbarSkeleton from "./NavbarSkeleton";

interface User {
  login: string;
  avatar_url: string;
  bio: string;
}

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useThemeContext();
  const location = useLocation();
  const isSmallScreen = useMediaQuery("(max-width:450px)");
  // const clickSound = new Audio("../public/click.mp3");

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
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  if (isLoading) {
    return <NavbarSkeleton />;
  }

  const handleProfileClick = () => {
    window.open(`https://github.com/${user?.login}`, "_blank");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    // playClickSound()
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: "99",
        backgroundColor: 'white'
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          paddingBottom: "10px",
          paddingTop: "10px",
          paddingLeft: "10px",
          width: "100%",
          height: "100%",
          borderRadius: location.pathname === "/" ? "0px 0px 24px 0px" : "",
          backgroundColor: "purple",
        }}
        onClick={handleProfileClick}
      >
        <Tooltip title={user?.login || ""} sx={{ padding: "10px" }}>
          <Avatar
            alt={user?.login || ""}
            src={user?.avatar_url || ""}
            sx={{
              width: 70,
              height: 70,
              border: "5px solid white",
            }}
          />
        </Tooltip>
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginLeft: 2, color: "white" }}
          >
            {user?.login}
          </Typography>
          <Typography
            sx={{
              marginLeft: 2,
              color: "white",
              fontSize: isSmallScreen ? "10px" : "15px",
            }}
          >
            {user?.bio}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Button
          className={location.pathname === "/" ? "active" : ""}
          onClick={() => handleNavigate("/")}
          sx={{
            width: "100%",
            height: 100,
            textAlign: "left",
            color: "white",
            backgroundColor: "purple",
            borderRadius:
              location.pathname === "/projects" ? "0px 0px 24px 0px" : "",
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
            height: 100,
            textAlign: "left",
            color: "white",
            backgroundColor: "purple",
            transition: "background-color linear 0.2s",
            borderRadius: location.pathname === "/" ? "0px 0px 0px 24px" : "",
            ":hover": {
              backgroundColor: location.pathname === "/" ? "purple" : "white",
              color: location.pathname === "/" ? "white" : "purple",
            },
          }}
          disableRipple
        >
          Projects
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
