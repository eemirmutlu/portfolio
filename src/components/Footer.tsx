import { faDiscord, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <Box
        height={"100%"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "purple",
          padding: '50px'
        }}
      >
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
      </Box>
    </>
  );
};

export default Footer;
