// src/components/ErrorPage.tsx

import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
// import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  // const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(media-screen:500px)");

  // const handleGoBack = () => {
  //   navigate(-1);
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        bgcolor: "background.default",
        textAlign: "center",
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/5741/5741333.png"
        alt=""
        width={!isSmallScreen ? "125px" : ""}
      />
      <Typography fontFamily={"monospace"} variant="h4" component="h1" sx={{ mb: 2 }}>
        Oops! Something Went Wrong
      </Typography>
      <Typography fontFamily={"monospace"} variant="body1" sx={{ mb: 4 }}>
        We encountered an error while fetching the data. Please try again later.
      </Typography>
      {/* <Button
        variant="text"
        color="inherit"
        disableFocusRipple
        disableRipple
        disableElevation
        onClick={handleGoBack}
      >
        {`<- ${'GO BACK'}`}
      </Button> */}
    </Box>
  );
};

export default ErrorPage;
