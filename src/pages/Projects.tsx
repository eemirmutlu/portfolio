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
} from "@mui/material";
import ProjectViewer from "../components/ProjectViewer";
import ErrorPage from "../components/ErrorPage";
import { Helmet } from "react-helmet";

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

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        // Simulate a delay
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
        }, 1000); // 1000ms delay
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadRepositories();
  }, []);

  const handleOpenViewer = (repo: Repository) => {
    setSelectedRepo(repo);
  };

  const handleCloseViewer = () => {
    setSelectedRepo(null);
  };

  if (hasError) {
    return <ErrorPage />;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, mb: 4, bgcolor: theme.palette.background.default }}
    >
      <Helmet>
        <title>{isLoading ? "Loading..." : "Projects • Emir Mutlu"}</title>
      </Helmet>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        {isLoading ? (
          <Skeleton
            variant="text"
            sx={{
              fontSize: "2rem",
              width: "50%", // Daha dar bir görünüm
              margin: "0 auto",
              height: "2.5rem", // Daha kalın
              display: "inline-block",
            }}
          />
        ) : (
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", color: "purple" }}
          >
            My Projects
          </Typography>
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
                    boxShadow:
                      "15px 15px 30px #bebebe, -15px -15px 30px #ffffff",
                    backgroundColor: "rgb(255,255,255, .8)",
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
                    boxShadow:
                      "15px 15px 30px #bebebe, -15px -15px 30px #ffffff",
                    backgroundColor: "rgb(255,255,255, .8)",
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
                        <Avatar sx={{ backgroundColor: "purple", mr: 2 }}>
                          {repo.name[0].toUpperCase()}
                        </Avatar>
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          {repo.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {repo.description || "No description available"}
                      </Typography>
                      <Box>
                        <Chip
                          label="GitHub Repository"
                          color="primary"
                          size="small"
                          sx={{
                            backgroundColor: "purple",
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
        />
      )}
    </Container>
  );
};

export default Projects;
