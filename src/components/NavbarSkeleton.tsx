import React from "react";
import {
  Box,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";

const NavbarSkeleton: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width:450px)");
  const {isDarkMode} = useThemeContext();


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: "99",
        // backgroundColor: "unset",
        bgcolor: isDarkMode ? '#1E1B29' : 'unset',
        height: "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          paddingBottom: "10px",
          paddingTop: "10px",
          paddingLeft: "10px",
          width: "100%",
          height: "100%",
          backgroundColor: "unset",
        }}
      >
        <Skeleton
          variant="circular"
          width={70}
          height={70}
          sx={{ border: "5px solid #1E1B29" }}
        />
        <Box sx={{ marginLeft: 2 }}>
          <Skeleton variant="text" width={100} height={30} />
          <Skeleton
            variant="text"
            width={isSmallScreen ? 60 : 120}
            height={20}
            sx={{ marginTop: 1 }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", paddingRight: 1 }}>
        <Skeleton
          variant="rectangular"
          width={70}
          height={30}
          sx={{ marginRight: 1,borderRadius: '20px' }}
        />
        <Skeleton variant="rectangular" width={70} height={30} sx={{ borderRadius: '20px' }}/>
      </Box>
    </Box>
  );
};

export default NavbarSkeleton;
