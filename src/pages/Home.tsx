import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Container,
  useMediaQuery,
  IconButton,
  Box,
  MenuItem,
  Popover,
} from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";
import DocumentViewer from "../components/DocumentViewer";
import HomeSkeleton from "../components/HomeSkeleton";
import { Helmet } from "react-helmet";
import SkillCard from "../components/SkillCard";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { LanguageOutlined } from "@mui/icons-material";
import { useLanguageContext } from "../contexts/LanguageContext";

const documentData = {
  title: "CV",
  url: "https://heyzine.com/flip-book/b19e5a6603.html",
};

const skills = [
  {
    name: "JavaScript",
    level: 70,
    descriptionEn: "Experienced with ES6+ features and frameworks like React.",
    descriptionTr:
      "ES6+ özellikleri ve React gibi frameworklerle deneyimliyim.",
  },
  {
    name: "React",
    level: 70,
    descriptionEn: "Skilled in building responsive and dynamic UIs with React.",
    descriptionTr:
      "React ile duyarlı ve dinamik kullanıcı arayüzleri oluşturma konusunda yetenekliyim.",
  },
  {
    name: "TypeScript",
    level: 90,
    descriptionEn:
      "Strong understanding of TypeScript's type system and tooling.",
    descriptionTr:
      "TypeScript'in type sistemi ve araçları konusunda güçlü bir anlayışa sahibim.",
  },
  {
    name: "CSS",
    level: 90,
    descriptionEn: "Proficient in CSS, Sass, and responsive design techniques.",
    descriptionTr: "CSS, Sass ve duyarlı tasarım tekniklerinde yetkinim.",
  },
  {
    name: "Python",
    level: 60,
    descriptionEn: "Good understanding of Python for backend and scripting.",
    descriptionTr: "Backend ve Script yazımı için Python konusunda yetkinim.",
  },
  {
    name: "Visual Basic",
    level: 75,
    descriptionEn:
      "Proficient in using Office programs effectively with Visual Basic.",
    descriptionTr:
      "Visual Basic ile Office programlarını etkin bir şekilde kullanabilirim.",
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { language, toggleLanguage } = useLanguageContext();

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

  const handleLanguageChange = (lang: string) => {
    if (lang !== language) {
      toggleLanguage();
    }
    setAnchorEl(null);
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
        <title>
          {openViewer
            ? `${documentData.title} • Emir Mutlu`
            : isLoading
            ? "Loading... | Emir Mutlu"
            : "Ana Sayfa • Emir Mutlu"}
        </title>

        <meta
          name="description"
          content={
            openViewer
              ? `${documentData.title} belgesinin detayları. Emir Mutlu'nun yazılım geliştirme projeleri, yazılım mühendisliği, frontend geliştirme ve daha fazlası hakkında bilgi edinin.`
              : "Emir Mutlu'nun kişisel web sitesi. Yazılım geliştirme, frontend geliştirme, proje yönetimi ve yazılım mühendisliği hakkında daha fazla bilgi edinin."
          }
        />

        <meta
          name="keywords"
          content="Emir Mutlu, yazılım geliştirici, frontend geliştirici, yazılım mühendisliği, React projeleri, yazılım projeleri, yazılım portföyü, yazılım belgeleme, frontend projeleri, yazılım mühendisliği projeleri"
        />

        <meta
          property="og:title"
          content={
            openViewer
              ? `${documentData.title} • Emir Mutlu`
              : "Ana Sayfa • Emir Mutlu"
          }
        />
        <meta
          property="og:description"
          content={
            openViewer
              ? `${documentData.title} belgesinin detayları. Daha fazla bilgi edinmek için tıklayın.`
              : "Emir Mutlu'nun kişisel web sitesi. Yazılım projeleri, yazılım mühendisliği, frontend geliştirme ve daha fazlası hakkında bilgi edinin."
          }
        />
        <meta property="og:image" content="/logo2.png" />
        <meta
          property="og:url"
          content={
            openViewer
              ? `https://emirmutlu.me/viewer/${documentData.title}`
              : "https://emirmutlu.me"
          }
        />
        <meta property="og:type" content="website" />

        <meta
          name="twitter:title"
          content={
            openViewer
              ? `${documentData.title} • Emir Mutlu`
              : "Ana Sayfa • Emir Mutlu"
          }
        />
        <meta
          name="twitter:description"
          content={
            openViewer
              ? `${documentData.title} belgesinin detayları. Daha fazla bilgi edinmek için tıklayın.`
              : "Emir Mutlu'nun kişisel web sitesi. Yazılım projeleri, yazılım mühendisliği, frontend geliştirme ve daha fazlası hakkında bilgi edinin."
          }
        />
        <meta name="twitter:image" content="/logo2.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="theme-color" content="#000000" />
        <meta property="og:site_name" content="Emir Mutlu" />
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

          <IconButton
            onClick={(event) => setAnchorEl(event.currentTarget)}
            sx={{
              position: "absolute",
              top: 16,
              right: 56,
              zIndex: 1,
            }}
          >
            <LanguageOutlined sx={{ color: isDarkMode ? "#fff" : "purple" }} />
          </IconButton>

          <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleLanguageChange("en")}>
              English
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("tr")}>
              Türkçe
            </MenuItem>
          </Popover>
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
            {language === "tr" ? (
              <>
                Merhaba, ben Emir. Kendimi tanıtmama izin verin. 2003 yılında{" "}
                <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>
                  Türkiye'de
                </b>{" "}
                doğdum ve şu anda{" "}
                <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>
                  yazılım geliştirme
                </b>{" "}
                ile ilgileniyorum. Hobilerim arasında film izlemek ve futbol,
                basketbol gibi sporları takip etmek ve onlara katılmak da var.
                Şu anda yaşadığım şehirdeki bir yazılım şirketinde ön uç
                geliştiricisi olarak çalışıyorum. Takımım sayesinde kendimi
                geliştirmeyi ve sonunda daha büyük şirketlerde ve projelerde
                görev almayı hedefliyorum. Aynı zamanda Uludağ Üniversitesi'nde
                Ekonometrik alanında eğitimime devam ediyorum. Aldığım eğitimde
                kazandığım becerilerin yanı sıra, JavaScript’i kendi başıma
                öğrenip ön uç geliştirmeye odaklandım. Ön uç kodu yazmak bana
                büyük bir keyif veriyor ve bu alanda profesyonel olarak büyümeye
                ve gelişmeye devam ederken kendimi bu alana adamak istiyorum.
                Hem{" "}
                <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>
                  İngilizce
                </b>{" "}
                hem de{" "}
                <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>
                  Türkçe
                </b>{" "}
                dillerine hakimim ve her iki dili de akıcı bir şekilde
                konuşabiliyorum.
              </>
            ) : (
              <>
                Hello, I'm Emir. Let me introduce myself. I was born in{" "}
                <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>
                  Turkey
                </b>{" "}
                in 2003, and I am currently interested in{""}
                <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>
                  software development
                </b>{" "}
                . My hobbies include watching movies and following sports like
                football and basketball, as well as participating in them. Right
                now, I'm working as a front-end developer at a software company
                in the city where I live. Thanks to my team, I'm aiming to
                improve myself and eventually take on roles in larger companies
                and bigger projects. At the same time, I’m continuing my
                education at Uludağ University, studying Econometrics. In
                addition to the skills I've gained from my degree, I’ve taught
                myself JavaScript and started focusing on front-end development.
                Writing front-end code gives me a lot of joy, and I want to
                dedicate myself to this field as I continue to grow and develop
                professionally. I am proficient in both{" "}
                <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>
                  English
                </b>{" "}
                and{" "}
                <b style={{ color: isDarkMode ? "#6A61A1" : "#4C4A7E" }}>
                  Turkish
                </b>{" "}
                , and I can speak both languages fluently.
              </>
            )}
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
            {language === "tr" ? "CV Görüntüle" : "View CV"}
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
              bgcolor: isDarkMode ? "#1E1B29" : "#ffffff",
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
              {language === "tr" ? "Yeteneklerim" : "My Skills"}
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
                  description={
                    language === "tr"
                      ? skill.descriptionTr
                      : skill.descriptionEn
                  }
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
