import { Link } from "react-router-dom";
import { Box, Grid, Typography, Divider, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import LeftBottomBoxLayout from "../leftBottomBoxLayout";
import Slider from "./sliderCopy";
export default function LeftBottomBox() {
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down(1150));

  const { t } = useTranslation();

  const slider = [
    {
      icon: "/dev/star-fish.png",
      title: t("utility.leftBottomBox.slider.1.title"),
      description: t("utility.leftBottomBox.slider.1.description"),
    },
    {
      icon: "/dev/snake-fish.png",
      title: t("utility.leftBottomBox.slider.2.title"),
      description: t("utility.leftBottomBox.slider.2.description"),
    },
    {
      icon: "/dev/star-fish.png",
      title: t("utility.leftBottomBox.slider.3.title"),
      description: t("utility.leftBottomBox.slider.3.description"),
    },
    {
      icon: "/dev/snake-fish.png",
      title: t("utility.leftBottomBox.slider.4.title"),
      description: t("utility.leftBottomBox.slider.4.description"),
    },
  ];
  return (
    <LeftBottomBoxLayout sx={{ px: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          pt: { xs: "0px ", md: "32px" },
          px: { xs: "15px", md: "30px" },
        }}
      >
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          sx={{ mt: "36px" }}
        >
          <Grid>
            <Link to='/' style={{ textDecoration: "none" }}>
              <Grid
                container
                wrap='nowrap'
                alignItems='center'
                sx={{ gap: "15px" }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='8'
                  height='15'
                  fill='none'
                  viewBox='0 0 8 15'
                >
                  <path
                    stroke='url(#paint0_linear_16_3116)'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m7 13.5-6-6 6-6'
                  ></path>
                  <defs>
                    <linearGradient
                      id='paint0_linear_16_3116'
                      x1='4'
                      x2='4'
                      y1='1.5'
                      y2='13.5'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#0404AE'></stop>
                      <stop offset='0.48' stopColor='#2575DD'></stop>
                      <stop offset='1' stopColor='#0404AE'></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <Typography
                  variant='subtitle1'
                  sx={{
                    background:
                      "linear-gradient(180deg, #0404AE 0%, #2575DD 48%, #0404AE 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text", // For Firefox (not always needed)
                    color: "transparent",
                    lineHeight: "22px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                  }}
                >
                  {t("chain.leftBottomBox.backToHome")}
                </Typography>
              </Grid>
            </Link>
          </Grid>
        </Grid>

        <Typography
          variant='h1'
          sx={{
            mt: "23px",
            color: (theme) =>
              theme.palette.mode === "dark" ? "text.primary" : "primary.main",
            fontSize: "30px",
            lineHeight: "36px",
            fontWeight: 500,
            textTransform: "uppercase",
            whiteSpace: "break-spaces",
          }}
        >
          {t("utility.leftBottomBox.title")}
        </Typography>

        <Grid container sx={{ mt: "10px" }}>
          <Slider items={slider} />
        </Grid>
      </Box>
    </LeftBottomBoxLayout>
  );
}
