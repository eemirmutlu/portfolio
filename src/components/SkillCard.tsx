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

// SkillCard component
const SkillCard: React.FC<{
  name: string;
  level: number;
  description: string;
}> = ({ name, level, description }) => {
  const [open, setOpen] = useState(false);

  const toggleDescription = () => {
    setOpen(!open);
  };

  return (
    <ButtonBase
      sx={{ width: "100%", textAlign: "left" }}
      disableRipple // Disable ripple effect here
    >
      <Card
        sx={{
          marginBottom: 2,
          bgcolor: open ? "#f4f4f4" : "white",
          width: "100%", // Ensure it takes full width
        }}
      >
        <CardContent>
          {/* Flex container for icon and title */}
          <Box sx={{ display: "flex", alignItems: "center", }}>
            {/* Conditional rendering of img src based on the open state */}
            <img
              src={
                open
                  ? "/corner-left-up.svg"
                  : "/corner-left-down.svg"
              }
              alt="toggle icon"
              style={{ marginRight: 8 }}
              onClick={toggleDescription} // Add margin to give some space between icon and text
            />
            <Typography variant="h6">{name}</Typography>
          </Box>

          {/* Skill progress bar */}
          <LinearProgress
            variant="determinate"
            value={level}
            color="info"
            sx={{ height: 10, borderRadius: 5, marginTop: 1, marginBottom: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            Proficiency: {level}%
          </Typography>

          {/* Collapsible description */}
          <Collapse in={open}>
            <Box sx={{ marginTop: 1 }}>
              <Typography variant="body2">{description}</Typography>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

export default SkillCard;
