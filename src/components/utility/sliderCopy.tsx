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
                    maxHeight: "80px",
                  }}
                >
                  <img
                    src={item.icon}
                    style={{ width: "100%", height: "100%" }}
                  />
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
          justifyContent: "space-between",
          gap: 3,
          mt: 4,
        }}
      >
        <IconButton
          onClick={handlePrev}
          disabled={isTransitioning}
          sx={{
            "&:disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          }}
          aria-label='Previous slide'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='95'
            height='76'
            fill='none'
            viewBox='0 0 95 76'
          >
            <g filter='url(#filter0_g_21_10155)'>
              <path
                fill='#4E5D90'
                d='M37.813 10.01a6.5 6.5 0 0 1 0 9.195c-4.096 4.096-1.195 11.099 4.597 11.099h37.196a7.5 7.5 0 1 1 0 15H42.41c-5.792 0-8.693 7.003-4.597 11.099a6.5 6.5 0 0 1 0 9.194l-.707.707a7.5 7.5 0 0 1-10.607 0L14.901 54.705c-9.334-9.334-9.334-24.468 0-33.803L26.499 9.304a7.5 7.5 0 0 1 10.607 0z'
              ></path>
            </g>
            <defs>
              <filter
                id='filter0_g_21_10155'
                width='93.205'
                height='75.394'
                x='0.9'
                y='0.107'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend
                  in='SourceGraphic'
                  in2='BackgroundImageFix'
                  result='shape'
                ></feBlend>
                <feTurbulence
                  baseFrequency='0.43478262424468994 0.43478262424468994'
                  numOctaves='3'
                  seed='7290'
                  type='fractalNoise'
                ></feTurbulence>
                <feDisplacementMap
                  width='100%'
                  height='100%'
                  in='shape'
                  result='displacedImage'
                  scale='14'
                  xChannelSelector='R'
                  yChannelSelector='G'
                ></feDisplacementMap>
                <feMerge result='effect1_texture_21_10155'>
                  <feMergeNode in='displacedImage'></feMergeNode>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </IconButton>

        <IconButton
          onClick={handleNext}
          disabled={isTransitioning}
          sx={{
            "&:disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          }}
          aria-label='Next slide'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='94'
            height='76'
            fill='none'
            viewBox='0 0 94 76'
          >
            <g filter='url(#filter0_g_21_10157)'>
              <path
                fill='#4E5D90'
                d='M56.293 10.01a6.5 6.5 0 0 0 0 9.195c4.095 4.096 1.195 11.099-4.598 11.099H14.5a7.5 7.5 0 0 0 0 15h37.196c5.793 0 8.693 7.003 4.598 11.099a6.5 6.5 0 0 0 0 9.194l.706.707a7.5 7.5 0 0 0 10.607 0l11.599-11.599c9.334-9.334 9.334-24.468 0-33.803L67.605 9.304a7.5 7.5 0 0 0-10.607 0z'
              ></path>
            </g>
            <defs>
              <filter
                id='filter0_g_21_10157'
                width='93.205'
                height='75.394'
                x='0'
                y='0.107'
                colorInterpolationFilters='sRGB'
                filterUnits='userSpaceOnUse'
              >
                <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
                <feBlend
                  in='SourceGraphic'
                  in2='BackgroundImageFix'
                  result='shape'
                ></feBlend>
                <feTurbulence
                  baseFrequency='0.43478262424468994 0.43478262424468994'
                  numOctaves='3'
                  seed='7290'
                  type='fractalNoise'
                ></feTurbulence>
                <feDisplacementMap
                  width='100%'
                  height='100%'
                  in='shape'
                  result='displacedImage'
                  scale='14'
                  xChannelSelector='R'
                  yChannelSelector='G'
                ></feDisplacementMap>
                <feMerge result='effect1_texture_21_10157'>
                  <feMergeNode in='displacedImage'></feMergeNode>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </IconButton>
      </Box>
    </Box>
  );
}
