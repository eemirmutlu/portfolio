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
  useMediaQuery,
} from "@mui/material";
import ProjectViewer from "../components/ProjectViewer";
import ErrorPage from "../components/ErrorPage";
import { Helmet } from "react-helmet";
import { useThemeContext } from "../contexts/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

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
  const isSmallScreen = useMediaQuery("(max-width:500px)");
  const [isNotFound, setIsNotFound] = useState(false);

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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Helmet>
        <title>
          {selectedRepo
            ? `${selectedRepo.name} • Emir Mutlu`
            : isLoading
            ? "Loading..."
            : "Projects • Emir Mutlu"}
        </title>
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
          <>
            <IconButton
              onClick={toggleDarkMode}
              sx={{
                position: "absolute",
                top: isSmallScreen ? 100 : 16,
                right: 16,
              }}
            >
              {isDarkMode ? (
                <LightModeIcon sx={{ color: "#fff" }} />
              ) : (
                <DarkModeIcon sx={{ color: "purple" }} />
              )}
            </IconButton>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: isDarkMode ? "white" : "purple",
              }}
            >
              My Projects
            </Typography>
          </>
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
                        sx={{
                          mb: 2,
                          color: isDarkMode ? "#ffffff" : "#000000",
                        }}
                      >
                        {repo.description || "No description available"}
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
