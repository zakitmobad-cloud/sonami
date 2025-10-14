import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface SlideItem {
  icon: string;
  title: string;
  description: string;
}

interface SliderProps {
  items: SlideItem[];
  autoSlideInterval?: number; // milliseconds
}

const Slider: React.FC<SliderProps> = ({ items, autoSlideInterval = 4000 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const itemsPerSlide = isMobile ? 1 : 2;
  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  const [current, setCurrent] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [totalSlides, autoSlideInterval]);

  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  const handleNext = () => setCurrent((prev) => (prev + 1) % totalSlides);

  // Calculate which items to show
  const startIndex = current * itemsPerSlide;
  const visibleItems = items.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Slide Container */}
      <Box
        sx={{
          display: "flex",
          justifyContent:
            isMobile || visibleItems.length === 1 ? "center" : "space-between",
          gap: 4,
          transition: "transform 0.6s ease",
        }}
      >
        {visibleItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              //flex: "0 0 45%",
              maxWidth: isMobile ? "80%" : "45%",
              //textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems:
                isMobile || visibleItems.length === 1 ? "center" : "flex-start",
              //justifyContent: "center",
              mx: isMobile ? "auto" : 0,
            }}
          >
            <Box sx={{ fontSize: 48 }}>
              <img src={item.icon} />
            </Box>
            <Typography
              variant='h1'
              sx={{
                mt: "15px",
                color: (theme) =>
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "primary.main",
                fontSize: "19px",
                lineHeight: "26px",
                fontWeight: 500,
                textTransform: "uppercase",
                whiteSpace: "break-spaces",
              }}
            >
              {item.title}
            </Typography>

            <Typography
              variant='body1'
              sx={{
                mt: "10px",
                fontFamily: "Inter",
                color: (theme) =>
                  theme.palette.mode === "dark" ? "text.primary" : "#000",
                fontSize: "17px",
                lineHeight: "28px",
                fontWeight: 700,
              }}
            >
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Arrows */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          gap: 4,
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            background: theme.palette.grey[200],
            "&:hover": { background: theme.palette.grey[300] },
          }}
        >
          <ArrowBackIos fontSize='small' />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            background: theme.palette.grey[200],
            "&:hover": { background: theme.palette.grey[300] },
          }}
        >
          <ArrowForwardIos fontSize='small' />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Slider;
