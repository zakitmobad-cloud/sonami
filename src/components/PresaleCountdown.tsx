import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

interface CountdownProps {
  targetDate: string; // example: "2025-11-02T00:00:00"
  small?: boolean;
}

const PresaleCountdown: React.FC<CountdownProps> = ({
  targetDate,
  small = false,
}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: Record<string, number> = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  if (small)
    return (
      <Typography
        variant='subtitle2'
        sx={{ color: "text.primary", fontWeight: 400, fontSize: "10px" }}
      >
        Presale ends in {formatNumber(timeLeft.days)}d :{" "}
        {formatNumber(timeLeft.hours)}h : {formatNumber(timeLeft.minutes)}m :{" "}
        {formatNumber(timeLeft.seconds)}s
      </Typography>
    );
  return (
    <Box
      sx={{
        textAlign: "center",
        color: "#fff",
      }}
    >
      {/* Title */}
      <Typography
        variant='h6'
        sx={{
          fontWeight: "bold",
          color: "#FFD700",
          textTransform: "uppercase",
          mb: 1,
          letterSpacing: "2px",
        }}
      >
        SONAMI Presale Ending Soon
      </Typography>

      {/* Timer Container */}
      <Paper
        elevation={6}
        sx={{
          display: "inline-block",
          borderRadius: "12px",
          background: "#1b1b1b",
          px: 3,
          py: 2,
          border: "2px solid #444",
          minWidth: 280,
        }}
      >
        <Grid container spacing={2}>
          {/* days */}
          <Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "0.9rem", color: "#ccc", fontWeight: "bold" }}
              >
                Days
              </Typography>
              <Typography sx={{ fontSize: "2rem", color: "#00FF00" }}>
                {formatNumber(timeLeft.days)}
              </Typography>
            </Box>
          </Grid>
          {/* hours */}
          <Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "0.9rem", color: "#ccc", fontWeight: "bold" }}
              >
                Hours
              </Typography>
              <Typography sx={{ fontSize: "2rem", color: "#00FF00" }}>
                {formatNumber(timeLeft.hours)}
              </Typography>
            </Box>
          </Grid>
          {/* Minutes */}
          <Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "0.9rem", color: "#ccc", fontWeight: "bold" }}
              >
                Minutes
              </Typography>
              <Typography sx={{ fontSize: "2rem", color: "#00FF00" }}>
                {formatNumber(timeLeft.minutes)}
              </Typography>
            </Box>
          </Grid>
          {/* Seconds */}
          <Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ fontSize: "0.9rem", color: "#ccc", fontWeight: "bold" }}
              >
                Seconds
              </Typography>
              <Typography sx={{ fontSize: "2rem", color: "#00FF00" }}>
                {formatNumber(timeLeft.seconds)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Footer Bar */}
      <Box
        sx={{
          mt: 1,
          background: "#FFD700",
          display: "inline-block",
          borderRadius: "4px",
          px: 2,
          py: 0.5,
        }}
      >
        <Typography
          sx={{
            color: "#222",
            fontWeight: "400",
            textTransform: "uppercase",
            fontSize: "0.9rem",
          }}
        >
          Until Upcoming Listing News
        </Typography>
      </Box>
    </Box>
  );
};

export default PresaleCountdown;
