// src/components/RichTextViewer.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface RichTextViewerProps {
  content: string;
  fullScreen: boolean;
}

const RichTextViewer: React.FC<RichTextViewerProps> = () => {
  return (
    <Box
      sx={{
        border: (theme) => `2px solid ${theme.palette.primary.main}`, // Purple border
        borderRadius: "12px", // Rounded corners
        boxShadow: 3, // Add some shadow
        backgroundColor: (theme) => theme.palette.background.paper, // Background color based on theme
        padding: 2, // Padding inside the container
        overflow: "hidden", // Hide overflow to keep the design neat
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
        ReadMe.md
      </Typography>
      <Box
        component="div"
        sx={{
          "& .ql-editor": {
            fontFamily: "Roboto, sans-serif", // Font for the editor
            fontSize: "16px", // Font size
            color: (theme) => theme.palette.text.primary, // Text color based on theme
            lineHeight: "1.6", // Line height for better readability
          },
          "& .ql-toolbar": {
            display: "none", // Hide the toolbar
          },
          minHeight: "300px",
          overflow: "auto",
        }}
      >asdasda</Box>
    </Box>
  );
};

export default RichTextViewer;
