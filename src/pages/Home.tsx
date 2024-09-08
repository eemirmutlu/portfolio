import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Container,
  useMediaQuery,
  IconButton,
  Box,
} from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";
import DocumentViewer from "../components/DocumentViewer";
import HomeSkeleton from "../components/HomeSkeleton"; // Import the skeleton
import { Helmet } from "react-helmet";
import SkillCard from "../components/SkillCard";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const documentData = {
  title: "CV",
  url: "https://heyzine.com/flip-book/b19e5a6603.html",
};

const skills = [
  {
    name: "JavaScript",
    level: 70,
    description: "Experienced with ES6+ features and frameworks like React.",
  },
  {
    name: "React",
    level: 70,
    description: "Skilled in building responsive and dynamic UIs with React.",
  },
  {
    name: "TypeScript",
    level: 90,
    description:
      "Strong understanding of TypeScript's type system and tooling.",
  },
  {
    name: "CSS",
    level: 90,
    description: "Proficient in CSS, Sass, and responsive design techniques.",
  },
  {
    name: "Python",
    level: 60,
    description: "Good understanding of Python for backend and scripting.",
  },
  {
    name: "Visual Basic",
    level: 75,
    description:
      "Proficient in using Office programs effectively with Visual Basic.",
  },
];

const Home: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  const [openViewer, setOpenViewer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width:500px)");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [speed] = useState(200);

  const staticText = "H";
  const dynamicText = "ello Welcome to my Portfolio";

  useEffect(() => {
    const handleType = () => {
      setDisplayText(
        staticText +
          (isDeleting
            ? dynamicText.substring(0, titleIndex - 1)
            : dynamicText.substring(0, titleIndex + 1))
      );
      setTitleIndex(isDeleting ? titleIndex - 1 : titleIndex + 1);

      if (!isDeleting && titleIndex === dynamicText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && titleIndex === 0) {
        setIsDeleting(false);
      }
    };

    const typingTimeout = setTimeout(handleType, speed);

    return () => clearTimeout(typingTimeout);
  }, [titleIndex, isDeleting, speed]);

  useEffect(() => {
    const loadDocument = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    loadDocument();
  }, []);

  const handleOpenViewer = () => {
    setOpenViewer(true);
  };

  const handleCloseViewer = () => {
    setOpenViewer(false);
  };

  return (
    <Container
      sx={{
        width: "100%",
        bgcolor: isDarkMode ? "#1E1B29" : "#ffffff",
        color: isDarkMode ? "#E0E0E0" : "#000000",
        padding: 2,
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Helmet>
        <title>{isLoading ? "Loading..." : "Home • Emir Mutlu"}</title>
      </Helmet>

      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <>
          <IconButton
            onClick={toggleDarkMode}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1,
            }}
          >
            {isDarkMode ? (
              <LightModeIcon sx={{ color: "#fff" }} />
            ) : (
              <DarkModeIcon sx={{ color: "purple" }} />
            )}
          </IconButton>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              borderRight: "3px solid",
              animation: "blink 0.75s step-end infinite",
              color: isDarkMode ? "#4C4A7E" : "#6A61A1", // Dark navy or purple
              fontSize: isSmallScreen ? "1.5rem" : "2.5rem",
              width: "auto", // Center align text
              position: "relative", // Ensure proper positioning
              textAlign: "start",
            }}
          >
            {displayText}
            {/* Placeholder for the blinking cursor effect */}
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: "0",
                height: "100%",
                borderRight: "3px solid",
                animation: "blink 0.75s step-end infinite",
              }}
            />
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: isSmallScreen ? "1rem" : "1.25rem",
              width: "100%",
              paddingX: isSmallScreen ? 2 : 0,
            }}
          >
            Hello, I'm Emir. Let me introduce myself. I was born in{" "}
            <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>Turkey</b>{" "}
            in 2003, and I am currently interested in{" "}
            <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>
              software development
            </b>
            . My hobbies include watching movies and following sports like
            football and basketball, as well as participating in them. Right
            now, I'm working as a front-end developer at a software company in
            the city where I live. Thanks to my team, I'm aiming to improve
            myself and eventually take on roles in larger companies and bigger
            projects. At the same time, I’m continuing my education at Uludağ
            University, studying Econometrics. In addition to the skills I've
            gained from my degree, I’ve taught myself JavaScript and started
            focusing on front-end development. Writing front-end code gives me a
            lot of joy, and I want to dedicate myself to this field as I
            continue to grow and develop professionally. I am proficient in both{" "}
            <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>English</b>{" "}
            and{" "}
            <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>Turkish</b>
            , and I can speak both languages fluently.
          </Typography>

          <Button
            variant="contained"
            onClick={handleOpenViewer}
            sx={{
              mb: 4,
              backgroundColor: isDarkMode ? "#4C4A7E" : "#6A61A1", // Navy blue or purple
              borderRadius: "30px",
              color: "#ffffff",
              fontWeight: "bold",
              padding: "12px 24px",
              textTransform: "none",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              ":hover": {
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                transform: "scale(1.05)",
              },
              ":active": {
                backgroundColor: "#6A61A1",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              },
              alignSelf: "flex-start",
            }}
          >
            View CV
          </Button>

          <DocumentViewer
            title={documentData.title}
            url={documentData.url}
            open={openViewer}
            onClose={handleCloseViewer}
            fullScreen={!isSmallScreen ? true : false}
            isCanDownload={true}
          />

          {/* Skills Section */}
          <Container
            sx={{
              bgcolor: isDarkMode ? "#1E1B29" : "#ffffff",
              padding: 4,
              // maxWidth: "lg",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
              My Skills
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 2,
              }}
            >
              {skills.map((skill, index) => (
                <SkillCard
                  key={index}
                  name={skill.name}
                  level={skill.level}
                  description={skill.description}
                />
              ))}
            </Box>
          </Container>
        </>
      )}
    </Container>
  );
};

export default Home;
