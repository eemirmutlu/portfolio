import React, { useEffect, useState } from "react";
import { fetchRepositories } from "../services/githubService";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Grid,
  useTheme,
  Chip,
  Box,
  Avatar,
  Skeleton,
  IconButton,
  Stack,
  MenuItem,
  Popover,
} from "@mui/material";
import ProjectViewer from "../components/ProjectViewer";
import ErrorPage from "../components/ErrorPage";
import { Helmet } from "react-helmet";
import { useThemeContext } from "../contexts/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { LanguageOutlined } from "@mui/icons-material";
import { useLanguageContext } from "../contexts/LanguageContext";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
}

const Projects: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [hasError, setHasError] = useState(false);
  const theme = useTheme();
  const { isDarkMode, toggleDarkMode } = useThemeContext();
  const [isNotFound, setIsNotFound] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { language, toggleLanguage } = useLanguageContext();

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        setTimeout(async () => {
          try {
            const repos = await fetchRepositories();
            setRepositories(repos);
          } catch (error) {
            console.error("Error fetching repositories:", error);
            setHasError(true);
          } finally {
            setIsLoading(false);
          }
        }, 1000);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadRepositories();
  }, []);

  useEffect(() => {
    if (selectedRepo) {
      const iframeUrl = `https://eemirmutlu.github.io/${selectedRepo.name}`;
      checkIframeUrl(iframeUrl);
    }
  }, [selectedRepo]);

  const handleOpenViewer = (repo: Repository) => {
    setSelectedRepo(repo);
  };

  const checkIframeUrl = async (url: string) => {
    try {
      const response = await fetch(url, { method: "GET" });
      setIsNotFound(response.status === 404);
      console.log(response);
    } catch (error) {
      console.error("Error checking iframe URL:", error);
      setIsNotFound(false);
    }
  };

  const handleCloseViewer = () => {
    setSelectedRepo(null);
  };

  if (hasError) {
    return <ErrorPage />;
  }

  const handleLanguageChange = (lang: string) => {
    if (lang !== language) {
      toggleLanguage();
    }
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Helmet>
        <title>
          {selectedRepo
            ? `${selectedRepo.name} • Emir Mutlu`
            : isLoading
            ? "Loading... | Emir Mutlu"
            : "Projeler • Emir Mutlu"}
        </title>

        <meta
          name="description"
          content={
            selectedRepo
              ? `Projelerimden biri olan ${selectedRepo.name}. Ayrıntılar ve kaynak kodları için tıklayın. Yazılım geliştirme ve frontend projeleri hakkında bilgi edinin.`
              : "Emir Mutlu'nun yazılım geliştirme projelerini keşfedin. React, frontend, yazılım mühendisliği konularında deneyimlerimi ve projelerimi burada bulabilirsiniz."
          }
        />

        <meta
          name="keywords"
          content="Emir Mutlu, yazılım geliştirici, frontend geliştirici, yazılım mühendisliği, React projeleri, yazılım projeleri, yazılım portföyü, Emir Mutlu projeleri, frontend projeleri, yazılım mühendisliği projeleri"
        />

        <meta
          property="og:title"
          content={
            selectedRepo
              ? `${selectedRepo.name} • Emir Mutlu`
              : "Projeler • Emir Mutlu"
          }
        />
        <meta
          property="og:description"
          content={
            selectedRepo
              ? `Projelerimden biri olan ${selectedRepo.name}. Ayrıntılar ve kaynak kodları için tıklayın. Yazılım geliştirme projeleri hakkında bilgi edinin.`
              : "Emir Mutlu'nun yazılım geliştirme projeleri hakkında bilgi edinin. Frontend, React, yazılım mühendisliği ve daha fazlası."
          }
        />
        <meta property="og:image" content="/logo2.png" />
        <meta
          property="og:url"
          content={
            selectedRepo
              ? `https://emirmutlu.me/projects/${selectedRepo.id}`
              : "https://emirmutlu.me/projects"
          }
        />
        <meta property="og:type" content="website" />

        <meta
          name="twitter:title"
          content={
            selectedRepo
              ? `${selectedRepo.name} • Emir Mutlu`
              : "Projeler • Emir Mutlu"
          }
        />
        <meta
          name="twitter:description"
          content={
            selectedRepo
              ? `Projelerimden biri olan ${selectedRepo.name}. Ayrıntılar ve kaynak kodları için tıklayın.`
              : "Emir Mutlu'nun yazılım geliştirme projeleri hakkında bilgi edinin. React ve frontend geliştirme konularındaki projelerimi keşfedin."
          }
        />
        <meta name="twitter:image" content="/logo2.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="theme-color" content="#000000" />
        <meta property="og:site_name" content="Emir Mutlu" />
      </Helmet>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        {isLoading ? (
          <>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Skeleton
                variant="rectangular"
                width={40}
                height={40}
                sx={{
                  width: "100%",
                  position: "",
                  top: 0,
                  right: 0,
                  borderRadius: "50%",
                  alignSelf: "flex-end",
                }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                sx={{
                  fontSize: "2rem",
                  width: "50%",
                  margin: "0 auto",
                  height: "2.5rem",
                  display: "inline-block",
                }}
              />
            </Box>
          </>
        ) : (
          <Stack
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box></Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: isDarkMode ? "white" : "purple",
              }}
            >
              {language === "tr" ? "Projelerim" : "My Projects"}
            </Typography>
            <Box>
              <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                <LanguageOutlined
                  sx={{ color: isDarkMode ? "#fff" : "purple" }}
                />
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
              <IconButton onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <LightModeIcon sx={{ color: "#fff" }} />
                ) : (
                  <DarkModeIcon sx={{ color: "purple" }} />
                )}
              </IconButton>
            </Box>
          </Stack>
        )}
      </Box>
      <Grid container spacing={4}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={12} md={12} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: `15px 15px 30px ${
                      isDarkMode ? "#1E1B29" : "#bebebe"
                    }, -15px -15px 30px ${isDarkMode ? "#1E1B29" : "#ffffff"}`,
                    backgroundColor: isDarkMode
                      ? "#1E1B29"
                      : "rgb(255,255,255, .8)",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box sx={{ ml: 2, flex: 1 }}>
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1.5rem" }}
                          />
                          <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem", mt: 1 }}
                          />
                        </Box>
                      </Box>
                      <Skeleton variant="rectangular" height={118} />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          : repositories.map((repo) => (
              <Grid item xs={12} sm={12} md={12} key={repo.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: `15px 15px 30px ${
                      isDarkMode ? "#1E1B29" : "#bebebe"
                    }, -15px -15px 30px ${isDarkMode ? "#1E1B29" : "#ffffff"}`,
                    backgroundColor: isDarkMode
                      ? "#1E1B29"
                      : "rgb(255,255,255, .8)",
                    borderRadius: 2,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    overflow: "hidden",
                    ":hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardActionArea
                    disableRipple
                    onClick={() => handleOpenViewer(repo)}
                    sx={{
                      flexGrow: 1,
                      ":hover": {
                        backgroundColor: theme.palette.action.hover,
                        color: theme.palette.text.primary,
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Avatar
                          sx={{
                            backgroundColor: isDarkMode ? "#660081" : "purple",
                            mr: 2,
                            color: "white",
                          }}
                        >
                          {repo.name[0].toUpperCase()}
                        </Avatar>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{
                            fontWeight: "bold",
                            color: isDarkMode ? "#ffffff" : "#000000",
                          }}
                        >
                          {repo.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        fontWeight="400"
                        sx={{
                          mb: 2,
                          color: isDarkMode
                            ? "rgb(255, 255, 255, .5)"
                            : "rgb(0, 0, 0, .7)",
                        }}
                      >
                        {repo.description || language === "tr"
                          ? "Açıklama bulunmuyor."
                          : "No description available."}
                      </Typography>
                      <Box>
                        <Chip
                          label="GitHub Repository"
                          color="primary"
                          size="small"
                          sx={{
                            backgroundColor: isDarkMode ? "#660081" : "purple",
                            color: "white",
                          }}
                        />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
      </Grid>

      {selectedRepo && (
        <ProjectViewer
          open={!!selectedRepo}
          onClose={handleCloseViewer}
          fileUrl={selectedRepo.html_url}
          repoName={selectedRepo.name}
          repoUrl={selectedRepo.html_url}
          isLoading={isLoading}
          iframeUrl={`https://eemirmutlu.github.io/${selectedRepo.name}`}
          isNotFound={isNotFound}
        />
      )}
    </Container>
  );
};

export default Projects;
