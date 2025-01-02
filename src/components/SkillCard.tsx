import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Collapse,
  Box,
  ButtonBase,
} from "@mui/material";
import { useThemeContext } from "../contexts/ThemeContext";
import { useLanguageContext } from "../contexts/LanguageContext";

const SkillCard: React.FC<{
  name: string;
  level: number;
  description: string;
}> = ({ name, level, description }) => {
  const { isDarkMode } = useThemeContext();
  const [open, setOpen] = useState(false);
  const { language } = useLanguageContext();

  const toggleDescription = () => {
    setOpen(!open);
  };

  return (
    <ButtonBase sx={{ width: "100%", textAlign: "left" }} disableRipple>
      <Card
        sx={{
          marginBottom: 2,
          bgcolor: isDarkMode
            ? open
              ? "#1E1B29"
              : "#1E1B29"
            : open
            ? "#f4f4f4"
            : "white", // Dark mode background
          color: isDarkMode ? "#ffffff" : "#000000", // Dark mode text color
          width: "100%",
        }}
        onClick={toggleDescription}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={open ? "/corner-left-up.svg" : "/corner-left-down.svg"}
              alt="toggle icon"
              style={{
                marginRight: 8,
                filter: isDarkMode ? "invert(1)" : "none", // Invert color for dark mode
              }}
            />
            <Typography
              variant="h6"
              sx={{ color: isDarkMode ? "#ffffff" : "#000000" }}
            >
              {name}
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={level}
            color="secondary"
            sx={{
              height: 10,
              borderRadius: 5,
              marginTop: 1,
              marginBottom: 1, // Dark mode progress bar background
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: isDarkMode ? "#bbbbbb" : "text.secondary" }}
          >
            {`${
              language === "tr"
                ? "Seviye"
                : language === "de"
                ? "Kompetenz"
                : "Proficiency"
            }: ${level}%`}
          </Typography>

          <Collapse in={open}>
            <Box sx={{ marginTop: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? "#cccccc" : "#000000" }} // Dark mode description text color
              >
                {description}
              </Typography>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

export default SkillCard;
