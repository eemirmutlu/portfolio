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
        border: (theme) => `2px solid ${theme.palette.primary.main}`,
        borderRadius: "12px",
        boxShadow: 3,
        backgroundColor: (theme) => theme.palette.background.paper,
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
        ReadMe.md
      </Typography>
      <Box
        component="div"
        sx={{
          "& .ql-editor": {
            fontFamily: "Roboto, sans-serif",
            fontSize: "16px",
            color: (theme) => theme.palette.text.primary,
            lineHeight: "1.6",
          },
          "& .ql-toolbar": {
            display: "none",
          },
          minHeight: "300px",
          overflow: "auto",
        }}
      >
        asdasda
      </Box>
    </Box>
  );
};

export default RichTextViewer;
