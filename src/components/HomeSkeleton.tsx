import React from "react";
import { Box, Card, CardContent, Skeleton, useMediaQuery } from "@mui/material";

const HomeSkeleton: React.FC = () => {
  const isSmallScreen = useMediaQuery("(min-width: 450px)");
  const isMidScreen = useMediaQuery("(min-width: 1025px)");

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
        bgcolor: "white",
        color: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // minheight: "100vh",
      }}
    >
      <Skeleton variant="text" width={"100%"} height={50} animation={"wave"} />
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
          bgcolor: "white",
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
