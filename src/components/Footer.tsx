import React, { useState, useEffect } from "react";
import {
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Skeleton, Typography } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";

const Footer: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      height={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDarkMode ? "#1E1B38" : "purple",
        padding: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100%",
          marginBottom: "16px",
        }}
      >
        {isLoading ? (
          <>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </>
        ) : (
          <>
            <a
              href="https://github.com/eemirmutlu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="2x" color="white" />
            </a>
            <a
              href="https://discord.com/invite/eemirmutlu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faDiscord} size="2x" color="white" />
            </a>
            <a
              href="https://www.instagram.com/eemirmutlu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" color="white" />
            </a>
            <a
              href="https://www.linkedin.com/in/eemirmutlu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" color="white" />
            </a>
          </>
        )}
      </Box>
      <Typography
        variant="body2"
        sx={{ color: "rgb(255,255,255,.5)", textAlign: "center", marginTop: "16px" }}
      >
        Copyright © 2024, Emir Mutlu, All rights reserved
      </Typography>
    </Box>
  );
};

export default Footer;
