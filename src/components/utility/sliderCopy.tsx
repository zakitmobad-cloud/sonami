import { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface FeatureSliderProps {
  items: FeatureItem[];
  autoSlideInterval?: number;
}

export default function FeatureSlider({
  items,
  autoSlideInterval = 5000,
}: FeatureSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const itemsPerSlide = isMobile ? 1 : 2;
  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  const handleNext = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning, totalSlides]);

  const handlePrev = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning, totalSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [handleNext, autoSlideInterval]);

  const getCurrentItems = () => {
    const start = currentIndex * itemsPerSlide;
    return items.slice(start, start + itemsPerSlide);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", px: 2, py: 4 }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #e0f7fa 0%, #e3f2fd 50%, #e0f7fa 100%)",
          borderRadius: "24px",
          p: 6,
        }}
      >
        <Box
          sx={{
            transition: "transform 0.5s ease-in-out",
            transform: isTransitioning ? "translateX(100%)" : "translateX(0)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 4,
              placeItems: isMobile ? "center" : "stretch",
            }}
          >
            {getCurrentItems().map((item, index) => (
              <Box
                key={currentIndex * itemsPerSlide + index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  height: "320px",
                  width: "100%",
                  maxWidth: "448px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3,
                    flexShrink: 0,
                    height: "80px",
                  }}
                >
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
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          mt: 4,
        }}
      >
        <IconButton
          onClick={handlePrev}
          disabled={isTransitioning}
          sx={{
            p: 1.5,
            bgcolor: "#1976d2",
            color: "white",
            clipPath:
              "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)",
            "&:hover": {
              bgcolor: "#1565c0",
            },
            "&:disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          }}
          aria-label='Previous slide'
        >
          <ArrowBackIos />
        </IconButton>

        <IconButton
          onClick={handleNext}
          disabled={isTransitioning}
          sx={{
            p: 1.5,
            bgcolor: "#1976d2",
            color: "white",
            clipPath:
              "polygon(60% 0%, 60% 20%, 0% 20%, 0% 80%, 60% 80%, 60% 100%, 100% 50%)",
            "&:hover": {
              bgcolor: "#1565c0",
            },
            "&:disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          }}
          aria-label='Next slide'
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
}
