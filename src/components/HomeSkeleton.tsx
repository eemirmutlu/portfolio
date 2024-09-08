import React from "react";
import { Box, Card, CardContent, Skeleton, useMediaQuery } from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";

const HomeSkeleton: React.FC = () => {
  const isSmallScreen = useMediaQuery("(min-width: 450px)");
  const isMidScreen = useMediaQuery("(min-width: 1025px)");
  const { isDarkMode } = useThemeContext();

  const customWidth = () => {
    if (isMidScreen) {
      return 1000;
    } else if (isSmallScreen) {
      return 600;
    } else {
      return 300;
    }
  };

  const renderSkeletonCard = () => (
    <Card
      sx={{
        width: customWidth(),
        marginBottom: 2,
        backgroundColor: isDarkMode ? "rgb(0,0,0,.1)" : "",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Skeleton
            variant="circular"
            width={24}
            height={24}
            sx={{ marginRight: 1 }}
            animation="wave"
          />
          <Skeleton variant="text" width={150} height={30} animation="wave" />
        </Box>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={10}
          sx={{ borderRadius: 5, marginY: 1 }}
          animation="wave"
        />
        <Skeleton variant="text" width="50%" height={20} animation="wave" />
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        color: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Skeleton
          variant="rectangular"
          width={40}
          height={40}
          sx={{
            width: '100%',
            position: "",
            top: 0,
            right: 0,
            borderRadius: "50%",
            alignSelf: 'flex-end'
          }}
          animation="wave"
        />
        <Skeleton
          variant="text"
          width={"100%"}
          height={50}
          animation={"wave"}
        />
      </Box>
      <Skeleton
        variant="text"
        width={"100%"}
        height={40}
        sx={{ marginY: 2 }}
        animation={"wave"}
      />
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={isSmallScreen ? 400 : 300}
        sx={{ borderRadius: 1 }}
        animation={"wave"}
      />
      <Skeleton
        variant="rectangular"
        width={isSmallScreen ? 100 : 100}
        height={50}
        sx={{ marginY: 2, borderRadius: 9, alignSelf: "flex-start" }}
        animation={"wave"}
      />
      <Box
        sx={{
          color: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          paddingTop: 4,
        }}
      >
        <Skeleton
          variant="text"
          width={isSmallScreen ? 200 : 150}
          height={80}
          animation={"wave"}
          sx={{ marginBottom: 0, alignSelf: "flex-start" }}
        />

        {Array.from({ length: 6 }).map((_, index) => (
          <React.Fragment key={index}>{renderSkeletonCard()}</React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default HomeSkeleton;
