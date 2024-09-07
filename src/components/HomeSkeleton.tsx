import React from "react";
import { Box, Card, CardContent, Skeleton, useMediaQuery } from "@mui/material";

const HomeSkeleton: React.FC = () => {
  const isSmallScreen = useMediaQuery("(min-width: 450px)");
  const isMidScreen = useMediaQuery("(min-width: 850px)");

  const customWidth = () => {
    if (isMidScreen) {
      return 900;
    } else if (isSmallScreen) {
      return 600;
    } else {
      return 300; // Default value for smaller screens
    }
  };

  const renderSkeletonCard = () => (
    <Card
      sx={{
        width: customWidth(),
        marginBottom: 2,
        padding: 2,
      }}
    >
      <CardContent>
        {/* Simulating the skill card layout */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          {/* Placeholder for the icon */}
          <Skeleton
            variant="circular"
            width={24}
            height={24}
            sx={{ marginRight: 1 }}
            animation="wave"
          />
          {/* Placeholder for the card title */}
          <Skeleton variant="text" width={150} height={30} animation="wave" />
        </Box>
        {/* Placeholder for the progress bar */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height={10}
          sx={{ borderRadius: 5, marginY: 1 }}
          animation="wave"
        />
        {/* Placeholder for the description */}
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
      <Skeleton
        variant="text"
        width={customWidth()} // Correct invocation
        height={50}
        animation={"wave"}
      />
      <Skeleton
        variant="text"
        width={customWidth()}
        height={40}
        sx={{ marginY: 2 }}
        animation={"wave"}
      />
      <Skeleton
        variant="rectangular"
        width={customWidth()}
        height={300}
        sx={{ borderRadius: 1 }}
        animation={"wave"}
      />
      <Skeleton
        variant="rectangular"
        width={isSmallScreen ? 600 : 100}
        height={50}
        sx={{ marginY: 2, borderRadius: 1 }}
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
        {/* Skeleton for the main header */}
        <Skeleton
          variant="text"
          width={customWidth()}
          height={50}
          animation={"wave"}
          sx={{ marginBottom: 4 }}
        />

        {/* Rendering multiple skeleton cards */}
        {Array.from({ length: 4 }).map((_, index) => (
          <React.Fragment key={index}>{renderSkeletonCard()}</React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default HomeSkeleton;
