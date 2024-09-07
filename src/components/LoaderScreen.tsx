import React, { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { Container, Typography, useMediaQuery } from "@mui/material";

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150; // Speed of typing effect
  const deletingSpeed = 75; // Speed of deleting effect
  const pauseDuration = 1000; // Pause duration between typing and deleting

  useEffect(() => {
    if (isDeleting) {
      if (index > 0) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        const timeout = setTimeout(() => setIndex(0), pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else {
      if (index < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(true);
        const timeout = setTimeout(() => setIndex(text.length), pauseDuration);
        return () => clearTimeout(timeout);
      }
    }
  }, [index, isDeleting, text, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <Typography variant="h6" sx={{ mb: 2, color: "purple" }}>
      {displayText}
    </Typography>
  );
};

const LoaderScreen: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width:1024px)");

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "white",
        textAlign: "center",
      }}
    >
      <Triangle
        visible={true}
        height={isSmallScreen ? "150" : "300"}
        width={isSmallScreen ? "150" : "300"}
        color="purple"
        ariaLabel="triangle-loading"
        wrapperClass=""
      />
      <TypewriterText text="Loading Page..." />
    </Container>
  );
};

export default LoaderScreen;
