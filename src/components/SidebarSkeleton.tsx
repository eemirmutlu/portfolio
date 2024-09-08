import React from "react";
import { Box, useMediaQuery, Skeleton } from "@mui/material";
import { Triangle } from "react-loader-spinner";
import { useThemeContext } from "../contexts/ThemeContext";

const SidebarSkeleton: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width:1024px)");
  const isMidScreen = useMediaQuery("(max-width:1550px)");
  const { isDarkMode } = useThemeContext();

  return (
    <Box
      sx={{
        width: isMidScreen ? 200 : 320,
        height: "100vh",
        backgroundColor: isDarkMode ? "#1E1B29" : "unset",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Triangle
        visible={true}
        height={isSmallScreen ? "150" : "300"}
        width={isSmallScreen ? "150" : "300"}
        color="purple"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />

      <Box
        sx={{
          width: isMidScreen ? 200 : 320,
          height: "100vh",
          padding: 0,
          backgroundColor: isDarkMode ? "#1E1B29" : "white",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "24px",
            backgroundColor: "unset",
          }}
        >
          <Skeleton variant="circular" width={isMidScreen ? 50 : 100} height={isMidScreen ? 50 : 100} />
          <Box sx={{ marginLeft: 2 }}>
            <Skeleton variant="text" width={isMidScreen ? 75 : 150} height={30} />
            <Skeleton variant="text" width={isMidScreen ? 75 : 150} height={30} sx={{ mt: 1 }} />
          </Box>
        </Box>
        <Box
          sx={{
            padding: "24px",
            backgroundColor: "unset",
            color: "white",
            flexGrow: 1,
          }}
        >
          <Skeleton variant="text" width="100%" height={80} />
          <Box sx={{ mt: 5 }}>
            <Skeleton variant="text" width="100%" height={96} sx={{}} />
            <Skeleton variant="text" width="100%" height={96} sx={{}} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "unset",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-evenly",
            backgroundColor: "unset",
            padding: 1,
          }}
        >
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="circular" width={30} height={30} />
          <Skeleton variant="circular" width={30} height={30} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "64px",
          borderRadius: "24px 0px 0px 0px",
          backgroundColor: "white",
          minHeight: "100vh",
        }}
      ></Box>
    </Box>
  );
};

export default SidebarSkeleton;
