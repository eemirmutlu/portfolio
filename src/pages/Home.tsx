import React, { useState, useEffect } from "react";
import { Button, Typography, Container, useMediaQuery } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";
import DocumentViewer from "../components/DocumentViewer";
import HomeSkeleton from "../components/HomeSkeleton"; // Import the skeleton
import { Helmet } from "react-helmet";
import SkillCard from "../components/SkillCard";

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
  const { isDarkMode } = useThemeContext();
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
        bgcolor: isDarkMode ? "rgb(0, 0, 0, .0)" : "white",
        color: isDarkMode ? "#ffffff" : "#000000",
        padding: 4,
      }}
    >
      <Helmet>
        <title>{isLoading ? "Loading..." : "Home • Emir Mutlu"}</title>
      </Helmet>
      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              borderRight: "3px solid",
              animation: "blink 0.75s step-end infinite",
              color: "purple",
              fontSize: isSmallScreen ? "20px" : "50px",
            }}
          >
            {displayText}
          </Typography>

          <Typography
            variant="h5"
            sx={{ mb: 2, fontSize: isSmallScreen ? "15px" : "30px" }}
          >
            Hello, I'm Emir. Let me introduce myself. I was born in{" "}
            <b>Turkey</b> in 2003, and I am currently interested in{" "}
            <b>software development</b>. My hobbies include watching movies and
            following sports like football and basketball, as well as
            participating in them. Right now, I'm working as a front-end
            developer at a software company in the city where I live. Thanks to
            my team, I'm aiming to improve myself and eventually take on roles
            in larger companies and bigger projects. At the same time, I’m
            continuing my education at Uludağ University, studying Econometrics.
            In addition to the skills I've gained from my degree, I’ve taught
            myself JavaScript and started focusing on front-end development.
            Writing front-end code gives me a lot of joy, and I want to dedicate
            myself to this field as I continue to grow and develop
            professionally. I am proficient in both <b>English</b> and{" "}
            <b>Turkish</b>, and I can speak both languages fluently.
          </Typography>

          <Button
            variant="contained"
            onClick={handleOpenViewer}
            sx={{
              mb: 4,
              backgroundColor: "purple",
              borderRadius: "30px",
              color: "#ffffff",
              fontWeight: "bold",
              padding: "12px 24px",
              textTransform: "none",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              ":hover": {
                backgroundColor: "purple",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                transform: "scale(1.05)",
              },
              ":active": {
                backgroundColor: "purple",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              },
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
          <Container
            sx={{
              bgcolor: isDarkMode ? "rgb(0, 0, 0, .0)" : "white",
              color: isDarkMode ? "#ffffff" : "#000000",
              padding: 4,
            }}
          >
            <Helmet>
              <title>{isLoading ? "Loading..." : "Home • Emir Mutlu"}</title>
            </Helmet>
            {isLoading ? (
              <HomeSkeleton />
            ) : (
              <>
                <Typography variant="h4" sx={{ marginBottom: 4 }}>
                  My Skills
                </Typography>

                {skills.map((skill, index) => (
                  <SkillCard
                    key={index}
                    name={skill.name}
                    level={skill.level}
                    description={skill.description}
                  />
                ))}
              </>
            )}
          </Container>
        </>
      )}
    </Container>
  );
};

export default Home;
