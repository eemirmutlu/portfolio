import React from "react";
import {
  Box,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import { useLocation } from "react-router-dom";

const NavbarSkeleton: React.FC = () => {
  const location = useLocation();
  const isSmallScreen = useMediaQuery("(max-width:450px)");

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
        backgroundColor: "unset",
        height: "100px",
        padding: "10px",
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
          borderRadius: location.pathname === "/" ? "0px 0px 24px 0px" : "",
          backgroundColor: "unset",
        }}
      >
        <Skeleton
          variant="circular"
          width={70}
          height={70}
          sx={{ border: "5px solid white" }}
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
      <Box sx={{ display: "flex" }}>
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
