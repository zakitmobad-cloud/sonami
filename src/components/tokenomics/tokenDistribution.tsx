import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

const distribution = [
  {
    percent: "20%",
    title: "TREASURY",
    desc: "The project's treasury, held in reserve.",
    color: "#f39c12",
    position: "top-left",
  },
  {
    percent: "15%",
    title: "MARKETING",
    desc: "Marketing funds used to spread the word throughout the Sonami.",
    color: "#e84393",
    position: "top-right",
  },
  {
    percent: "25%",
    title: "REWARDS",
    desc: "SNMI early supporters get rewarded heavily for their participation.",
    color: "#f1c40f",
    position: "right",
  },
  {
    percent: "10%",
    title: "LISTINGS",
    desc: "A portion of supply is dedicated to the listing of $SNMI on various exchanges.",
    color: "#e74c3c",
    position: "bottom-right",
  },
  {
    percent: "30%",
    title: "DEVELOPMENT",
    desc: "A portion of the token supply allocated to the development of the ever-expanding ecosystem.",
    color: "#16a085",
    position: "bottom-left",
  },
];

const TokenDistribution = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Box
      sx={{
        position: "relative",
        width: "fit-content",
        maxWidth: 1000,
      }}
    >
      {/* Starfish center image */}
      <Box
        component='img'
        src='/dev/star-fish-distribution.png' // ⬅️ replace with your local asset
        alt='Starfish'
        sx={{
          width: "auto",
          height: "auto",
          maxHeight: "350px",
          zIndex: 2,
          position: "relative",
        }}
      />

      {/* Distribution labels */}
      {distribution.map((item, idx) => {
        const positions: Record<string, any> = {
          "top-left": { top: "-10%", right: 0 },
          "top-right": { top: "10%", right: 0, textAlign: "left" },
          right: { top: "45%", right: 0, textAlign: "left" },
          "bottom-right": { bottom: "10%", right: 0, textAlign: "left" },
          "bottom-left": { bottom: "10%", left: 0, textAlign: "right" },
        };
        return (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              width: isMobile ? "90%" : "40%",
              ...positions[item.position],
              p: 1,
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontWeight: 700,
                color: item.color,
                textTransform: "uppercase",
              }}
            >
              {item.percent} — {item.title}
            </Typography>
            <Typography variant='body2' sx={{ color: "#333" }}>
              {item.desc}
            </Typography>

            {/* Connector line */}
            {!isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  width: 80,
                  height: 2,
                  background: item.color,
                  top: "50%",
                  transform: item.position.includes("left")
                    ? "translateX(100%)"
                    : "translateX(-100%)",
                  left: item.position.includes("left") ? "100%" : "auto",
                  right: item.position.includes("right") ? "100%" : "auto",
                }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default TokenDistribution;
